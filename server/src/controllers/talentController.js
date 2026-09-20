const TalentApplication = require('../models/TalentApplication');
const { addTalentEmailJob } = require('../queues/talentQueue');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function submitTalentApplication(req, res, next) {
  try {
    const body = req.body || {};

    // Honeypot
    if (body._hp_check) {
      return res.status(200).json({ success: true, reference: 'BX-TLT-SPAM-PROTECTED' });
    }

    const name = (body.name || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const message = (body.message || '').trim();

    const missingFields = [];
    if (!name) missingFields.push('Full Name');
    if (!email) missingFields.push('Email Address');
    if (!message) missingFields.push('Message');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required field(s): ${missingFields.join(', ')}`,
        missingFields,
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address format.' });
    }

    const applicationData = {
      name,
      email,
      message,
      status: 'received',
      location: body.location ? String(body.location).trim() : undefined,
      discipline: body.discipline || 'Engineering',
      portfolio: body.portfolio ? String(body.portfolio).trim() : undefined,
      linkedin: body.linkedin ? String(body.linkedin).trim() : undefined,
      github: body.github ? String(body.github).trim() : undefined,
    };

    const application = await TalentApplication.create(applicationData);
    console.log(`[TalentController] Saved to MongoDB: ID ${application._id} (${name})`);

    let jobDispatched = false;
    try {
      await addTalentEmailJob({
        applicationId: application._id.toString(),
        payload: { ...application.toObject(), referenceCode: application.referenceCode },
      });
      jobDispatched = true;
    } catch (queueError) {
      console.error(`[TalentController] Failed to enqueue email job: ${queueError.message}`);
      await TalentApplication.findByIdAndUpdate(application._id, {
        $set: { 'emailNotificationStatus.lastError': `Queue dispatch error: ${queueError.message}` },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your talent application has been received. A confirmation email has been dispatched.',
      applicationId: application._id,
      reference: application.referenceCode,
      queued: jobDispatched,
      createdAt: application.createdAt,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    console.error('[TalentController] Error processing talent application:', error);
    return next(error);
  }
}

module.exports = { submitTalentApplication };
