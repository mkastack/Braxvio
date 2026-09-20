const Proposal = require('../models/Proposal');
const { addProposalEmailJob } = require('../queues/proposalQueue');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handles partnership proposal form submission.
 * Validates payload, saves to MongoDB, enqueues email job in BullMQ,
 * and returns an immediate 200 response.
 */
async function submitProposal(req, res, next) {
  try {
    const body = req.body || {};

    // Support both canonical names and frontend alias names for seamless compatibility
    const fullName = (body.fullName || body.contactName || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const companyName = (body.companyName || body.organization || '').trim();
    const proposalDetails = (body.proposalDetails || body.proposal || '').trim();

    // 1. Validation for required fields
    const missingFields = [];
    if (!fullName) missingFields.push('Full Name (fullName)');
    if (!email) missingFields.push('Email Address (email)');
    if (!companyName) missingFields.push('Company / Organization Name (companyName)');
    if (!proposalDetails) missingFields.push('Proposal Details (proposalDetails)');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required field(s): ${missingFields.join(', ')}`,
        missingFields,
      });
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address format. Please provide a valid email.',
      });
    }

    // Honeypot check for bot spam prevention
    if (body._hp_check) {
      return res.status(200).json({
        success: true,
        message: 'Proposal received successfully',
        reference: 'BX-PRP-SPAM-PROTECTED',
      });
    }

    // 2. Persist record into MongoDB
    const proposalData = {
      fullName,
      email,
      companyName,
      proposalDetails,
      status: 'received',
      // Optional metadata fields
      phone: body.phone ? String(body.phone).trim() : undefined,
      country: body.country ? String(body.country).trim() : undefined,
      website: body.website ? String(body.website).trim() : undefined,
      partnershipType: body.type || body.partnershipType || undefined,
      proposalTitle: body.proposalTitle ? String(body.proposalTitle).trim() : undefined,
      targetProductId: body.targetProductId || undefined,
      timeline: body.timeline || undefined,
    };

    const proposal = await Proposal.create(proposalData);
    console.log(`[Controller] Saved proposal to MongoDB: ID ${proposal._id} (${companyName})`);

    // 3. Dispatch asynchronous email processing job to Redis via BullMQ
    let jobDispatched = false;
    try {
      await addProposalEmailJob({
        proposalId: proposal._id.toString(),
        payload: {
          ...proposal.toObject(),
          referenceCode: proposal.referenceCode,
        },
      });
      jobDispatched = true;
    } catch (queueError) {
      console.error(`[Controller Error] Failed to enqueue email job for Proposal ${proposal._id}: ${queueError.message}`);
      // Record failed queue attempt on the proposal document
      await Proposal.findByIdAndUpdate(proposal._id, {
        $set: {
          'emailNotificationStatus.lastError': `Queue dispatch error: ${queueError.message}`,
        },
      });
      // We still return 200 to the client since the proposal record is safely persisted in MongoDB!
    }

    // 4. Return immediate HTTP 200 response to prevent frontend user from waiting
    return res.status(200).json({
      success: true,
      message: 'Your partnership proposal has been submitted successfully. A confirmation email has been dispatched, and our team will review your proposal shortly.',
      proposalId: proposal._id,
      reference: proposal.referenceCode,
      queued: jobDispatched,
      createdAt: proposal.createdAt,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', '),
      });
    }

    console.error('[Controller Error] Error processing proposal submission:', error);
    return next(error);
  }
}

/**
 * Retrieves proposal status by ID (useful for frontend status lookups).
 */
async function getProposalStatus(req, res, next) {
  try {
    const { id } = req.params;
    const proposal = await Proposal.findById(id).select('status referenceCode createdAt emailNotificationStatus');

    if (!proposal) {
      return res.status(404).json({
        success: false,
        error: 'Proposal not found',
      });
    }

    return res.status(200).json({
      success: true,
      proposal,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  submitProposal,
  getProposalStatus,
};
