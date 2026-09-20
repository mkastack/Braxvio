const InvestmentInterest = require('../models/InvestmentInterest');
const { addInvestmentEmailJob } = require('../queues/investmentQueue');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handles investment interest form submission.
 * Validates payload, saves to MongoDB, enqueues email job in BullMQ,
 * and returns an immediate 200 response.
 */
async function submitInvestmentInterest(req, res, next) {
  try {
    const body = req.body || {};

    // Honeypot check
    if (body._hp_check) {
      return res.status(200).json({
        success: true,
        message: 'Investment interest received.',
        reference: 'BX-INV-SPAM-PROTECTED',
      });
    }

    const firstName = (body.firstName || '').trim();
    const lastName = (body.lastName || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const message = (body.message || '').trim();

    // Validate required fields
    const missingFields = [];
    if (!firstName) missingFields.push('First Name');
    if (!lastName) missingFields.push('Last Name');
    if (!email) missingFields.push('Email Address');
    if (!message) missingFields.push('Strategic Thesis / Message');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required field(s): ${missingFields.join(', ')}`,
        missingFields,
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address format. Please provide a valid email.',
      });
    }

    if (!body.consentAgreed) {
      return res.status(400).json({
        success: false,
        error: 'You must confirm the expression of interest agreement before submitting.',
      });
    }

    // Persist to MongoDB
    const investmentData = {
      firstName,
      lastName,
      email,
      message,
      status: 'received',
      phone: body.phone ? String(body.phone).trim() : undefined,
      organization: body.organization ? String(body.organization).trim() : undefined,
      jobTitle: body.jobTitle ? String(body.jobTitle).trim() : undefined,
      country: body.country ? String(body.country).trim() : undefined,
      website: body.website ? String(body.website).trim() : undefined,
      investorType: body.investorType || 'Individual Investor',
      interestType: body.interestType || 'Braxvio Parent Company',
      productId: body.productId || undefined,
      indicativeRange: body.indicativeRange || 'Prefer not to disclose',
      timeline: body.timeline || 'Exploring',
      consentAgreed: true,
      documents: Array.isArray(body.documents) ? body.documents : [],
    };

    const investment = await InvestmentInterest.create(investmentData);
    console.log(`[InvestmentController] Saved to MongoDB: ID ${investment._id} (${firstName} ${lastName})`);

    // Enqueue email job in BullMQ / Upstash Redis
    let jobDispatched = false;
    try {
      await addInvestmentEmailJob({
        investmentId: investment._id.toString(),
        payload: {
          ...investment.toObject(),
          referenceCode: investment.referenceCode,
        },
      });
      jobDispatched = true;
    } catch (queueError) {
      console.error(`[InvestmentController] Failed to enqueue email job for ${investment._id}: ${queueError.message}`);
      await InvestmentInterest.findByIdAndUpdate(investment._id, {
        $set: {
          'emailNotificationStatus.lastError': `Queue dispatch error: ${queueError.message}`,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your investment expression of interest has been received. A confirmation email has been dispatched.',
      investmentId: investment._id,
      reference: investment.referenceCode,
      queued: jobDispatched,
      createdAt: investment.createdAt,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', '),
      });
    }
    console.error('[InvestmentController] Error processing investment interest submission:', error);
    return next(error);
  }
}

module.exports = { submitInvestmentInterest };
