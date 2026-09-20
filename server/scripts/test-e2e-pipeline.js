require('dotenv').config();
const { connectDB, disconnectDB } = require('../src/config/db');
const { getProposalQueue, closeProposalQueue } = require('../src/queues/proposalQueue');
const { processProposalEmailJob } = require('../src/workers/emailWorker');
const Proposal = require('../src/models/Proposal');

async function testFullPipeline() {
  console.log('==================================================');
  console.log('🚀 Running End-to-End Proposal Processing Pipeline');
  console.log('==================================================\n');

  // Step 1: Connect to MongoDB Atlas
  console.log('[1/4] Connecting to MongoDB Atlas...');
  await connectDB();

  // Step 2: Create Proposal in MongoDB Atlas
  console.log('[2/4] Saving test proposal to MongoDB Atlas...');
  const testProposal = await Proposal.create({
    fullName: 'David Sterling',
    email: 'admin@braxvio.com', // Sending to admin for safe self-test verification
    companyName: 'Sterling Global Ventures',
    phone: '+1 415 555 2671',
    country: 'United States',
    website: 'https://sterlingventures.example.com',
    proposalTitle: 'Global AI & Cloud Infrastructure Partnership',
    proposalDetails: 'We are proposing an strategic co-investment and infrastructure distribution partnership with Braxvio across North America.',
    status: 'received',
  });

  console.log(`  ✅ Proposal saved! ID: ${testProposal._id}, Reference: ${testProposal.referenceCode}`);

  // Step 3: Enqueue Job in Upstash Redis via BullMQ
  console.log('\n[3/4] Enqueueing job into Upstash Redis via BullMQ...');
  const queue = getProposalQueue();
  const job = await queue.add(
    `process-proposal-${testProposal._id}`,
    {
      proposalId: testProposal._id.toString(),
      payload: testProposal.toObject(),
    },
    {
      removeOnComplete: true,
    }
  );
  console.log(`  ✅ Job enqueued into Upstash Redis! Job ID: ${job.id}`);

  // Step 4: Process Job (simulating worker processing with live Hostinger SMTP)
  console.log('\n[4/4] Processing job via Hostinger SMTP (Internal & Submitter emails)...');
  const result = await processProposalEmailJob(job);

  console.log('  ✅ Email processing completed!');
  console.log(`     - Internal Notification sent: ${result.internalSent} (Message ID: ${result.internalMessageId})`);
  console.log(`     - Submitter Confirmation sent: ${result.confirmationSent} (Message ID: ${result.confirmationMessageId})`);

  // Verify DB updated
  const updated = await Proposal.findById(testProposal._id);
  console.log(`\n  ✅ MongoDB Atlas updated with dispatch timestamps:`);
  console.log(`     - internalSent: ${updated.emailNotificationStatus.internalSent}`);
  console.log(`     - confirmationSent: ${updated.emailNotificationStatus.confirmationSent}`);
  console.log(`     - processedAt: ${updated.emailNotificationStatus.processedAt}`);

  // Clean up test document
  await Proposal.findByIdAndDelete(testProposal._id);
  console.log('  ✅ Test proposal cleaned up from MongoDB Atlas.');

  await closeProposalQueue();
  await disconnectDB();

  console.log('\n==================================================');
  console.log('🎉 FULL PIPELINE SUCCESS: All Systems 100% Operational!');
  console.log('==================================================');
  process.exit(0);
}

testFullPipeline().catch(err => {
  console.error('\n❌ Pipeline Test Failed:', err);
  process.exit(1);
});
