const { Queue } = require('bullmq');
const { getRedisConnectionOptions } = require('../config/redis');

const TALENT_QUEUE_NAME = 'talent-emails';
let talentQueue = null;

const DEFAULT_JOB_OPTIONS = {
  attempts: 5,
  backoff: { type: 'exponential', delay: 3000 },
  removeOnComplete: { age: 24 * 3600, count: 1000 },
  removeOnFail: { age: 7 * 24 * 3600, count: 5000 },
};

function getTalentQueue() {
  if (!talentQueue) {
    const connection = getRedisConnectionOptions();
    talentQueue = new Queue(TALENT_QUEUE_NAME, { connection, defaultJobOptions: DEFAULT_JOB_OPTIONS });
    talentQueue.on('error', (err) => {
      console.warn(`[TalentQueue Warning] BullMQ Redis error: ${err.message}`);
    });
    console.log(`[TalentQueue] BullMQ initialized queue: '${TALENT_QUEUE_NAME}'`);
  }
  return talentQueue;
}

async function addTalentEmailJob({ applicationId, payload }) {
  const queue = getTalentQueue();
  const job = await queue.add(
    `process-talent-${applicationId}`,
    { applicationId, payload, queuedAt: new Date().toISOString() },
    { jobId: `talent_${applicationId}` }
  );
  console.log(`[TalentQueue] Enqueued email job ${job.id} for Application ID: ${applicationId}`);
  return job;
}

async function closeTalentQueue() {
  if (talentQueue) {
    await talentQueue.close();
    talentQueue = null;
    console.log(`[TalentQueue] Queue '${TALENT_QUEUE_NAME}' connection closed.`);
  }
}

module.exports = { TALENT_QUEUE_NAME, getTalentQueue, addTalentEmailJob, closeTalentQueue };
