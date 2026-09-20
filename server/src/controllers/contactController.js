const ContactInquiry = require('../models/ContactInquiry');
const { addContactEmailJob } = require('../queues/contactQueue');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function submitContactInquiry(req, res, next) {
  try {
    const body = req.body || {};

    // Honeypot check
    if (body._hp_check) {
      console.warn('[ContactController] Spam detected via honeypot field.');
      return res.status(200).json({
        success: true,
        reference: 'BX-CNT-SPAM-PROTECTED',
      });
    }

    const name = (body.name || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const subject = (body.subject || '').trim();
    const message = (body.message || '').trim();
    const category = body.category || 'General';
    const organization = (body.organization || '').trim();

    const missingFields = [];
    if (!name) missingFields.push('Name');
    if (!email) missingFields.push('Work Email');
    if (!subject) missingFields.push('Subject');
    if (!message) missingFields.push('Message');

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
        error: 'Invalid email address format.',
      });
    }

    const inquiryData = {
      name,
      email,
      category,
      organization: organization || undefined,
      subject,
      message,
      status: 'received',
    };

    const inquiry = await ContactInquiry.create(inquiryData);
    console.log(`[ContactController] Saved to MongoDB Atlas: ID ${inquiry._id} (Category: ${category})`);

    let jobDispatched = false;
    try {
      await addContactEmailJob({
        inquiryId: inquiry._id.toString(),
        payload: {
          ...inquiry.toObject(),
          referenceCode: inquiry.referenceCode,
        },
      });
      jobDispatched = true;
    } catch (queueError) {
      console.error(`[ContactController] Failed to enqueue email job: ${queueError.message}`);
      await ContactInquiry.findByIdAndUpdate(inquiry._id, {
        $set: {
          'emailNotificationStatus.lastError': `Queue dispatch error: ${queueError.message}`,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been received. A receipt confirmation has been dispatched.',
      inquiryId: inquiry._id,
      reference: inquiry.referenceCode,
      queued: jobDispatched,
      createdAt: inquiry.createdAt,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', '),
      });
    }
    console.error('[ContactController] Error processing contact inquiry:', error);
    return next(error);
  }
}

module.exports = {
  submitContactInquiry,
};
