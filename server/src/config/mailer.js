const nodemailer = require('nodemailer');

/**
 * Creates and returns a Nodemailer transporter configured for Hostinger Private Email SMTP.
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  // Default to secure=true for 465 (SSL), false for 587 (STARTTLS) unless explicitly overridden
  const secure = process.env.SMTP_SECURE !== undefined
    ? process.env.SMTP_SECURE === 'true'
    : port === 465;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn('[Mailer Warning] SMTP_USER or SMTP_PASS is missing in environment variables. Outbound emails will fail.');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    // Pool connections to avoid opening too many SMTP connections
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    },
  });

  return transporter;
}

const mailer = createTransporter();

/**
 * Verifies SMTP connection and authentication.
 */
async function verifyTransporter() {
  try {
    await mailer.verify();
    console.log('[Mailer] Hostinger SMTP connection and credentials verified successfully.');
    return true;
  } catch (error) {
    console.error(`[Mailer Error] Failed to connect to Hostinger SMTP (${process.env.SMTP_HOST || 'smtp.hostinger.com'}:${process.env.SMTP_PORT || 465}): ${error.message}`);
    return false;
  }
}

module.exports = {
  mailer,
  createTransporter,
  verifyTransporter,
};
