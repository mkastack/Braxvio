require('dotenv').config();
const { Worker } = require('bullmq');
const { CONTACT_QUEUE_NAME } = require('../queues/contactQueue');
const { getRedisConnectionOptions } = require('../config/redis');
const { mailer } = require('../config/mailer');
const ContactInquiry = require('../models/ContactInquiry');
const {
  getContactInternalNotificationTemplate,
  getContactConfirmationTemplate,
} = require('../templates/contactEmailTemplates');

let contactEmailWorker = null;

async function processContactEmailJob(job) {
  const { inquiryId, payload } = job.data;
  console.log(`[ContactWorker] Processing Job ID ${job.id} for Inquiry ID: ${inquiryId}`);

  let inquiry = null;
  try {
    inquiry = await ContactInquiry.findById(inquiryId);
  } catch (err) {
    console.warn(`[ContactWorker] Could not query MongoDB: ${err.message}. Falling back to payload.`);
  }

  if (!inquiry && payload) {
    inquiry = { _id: inquiryId, ...payload };
  }

  if (!inquiry) {
    throw new Error(`Contact inquiry not found for ID: ${inquiryId}.`);
  }

  const fromAddress = process.env.EMAIL_FROM || `Braxvio Communications Desk <${process.env.SMTP_USER || 'admin@braxvio.com'}>`;
  const internalRecipient = process.env.INTERNAL_NOTIFICATION_EMAIL || 'admin@braxvio.com';
  const submitterEmail = inquiry.email;

  const emailResults = { internalSent: false, confirmationSent: false };

  // 1. Internal notification
  const internalTemplate = getContactInternalNotificationTemplate(inquiry);
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
    console.log(`[ContactWorker] Internal notification sent. Message ID: ${info.messageId}`);
  } catch (err) {
    console.error(`[ContactWorker] Error sending internal notification: ${err.message}`);
    throw new Error(`Internal notification email failed: ${err.message}`);
  }

  // 2. Submitter confirmation auto-reply
  const confirmationTemplate = getContactConfirmationTemplate(inquiry);
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
    console.log(`[ContactWorker] Confirmation sent. Message ID: ${info.messageId}`);
  } catch (err) {
    console.error(`[ContactWorker] Error sending confirmation: ${err.message}`);
    throw new Error(`Confirmation auto-reply failed: ${err.message}`);
  }

  // Update MongoDB status
  try {
    await ContactInquiry.findByIdAndUpdate(inquiryId, {
      $set: {
        'emailNotificationStatus.internalSent': true,
        'emailNotificationStatus.confirmationSent': true,
        'emailNotificationStatus.processedAt': new Date(),
        'emailNotificationStatus.lastError': null,
      },
    });
  } catch (err) {
    console.warn(`[ContactWorker] Could not update inquiry status in DB: ${err.message}`);
  }

  return { inquiryId, ...emailResults, completedAt: new Date().toISOString() };
}

function startContactEmailWorker() {
  if (contactEmailWorker) return contactEmailWorker;

  const connection = getRedisConnectionOptions();
  contactEmailWorker = new Worker(CONTACT_QUEUE_NAME, processContactEmailJob, {
    connection,
    concurrency: parseInt(process.env.WORKER_CONCURRENCY || '5', 10),
    limiter: {
      max: 10,
      duration: 1000,
    },
  });

  contactEmailWorker.on('ready', () => {
    console.log(`[ContactWorker] BullMQ Contact Email Worker READY on queue: '${CONTACT_QUEUE_NAME}'`);
  });

  contactEmailWorker.on('completed', (job, result) => {
    console.log(`[ContactWorker] Job ${job.id} completed. Internal: ${result.internalSent}, Confirmation: ${result.confirmationSent}`);
  });

  contactEmailWorker.on('failed', async (job, err) => {
    console.error(`[ContactWorker] Job ${job ? job.id : 'unknown'} FAILED: ${err.message}`);
    if (job && job.data && job.data.inquiryId) {
      try {
        await ContactInquiry.findByIdAndUpdate(job.data.inquiryId, {
          $set: {
            'emailNotificationStatus.lastError': `Attempt ${job.attemptsMade}: ${err.message}`,
          },
        });
      } catch {}
    }
  });

  contactEmailWorker.on('error', (err) => {
    console.error(`[ContactWorker] BullMQ internal error: ${err.message}`);
  });

  return contactEmailWorker;
}

async function stopContactEmailWorker() {
  if (contactEmailWorker) {
    console.log('[ContactWorker] Stopping BullMQ worker...');
    await contactEmailWorker.close();
    contactEmailWorker = null;
    console.log('[ContactWorker] Stopped.');
  }
}

module.exports = {
  startContactEmailWorker,
  stopContactEmailWorker,
  processContactEmailJob,
};
