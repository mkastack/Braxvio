const { Queue } = require('bullmq');
const { getRedisConnectionOptions } = require('../config/redis');

const CONTACT_QUEUE_NAME = 'contact-emails';
let contactQueue = null;

const DEFAULT_JOB_OPTIONS = {
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 3000,
  },
  removeOnComplete: {
    age: 24 * 3600,
    count: 1000,
  },
  removeOnFail: {
    age: 7 * 24 * 3600,
    count: 5000,
  },
};

function getContactQueue() {
  if (!contactQueue) {
    const connection = getRedisConnectionOptions();
    contactQueue = new Queue(CONTACT_QUEUE_NAME, {
      connection,
      defaultJobOptions: DEFAULT_JOB_OPTIONS,
    });

    contactQueue.on('error', (err) => {
      console.warn(`[ContactQueue Warning] BullMQ Redis error: ${err.message}`);
    });

    console.log(`[ContactQueue] BullMQ initialized queue: '${CONTACT_QUEUE_NAME}'`);
  }
  return contactQueue;
}

async function addContactEmailJob({ inquiryId, payload }) {
  const queue = getContactQueue();
  const job = await queue.add(
    `process-contact-${inquiryId}`,
    {
      inquiryId,
      payload,
      queuedAt: new Date().toISOString(),
    },
    {
      jobId: `contact_${inquiryId}`,
    }
  );

  console.log(`[ContactQueue] Enqueued email job ${job.id} for Contact ID: ${inquiryId}`);
  return job;
}

async function closeContactQueue() {
  if (contactQueue) {
    await contactQueue.close();
    contactQueue = null;
    console.log(`[ContactQueue] Queue '${CONTACT_QUEUE_NAME}' connection closed.`);
  }
}

module.exports = {
  CONTACT_QUEUE_NAME,
  getContactQueue,
  addContactEmailJob,
  closeContactQueue,
};
