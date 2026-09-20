/**
 * Automated Verification Script for Braxvio Form Submission Backend System.
 * Tests:
 * 1. Module integrity and configuration loading
 * 2. Proposal schema & model validation rules
 * 3. Controller validation logic (missing fields, invalid email, proper error response)
 * 4. Email template generation (Internal notification & User auto-reply)
 * 5. BullMQ queue option configuration (exponential backoff & retry settings)
 */

const assert = require('assert');
const Proposal = require('../src/models/Proposal');
const { submitProposal } = require('../src/controllers/proposalController');
const {
  getInternalNotificationTemplate,
  getUserConfirmationTemplate,
} = require('../src/templates/emailTemplates');
const { DEFAULT_JOB_OPTIONS } = require('../src/queues/proposalQueue');

let passCount = 0;
let failCount = 0;

function it(description, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${description}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
  }
}

async function itAsync(description, fn) {
  try {
    await fn();
    console.log(`  ✅ PASS: ${description}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
  }
}

async function runTests() {
  console.log('\n==================================================');
  console.log('🧪 Running Braxvio Backend System Verification');
  console.log('==================================================\n');

  console.log('--- 1. Mongoose Proposal Model Verification ---');
  it('Proposal schema should enforce required fields', () => {
    const doc = new Proposal({});
    const err = doc.validateSync();
    assert(err, 'Expected validation error for empty doc');
    assert(err.errors.fullName, 'Missing fullName required error');
    assert(err.errors.email, 'Missing email required error');
    assert(err.errors.companyName, 'Missing companyName required error');
    assert(err.errors.proposalDetails, 'Missing proposalDetails required error');
  });

  it('Proposal schema should have default status of "received"', () => {
    const doc = new Proposal({
      fullName: 'Kwame Mensah',
      email: 'kwame@example.com',
      companyName: 'Acme Corp',
      proposalDetails: 'Interested in strategic tech partnership with Braxvio.',
    });
    assert.strictEqual(doc.status, 'received');
    assert(doc.createdAt instanceof Date);
    assert(typeof doc.referenceCode === 'string');
    assert(doc.referenceCode.startsWith('BX-PRP-'));
  });

  console.log('\n--- 2. Controller Validation Logic ---');
  await itAsync('Controller should reject payload when required fields are missing', async () => {
    const req = {
      body: {
        fullName: 'Jane Doe',
        // missing email, companyName, proposalDetails
      },
    };

    let statusCode = null;
    let jsonResult = null;

    const res = {
      status(code) {
        statusCode = code;
        return this;
      },
      json(data) {
        jsonResult = data;
        return this;
      },
    };

    await submitProposal(req, res, () => {});

    assert.strictEqual(statusCode, 400);
    assert.strictEqual(jsonResult.success, false);
    assert(Array.isArray(jsonResult.missingFields));
    assert(jsonResult.missingFields.length >= 3);
  });

  await itAsync('Controller should reject payload with invalid email address', async () => {
    const req = {
      body: {
        fullName: 'Jane Doe',
        email: 'invalid-email-address',
        companyName: 'Braxvio Partner',
        proposalDetails: 'This is a valid proposal description exceeding minimum length.',
      },
    };

    let statusCode = null;
    let jsonResult = null;

    const res = {
      status(code) {
        statusCode = code;
        return this;
      },
      json(data) {
        jsonResult = data;
        return this;
      },
    };

    await submitProposal(req, res, () => {});

    assert.strictEqual(statusCode, 400);
    assert.strictEqual(jsonResult.success, false);
    assert(jsonResult.error.toLowerCase().includes('email'));
  });

  console.log('\n--- 3. Email Template Generation ---');
  it('Internal notification template should contain all proposal details', () => {
    const mockProposal = {
      _id: '67de20567e91234567890abc',
      fullName: 'Alexander Vance',
      email: 'alex@venturecapital.com',
      companyName: 'Vance Horizons Ltd',
      phone: '+1 555 234 5678',
      country: 'United Kingdom',
      website: 'https://vancehorizons.com',
      proposalTitle: 'Joint AI Infrastructure Deployment',
      proposalDetails: 'We propose co-funding and deploying GPU compute clusters across emerging markets.',
      status: 'received',
      createdAt: new Date('2026-03-22T10:00:00Z'),
    };

    const template = getInternalNotificationTemplate(mockProposal);
    assert(template.subject.includes('Vance Horizons Ltd'));
    assert(template.subject.includes('Alexander Vance'));
    assert(template.text.includes('Joint AI Infrastructure Deployment'));
    assert(template.text.includes('alex@venturecapital.com'));
    assert(template.html.includes('Vance Horizons Ltd'));
    assert(template.html.includes('alex@venturecapital.com'));
    assert(template.html.includes('GPU compute clusters'));
  });

  it('User confirmation template should acknowledge submission with reference code', () => {
    const mockProposal = {
      _id: '67de20567e91234567890abc',
      fullName: 'Alexander Vance',
      email: 'alex@venturecapital.com',
      companyName: 'Vance Horizons Ltd',
      status: 'received',
      referenceCode: 'BX-PRP-2026-890ABC',
    };

    const template = getUserConfirmationTemplate(mockProposal);
    assert(template.subject.includes('BX-PRP-2026-890ABC'));
    assert(template.text.includes('Alexander Vance'));
    assert(template.text.includes('Vance Horizons Ltd'));
    assert(template.html.includes('Alexander Vance'));
    assert(template.html.includes('Vance Horizons Ltd'));
    assert(template.html.includes('Under Preliminary Review'));
  });

  console.log('\n--- 4. BullMQ Queue Configuration ---');
  it('BullMQ queue should have exponential backoff retry settings configured', () => {
    assert(DEFAULT_JOB_OPTIONS, 'Expected DEFAULT_JOB_OPTIONS to be defined');
    assert.strictEqual(DEFAULT_JOB_OPTIONS.attempts, 5, 'Expected 5 retry attempts');
    assert.strictEqual(DEFAULT_JOB_OPTIONS.backoff.type, 'exponential', 'Expected exponential backoff');
    assert(DEFAULT_JOB_OPTIONS.backoff.delay >= 2000, 'Expected backoff delay >= 2000ms');
    assert(DEFAULT_JOB_OPTIONS.removeOnComplete, 'Expected removeOnComplete policy');
    assert(DEFAULT_JOB_OPTIONS.removeOnFail, 'Expected removeOnFail retention policy');
  });

  console.log('\n==================================================');
  console.log(`Test Results: ${passCount} Passed, ${failCount} Failed`);
  console.log('==================================================\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
