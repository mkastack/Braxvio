require('dotenv').config();
const { Worker } = require('bullmq');
const { QUEUE_NAME } = require('../queues/proposalQueue');
const { getRedisConnectionOptions } = require('../config/redis');
const { mailer } = require('../config/mailer');
const Proposal = require('../models/Proposal');
const {
  getInternalNotificationTemplate,
  getUserConfirmationTemplate,
} = require('../templates/emailTemplates');

let emailWorker = null;

/**
 * Core processor for proposal email jobs.
 *
 * @param {import('bullmq').Job} job
 */
async function processProposalEmailJob(job) {
  const { proposalId, payload } = job.data;
  console.log(`[Worker] Processing Job ID ${job.id} (Attempt ${job.attemptsMade + 1}/${job.opts.attempts}) for Proposal ID: ${proposalId}`);

  // Retrieve proposal record from MongoDB for fresh state
  let proposal = null;
  try {
    proposal = await Proposal.findById(proposalId);
  } catch (err) {
    console.warn(`[Worker] Could not query MongoDB for proposal ${proposalId}: ${err.message}. Falling back to job payload.`);
  }

  // Fallback to job payload if DB record lookup is unavailable
  if (!proposal && payload) {
    proposal = {
      _id: proposalId,
      ...payload,
    };
  }

  if (!proposal) {
    throw new Error(`Proposal record not found for ID: ${proposalId}. Job cannot proceed.`);
  }

  const fromAddress = process.env.EMAIL_FROM || `Braxvio Partnerships <${process.env.SMTP_USER || 'partners@braxvio.com'}>`;
  const internalRecipient = process.env.INTERNAL_NOTIFICATION_EMAIL || 'partners@braxvio.com';
  const submitterEmail = proposal.email;

  const emailResults = {
    internalSent: false,
    confirmationSent: false,
    internalMessageId: null,
    confirmationMessageId: null,
  };

  // 1. Task A: Send Internal Notification Email
  const internalTemplate = getInternalNotificationTemplate(proposal);
  console.log(`[Worker] Sending internal notification to: ${internalRecipient}...`);

  try {
    const internalInfo = await mailer.sendMail({
      from: fromAddress,
      to: internalRecipient,
      replyTo: submitterEmail,
      subject: internalTemplate.subject,
      text: internalTemplate.text,
      html: internalTemplate.html,
    });

    emailResults.internalSent = true;
    emailResults.internalMessageId = internalInfo.messageId;
    console.log(`[Worker] Internal notification successfully sent. Message ID: ${internalInfo.messageId}`);
  } catch (err) {
    console.error(`[Worker] Error sending internal notification: ${err.message}`);
    // Rethrow to let BullMQ initiate exponential backoff
    throw new Error(`Internal notification email failed: ${err.message}`);
  }

  // 2. Task B: Send User Confirmation Auto-Reply
  const confirmationTemplate = getUserConfirmationTemplate(proposal);
  console.log(`[Worker] Sending user confirmation auto-reply to: ${submitterEmail}...`);

  try {
    const confirmationInfo = await mailer.sendMail({
      from: fromAddress,
      to: submitterEmail,
      replyTo: internalRecipient,
      subject: confirmationTemplate.subject,
      text: confirmationTemplate.text,
      html: confirmationTemplate.html,
    });

    emailResults.confirmationSent = true;
    emailResults.confirmationMessageId = confirmationInfo.messageId;
    console.log(`[Worker] User confirmation successfully sent. Message ID: ${confirmationInfo.messageId}`);
  } catch (err) {
    console.error(`[Worker] Error sending confirmation auto-reply: ${err.message}`);
    // Rethrow to let BullMQ initiate exponential backoff
    throw new Error(`Confirmation auto-reply failed: ${err.message}`);
  }

  // Update MongoDB document with successful dispatch metadata
  try {
    await Proposal.findByIdAndUpdate(proposalId, {
      $set: {
        'emailNotificationStatus.internalSent': true,
        'emailNotificationStatus.confirmationSent': true,
        'emailNotificationStatus.processedAt': new Date(),
        'emailNotificationStatus.lastError': null,
      },
    });
  } catch (err) {
    console.warn(`[Worker] Could not update Proposal notification status in DB: ${err.message}`);
  }

  return {
    proposalId,
    ...emailResults,
    completedAt: new Date().toISOString(),
  };
}

/**
 * Initializes and starts the BullMQ email worker.
 */
function startEmailWorker() {
  if (emailWorker) {
    return emailWorker;
  }

  const connection = getRedisConnectionOptions();

  emailWorker = new Worker(QUEUE_NAME, processProposalEmailJob, {
    connection,
    concurrency: parseInt(process.env.WORKER_CONCURRENCY || '5', 10),
    limiter: {
      max: 10,
      duration: 1000, // Maximum 10 emails/sec to comply with Hostinger SMTP rate limits
    },
  });

  emailWorker.on('ready', () => {
    console.log(`[Worker] BullMQ Email Worker is READY and listening on queue: '${QUEUE_NAME}'`);
  });

  emailWorker.on('completed', (job, result) => {
    console.log(`[Worker] Job ${job.id} completed successfully. Internal: ${result.internalSent}, Confirmation: ${result.confirmationSent}`);
  });

  emailWorker.on('failed', async (job, err) => {
    console.error(`[Worker] Job ${job ? job.id : 'unknown'} FAILED (Attempt ${job ? job.attemptsMade : '?'}/${job && job.opts ? job.opts.attempts : '?'}): ${err.message}`);

    if (job && job.data && job.data.proposalId) {
      try {
        await Proposal.findByIdAndUpdate(job.data.proposalId, {
          $set: {
            'emailNotificationStatus.lastError': `Attempt ${job.attemptsMade}: ${err.message}`,
          },
        });
      } catch (dbErr) {
        // Suppress DB error on failed job logging
      }
    }
  });

  emailWorker.on('error', (err) => {
    console.error(`[Worker] BullMQ Worker internal error: ${err.message}`);
  });

  return emailWorker;
}

/**
 * Closes worker gracefully.
 */
async function stopEmailWorker() {
  if (emailWorker) {
    console.log('[Worker] Stopping BullMQ Email Worker...');
    await emailWorker.close();
    emailWorker = null;
    console.log('[Worker] BullMQ Email Worker stopped.');
  }
}

// Standalone execution entry point
if (require.main === module) {
  const { connectDB, disconnectDB } = require('../config/db');

  console.log('[Worker] Starting email worker in standalone mode...');

  connectDB()
    .then(() => {
      startEmailWorker();
    })
    .catch((err) => {
      console.error('[Worker] Failed to connect to DB on worker startup:', err);
      process.exit(1);
    });

  const shutdown = async () => {
    console.log('\n[Worker] Graceful shutdown initiated...');
    await stopEmailWorker();
    await disconnectDB();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

module.exports = {
  startEmailWorker,
  stopEmailWorker,
  processProposalEmailJob,
};
