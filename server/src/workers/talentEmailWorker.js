require('dotenv').config();
const { Worker } = require('bullmq');
const { TALENT_QUEUE_NAME } = require('../queues/talentQueue');
const { getRedisConnectionOptions } = require('../config/redis');
const { mailer } = require('../config/mailer');
const TalentApplication = require('../models/TalentApplication');
const {
  getTalentInternalNotificationTemplate,
  getTalentConfirmationTemplate,
} = require('../templates/talentEmailTemplates');

let talentEmailWorker = null;

async function processTalentEmailJob(job) {
  const { applicationId, payload } = job.data;
  console.log(`[TalentWorker] Processing Job ID ${job.id} for Application ID: ${applicationId}`);

  let application = null;
  try {
    application = await TalentApplication.findById(applicationId);
  } catch (err) {
    console.warn(`[TalentWorker] Could not query MongoDB: ${err.message}. Falling back to payload.`);
  }

  if (!application && payload) {
    application = { _id: applicationId, ...payload };
  }

  if (!application) {
    throw new Error(`Talent application not found for ID: ${applicationId}.`);
  }

  const fromAddress = process.env.EMAIL_FROM || `Braxvio Talent Team <${process.env.SMTP_USER || 'admin@braxvio.com'}>`;
  const internalRecipient = process.env.INTERNAL_NOTIFICATION_EMAIL || 'admin@braxvio.com';
  const submitterEmail = application.email;

  const emailResults = { internalSent: false, confirmationSent: false };

  // 1. Internal notification
  const internalTemplate = getTalentInternalNotificationTemplate(application);
  try {
    const info = await mailer.sendMail({
      from: fromAddress,
      to: internalRecipient,
      replyTo: submitterEmail,
      subject: internalTemplate.subject,
      text: internalTemplate.text,
      html: internalTemplate.html,
    });
    emailResults.internalSent = true;
    console.log(`[TalentWorker] Internal notification sent. Message ID: ${info.messageId}`);
  } catch (err) {
    console.error(`[TalentWorker] Error sending internal notification: ${err.message}`);
    throw new Error(`Internal notification email failed: ${err.message}`);
  }

  // 2. Candidate confirmation
  const confirmationTemplate = getTalentConfirmationTemplate(application);
  try {
    const info = await mailer.sendMail({
      from: fromAddress,
      to: submitterEmail,
      replyTo: internalRecipient,
      subject: confirmationTemplate.subject,
      text: confirmationTemplate.text,
      html: confirmationTemplate.html,
    });
    emailResults.confirmationSent = true;
    console.log(`[TalentWorker] Confirmation sent. Message ID: ${info.messageId}`);
  } catch (err) {
    console.error(`[TalentWorker] Error sending confirmation: ${err.message}`);
    throw new Error(`Confirmation auto-reply failed: ${err.message}`);
  }

  // Update MongoDB status
  try {
    await TalentApplication.findByIdAndUpdate(applicationId, {
      $set: {
        'emailNotificationStatus.internalSent': true,
        'emailNotificationStatus.confirmationSent': true,
        'emailNotificationStatus.processedAt': new Date(),
        'emailNotificationStatus.lastError': null,
      },
    });
  } catch (err) {
    console.warn(`[TalentWorker] Could not update application status in DB: ${err.message}`);
  }

  return { applicationId, ...emailResults, completedAt: new Date().toISOString() };
}

function startTalentEmailWorker() {
  if (talentEmailWorker) return talentEmailWorker;

  const connection = getRedisConnectionOptions();
  talentEmailWorker = new Worker(TALENT_QUEUE_NAME, processTalentEmailJob, {
    connection,
    concurrency: parseInt(process.env.WORKER_CONCURRENCY || '5', 10),
    limiter: { max: 10, duration: 1000 },
  });

  talentEmailWorker.on('ready', () => console.log(`[TalentWorker] READY on queue: '${TALENT_QUEUE_NAME}'`));
  talentEmailWorker.on('completed', (job, result) => console.log(`[TalentWorker] Job ${job.id} completed. Internal: ${result.internalSent}, Confirmation: ${result.confirmationSent}`));
  talentEmailWorker.on('failed', async (job, err) => {
    console.error(`[TalentWorker] Job ${job ? job.id : 'unknown'} FAILED: ${err.message}`);
    if (job && job.data && job.data.applicationId) {
      try {
        await TalentApplication.findByIdAndUpdate(job.data.applicationId, {
          $set: { 'emailNotificationStatus.lastError': `Attempt ${job.attemptsMade}: ${err.message}` },
        });
      } catch {}
    }
  });
  talentEmailWorker.on('error', (err) => console.error(`[TalentWorker] Internal error: ${err.message}`));

  return talentEmailWorker;
}

async function stopTalentEmailWorker() {
  if (talentEmailWorker) {
    console.log('[TalentWorker] Stopping...');
    await talentEmailWorker.close();
    talentEmailWorker = null;
    console.log('[TalentWorker] Stopped.');
  }
}

module.exports = { startTalentEmailWorker, stopTalentEmailWorker, processTalentEmailJob };
