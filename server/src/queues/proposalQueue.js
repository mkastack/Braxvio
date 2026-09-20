const { Queue } = require('bullmq');
const { getRedisConnectionOptions } = require('../config/redis');

const QUEUE_NAME = 'proposal-emails';

let proposalQueue = null;

/**
 * Returns or initializes the BullMQ Proposal Queue instance.
 */
const DEFAULT_JOB_OPTIONS = {
  // Retry logic with exponential backoff for transient SMTP/network issues
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 3000, // 3s, 6s, 12s, 24s...
  },
  removeOnComplete: {
    age: 24 * 3600, // keep completed jobs for 24 hours
    count: 1000,     // keep up to 1,000 completed records
  },
  removeOnFail: {
    age: 7 * 24 * 3600, // keep failed jobs for 7 days for diagnostics
    count: 5000,
  },
};

/**
 * Returns or initializes the BullMQ Proposal Queue instance.
 */
function getProposalQueue() {
  if (!proposalQueue) {
    const connection = getRedisConnectionOptions();

    proposalQueue = new Queue(QUEUE_NAME, {
      connection,
      defaultJobOptions: DEFAULT_JOB_OPTIONS,
    });

    proposalQueue.on('error', (err) => {
      console.warn(`[Queue Warning] BullMQ Redis connection error: ${err.message}`);
    });

    console.log(`[Queue] BullMQ initialized queue: '${QUEUE_NAME}'`);
  }

  return proposalQueue;
}

/**
 * Dispatches an asynchronous job containing proposalId and submission payload into BullMQ.
 *
 * @param {Object} params
 * @param {string} params.proposalId
 * @param {Object} params.payload
 * @returns {Promise<import('bullmq').Job>}
 */
async function addProposalEmailJob({ proposalId, payload }) {
  const queue = getProposalQueue();
  const jobName = `process-proposal-${proposalId}`;

  const job = await queue.add(
    jobName,
    {
      proposalId,
      payload,
      queuedAt: new Date().toISOString(),
    },
    {
      jobId: `proposal_${proposalId}`, // Idempotent job ID prevents accidental duplicates
    }
  );

  console.log(`[Queue] Enqueued email job ${job.id} for Proposal ID: ${proposalId}`);
  return job;
}

/**
 * Closes queue connection gracefully.
 */
async function closeProposalQueue() {
  if (proposalQueue) {
    await proposalQueue.close();
    proposalQueue = null;
    console.log(`[Queue] Queue '${QUEUE_NAME}' connection closed.`);
  }
}

module.exports = {
  QUEUE_NAME,
  DEFAULT_JOB_OPTIONS,
  getProposalQueue,
  addProposalEmailJob,
  closeProposalQueue,
};
