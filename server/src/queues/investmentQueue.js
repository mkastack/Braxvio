const { Queue } = require('bullmq');
const { getRedisConnectionOptions } = require('../config/redis');

const INVESTMENT_QUEUE_NAME = 'investment-emails';

let investmentQueue = null;

const DEFAULT_JOB_OPTIONS = {
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 3000,
  },
  removeOnComplete: { age: 24 * 3600, count: 1000 },
  removeOnFail: { age: 7 * 24 * 3600, count: 5000 },
};

function getInvestmentQueue() {
  if (!investmentQueue) {
    const connection = getRedisConnectionOptions();
    investmentQueue = new Queue(INVESTMENT_QUEUE_NAME, {
      connection,
      defaultJobOptions: DEFAULT_JOB_OPTIONS,
    });
    investmentQueue.on('error', (err) => {
      console.warn(`[InvestmentQueue Warning] BullMQ Redis error: ${err.message}`);
    });
    console.log(`[InvestmentQueue] BullMQ initialized queue: '${INVESTMENT_QUEUE_NAME}'`);
  }
  return investmentQueue;
}

async function addInvestmentEmailJob({ investmentId, payload }) {
  const queue = getInvestmentQueue();
  const jobName = `process-investment-${investmentId}`;
  const job = await queue.add(
    jobName,
    { investmentId, payload, queuedAt: new Date().toISOString() },
    { jobId: `investment_${investmentId}` }
  );
  console.log(`[InvestmentQueue] Enqueued email job ${job.id} for Investment ID: ${investmentId}`);
  return job;
}

async function closeInvestmentQueue() {
  if (investmentQueue) {
    await investmentQueue.close();
    investmentQueue = null;
    console.log(`[InvestmentQueue] Queue '${INVESTMENT_QUEUE_NAME}' connection closed.`);
  }
}

module.exports = {
  INVESTMENT_QUEUE_NAME,
  DEFAULT_JOB_OPTIONS,
  getInvestmentQueue,
  addInvestmentEmailJob,
  closeInvestmentQueue,
};
