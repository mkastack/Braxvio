require('dotenv').config();
const { connectDB, disconnectDB } = require('../src/config/db');
const Proposal = require('../src/models/Proposal');
const { getProposalQueue, closeProposalQueue } = require('../src/queues/proposalQueue');

async function testLiveServices() {
  console.log('==================================================');
  console.log('🌐 Testing Live MongoDB Atlas and Upstash Redis');
  console.log('==================================================\n');

  // 1. Test MongoDB Atlas
  console.log('[1/2] Connecting to MongoDB Atlas...');
  try {
    await connectDB();
    console.log('  ✅ MongoDB Atlas connected successfully.');

    const testProposal = new Proposal({
      fullName: 'Integration Test Submitter',
      email: 'test@braxvio.com',
      companyName: 'Braxvio Test Entity',
      proposalDetails: 'Automated integration test proposal for cloud database verification.',
    });

    const saved = await testProposal.save();
    console.log(`  ✅ Successfully saved test Proposal to MongoDB Atlas (ID: ${saved._id}, Ref: ${saved.referenceCode})`);

    await Proposal.findByIdAndDelete(saved._id);
    console.log('  ✅ Successfully cleaned up test document from MongoDB Atlas.');
  } catch (err) {
    console.error('  ❌ MongoDB Atlas test failed:', err.message);
  } finally {
    await disconnectDB();
  }

  // 2. Test Upstash Redis via BullMQ
  console.log('\n[2/2] Connecting to Upstash Redis via BullMQ...');
  try {
    const queue = getProposalQueue();
    const job = await queue.add(
      'live-test-job',
      { timestamp: new Date().toISOString() },
      { removeOnComplete: true }
    );
    console.log(`  ✅ Upstash Redis BullMQ Queue connected and dispatched test job: ID ${job.id}`);
    await job.remove();
    console.log('  ✅ Test job cleaned up.');
  } catch (err) {
    console.error('  ❌ Upstash Redis BullMQ test failed:', err.message);
  } finally {
    await closeProposalQueue();
  }

  console.log('\n==================================================');
  console.log('🎉 Live Services Integration Test Completed');
  console.log('==================================================');
  process.exit(0);
}

testLiveServices();
