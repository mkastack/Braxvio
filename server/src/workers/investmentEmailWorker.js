require('dotenv').config();
const { Worker } = require('bullmq');
const { INVESTMENT_QUEUE_NAME } = require('../queues/investmentQueue');
const { getRedisConnectionOptions } = require('../config/redis');
const { mailer } = require('../config/mailer');
const InvestmentInterest = require('../models/InvestmentInterest');
const {
  getInvestmentInternalNotificationTemplate,
  getInvestmentConfirmationTemplate,
} = require('../templates/investmentEmailTemplates');

let investmentEmailWorker = null;

async function processInvestmentEmailJob(job) {
  const { investmentId, payload } = job.data;
  console.log(`[InvestmentWorker] Processing Job ID ${job.id} (Attempt ${job.attemptsMade + 1}/${job.opts.attempts}) for Investment ID: ${investmentId}`);

  let investment = null;
  try {
    investment = await InvestmentInterest.findById(investmentId);
  } catch (err) {
    console.warn(`[InvestmentWorker] Could not query MongoDB for investment ${investmentId}: ${err.message}. Falling back to payload.`);
  }

  if (!investment && payload) {
    investment = { _id: investmentId, ...payload };
  }

  if (!investment) {
    throw new Error(`Investment record not found for ID: ${investmentId}. Job cannot proceed.`);
  }

  const fromAddress = process.env.EMAIL_FROM || `Braxvio Corporate Development <${process.env.SMTP_USER || 'admin@braxvio.com'}>`;
  const internalRecipient = process.env.INTERNAL_NOTIFICATION_EMAIL || 'admin@braxvio.com';
  const submitterEmail = investment.email;

  const emailResults = {
    internalSent: false,
    confirmationSent: false,
    internalMessageId: null,
    confirmationMessageId: null,
  };

  // 1. Send internal notification
  const internalTemplate = getInvestmentInternalNotificationTemplate(investment);
  console.log(`[InvestmentWorker] Sending internal notification to: ${internalRecipient}...`);
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
    console.log(`[InvestmentWorker] Internal notification sent. Message ID: ${internalInfo.messageId}`);
  } catch (err) {
    console.error(`[InvestmentWorker] Error sending internal notification: ${err.message}`);
    throw new Error(`Internal notification email failed: ${err.message}`);
  }

  // 2. Send investor confirmation auto-reply
  const confirmationTemplate = getInvestmentConfirmationTemplate(investment);
  console.log(`[InvestmentWorker] Sending confirmation to: ${submitterEmail}...`);
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
    console.log(`[InvestmentWorker] Confirmation sent. Message ID: ${confirmationInfo.messageId}`);
  } catch (err) {
    console.error(`[InvestmentWorker] Error sending confirmation: ${err.message}`);
    throw new Error(`Confirmation auto-reply failed: ${err.message}`);
  }

  // Update MongoDB
  try {
    await InvestmentInterest.findByIdAndUpdate(investmentId, {
      $set: {
        'emailNotificationStatus.internalSent': true,
        'emailNotificationStatus.confirmationSent': true,
        'emailNotificationStatus.processedAt': new Date(),
        'emailNotificationStatus.lastError': null,
      },
    });
  } catch (err) {
    console.warn(`[InvestmentWorker] Could not update investment notification status in DB: ${err.message}`);
  }

  return { investmentId, ...emailResults, completedAt: new Date().toISOString() };
}

function startInvestmentEmailWorker() {
  if (investmentEmailWorker) return investmentEmailWorker;

  const connection = getRedisConnectionOptions();

  investmentEmailWorker = new Worker(INVESTMENT_QUEUE_NAME, processInvestmentEmailJob, {
    connection,
    concurrency: parseInt(process.env.WORKER_CONCURRENCY || '5', 10),
    limiter: { max: 10, duration: 1000 },
  });

  investmentEmailWorker.on('ready', () => {
    console.log(`[InvestmentWorker] BullMQ Investment Email Worker READY on queue: '${INVESTMENT_QUEUE_NAME}'`);
  });

  investmentEmailWorker.on('completed', (job, result) => {
    console.log(`[InvestmentWorker] Job ${job.id} completed. Internal: ${result.internalSent}, Confirmation: ${result.confirmationSent}`);
  });

  investmentEmailWorker.on('failed', async (job, err) => {
    console.error(`[InvestmentWorker] Job ${job ? job.id : 'unknown'} FAILED: ${err.message}`);
    if (job && job.data && job.data.investmentId) {
      try {
        await InvestmentInterest.findByIdAndUpdate(job.data.investmentId, {
          $set: { 'emailNotificationStatus.lastError': `Attempt ${job.attemptsMade}: ${err.message}` },
        });
      } catch {}
    }
  });

  investmentEmailWorker.on('error', (err) => {
    console.error(`[InvestmentWorker] BullMQ Worker internal error: ${err.message}`);
  });

  return investmentEmailWorker;
}

async function stopInvestmentEmailWorker() {
  if (investmentEmailWorker) {
    console.log('[InvestmentWorker] Stopping...');
    await investmentEmailWorker.close();
    investmentEmailWorker = null;
    console.log('[InvestmentWorker] Stopped.');
  }
}

module.exports = { startInvestmentEmailWorker, stopInvestmentEmailWorker, processInvestmentEmailJob };
