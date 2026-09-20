/**
 * Generates email content for internal team notification.
 *
 * @param {Object} proposal
 * @returns {{ subject: string, text: string, html: string }}
 */
function getInternalNotificationTemplate(proposal) {
  const reference = proposal.referenceCode || (proposal._id ? `BX-PRP-${proposal._id.toString().slice(-6).toUpperCase()}` : 'N/A');
  const subject = `[New Partnership Proposal] ${proposal.companyName} (${proposal.fullName}) - ${reference}`;

  const text = `
NEW PARTNERSHIP PROPOSAL RECEIVED
==================================
Reference: ${reference}
Submission Date: ${new Date(proposal.createdAt || Date.now()).toUTCString()}

SUBMITTER DETAILS:
------------------
Full Name: ${proposal.fullName}
Email: ${proposal.email}
Company Name: ${proposal.companyName}
Phone: ${proposal.phone || 'Not provided'}
Website: ${proposal.website || 'Not provided'}
Country: ${proposal.country || 'Not provided'}
Partnership Type: ${proposal.partnershipType || 'General Strategic'}

PROPOSAL DETAILS:
-----------------
Title: ${proposal.proposalTitle || 'Partnership Proposal'}
Target Focus: ${proposal.targetProductId || 'Braxvio Global Ecosystem'}
Timeline: ${proposal.timeline || 'Flexible'}

Details:
${proposal.proposalDetails}

--
Braxvio Automated Proposal Processing System
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0f17; color: #e2e8f0; margin: 0; padding: 24px; line-height: 1.6; }
    .container { max-width: 640px; margin: 0 auto; background: #131826; border: 1px solid #243048; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px 32px; border-bottom: 1px solid #2d3b55; }
    .header h1 { margin: 0; font-size: 20px; color: #f8fafc; font-weight: 700; letter-spacing: -0.02em; }
    .header .badge { display: inline-block; margin-top: 8px; font-size: 12px; font-family: monospace; background: #0284c7; color: #ffffff; padding: 4px 10px; border-radius: 4px; font-weight: 600; }
    .content { padding: 32px; }
    .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin: 24px 0 12px 0; border-bottom: 1px solid #1e293b; padding-bottom: 6px; }
    .data-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    .data-table td { padding: 8px 0; font-size: 14px; vertical-align: top; }
    .data-table .label { width: 38%; color: #94a3b8; font-weight: 500; }
    .data-table .value { width: 62%; color: #f1f5f9; font-weight: 600; }
    .proposal-box { background: #0a0d14; border: 1px solid #1e293b; border-radius: 8px; padding: 18px; margin-top: 10px; font-size: 14px; white-space: pre-wrap; color: #e2e8f0; line-height: 1.7; }
    .action-btn { display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: 600; margin-top: 20px; }
    .footer { background: #0c0f17; padding: 18px 32px; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Partnership Proposal</h1>
      <span class="badge">REF: ${reference}</span>
    </div>
    <div class="content">
      <div class="section-title" style="margin-top: 0;">Submitter Details</div>
      <table class="data-table">
        <tr>
          <td class="label">Full Name:</td>
          <td class="value">${escapeHtml(proposal.fullName)}</td>
        </tr>
        <tr>
          <td class="label">Email Address:</td>
          <td class="value"><a href="mailto:${escapeHtml(proposal.email)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(proposal.email)}</a></td>
        </tr>
        <tr>
          <td class="label">Company / Organization:</td>
          <td class="value">${escapeHtml(proposal.companyName)}</td>
        </tr>
        ${proposal.phone ? `<tr><td class="label">Phone:</td><td class="value">${escapeHtml(proposal.phone)}</td></tr>` : ''}
        ${proposal.website ? `<tr><td class="label">Website:</td><td class="value"><a href="${escapeHtml(proposal.website)}" style="color: #38bdf8;" target="_blank">${escapeHtml(proposal.website)}</a></td></tr>` : ''}
        ${proposal.country ? `<tr><td class="label">Country:</td><td class="value">${escapeHtml(proposal.country)}</td></tr>` : ''}
        ${proposal.partnershipType ? `<tr><td class="label">Partnership Discipline:</td><td class="value">${escapeHtml(proposal.partnershipType)}</td></tr>` : ''}
      </table>

      <div class="section-title">Proposal Details</div>
      ${proposal.proposalTitle ? `<div style="font-size: 15px; font-weight: 700; color: #38bdf8; margin-bottom: 8px;">${escapeHtml(proposal.proposalTitle)}</div>` : ''}
      <div class="proposal-box">${escapeHtml(proposal.proposalDetails)}</div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${escapeHtml(proposal.email)}?subject=Re: Braxvio Partnership Proposal - ${reference}" class="action-btn" style="margin-right: 12px;">Reply to Submitter</a>
        ${proposal._id ? `<a href="${(process.env.APP_BASE_URL || 'https://www.braxvio.com')}/admin/partnerships/inquiries/${proposal._id}" class="action-btn" style="background: #334155;" target="_blank">View Proposal Record &rarr;</a>` : ''}
      </div>
    </div>
    <div class="footer">
      Internal notification generated automatically by Braxvio Backend Queue.
    </div>
  </div>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

/**
 * Generates email content for user confirmation auto-reply.
 *
 * @param {Object} proposal
 * @returns {{ subject: string, text: string, html: string }}
 */
function getUserConfirmationTemplate(proposal) {
  const reference = proposal.referenceCode || (proposal._id ? `BX-PRP-${proposal._id.toString().slice(-6).toUpperCase()}` : 'N/A');
  const subject = `Proposal Received: Thank you for your partnership interest - ${reference}`;

  const text = `
Dear ${proposal.fullName},

Thank you for reaching out to Braxvio. We have successfully received the partnership proposal submitted on behalf of ${proposal.companyName}.

Reference ID: ${reference}

Our corporate development and partnerships team is currently reviewing the scope and synergy of your proposal. We strive to review all serious inquiries within 2 to 3 business days.

A summary of your submitted details:
- Company: ${proposal.companyName}
- Submitter: ${proposal.fullName}
- Reference: ${reference}

If you have supplementary files, questions, or updates regarding this proposal, simply reply directly to this email referencing ${reference}.

Warm regards,

Braxvio Strategic Partnerships Team
https://www.braxvio.com
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #334155; margin: 0; padding: 24px; line-height: 1.6; }
    .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .brand-header { background: #0f172a; padding: 28px 32px; text-align: left; }
    .brand-title { font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.03em; margin: 0; }
    .brand-subtitle { font-size: 13px; color: #94a3b8; margin-top: 4px; letter-spacing: 0.05em; text-transform: uppercase; }
    .body-content { padding: 36px 32px; color: #1e293b; font-size: 15px; }
    .lead { font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 16px; }
    .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; border-bottom: 1px solid #edf2f7; }
    .summary-row:last-child { border-bottom: none; }
    .summary-label { color: #64748b; font-weight: 500; }
    .summary-value { color: #0f172a; font-weight: 600; }
    .steps-box { margin-top: 24px; padding-left: 20px; }
    .steps-box li { margin-bottom: 8px; font-size: 14px; color: #475569; }
    .footer { background: #f8fafc; padding: 20px 32px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="brand-header">
      <div class="brand-title">BRAXVIO</div>
      <div class="brand-subtitle">Strategic Partnerships & Global Ventures</div>
    </div>
    <div class="body-content">
      <div class="lead">Dear ${escapeHtml(proposal.fullName)},</div>
      <p>
        Thank you for your interest in collaborating with Braxvio. We have successfully received your partnership proposal on behalf of <strong>${escapeHtml(proposal.companyName)}</strong>.
      </p>

      <div class="summary-card">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 700; margin-bottom: 10px;">Submission Overview</div>
        <table style="width: 100%; font-size: 14px;">
          <tr>
            <td style="color: #64748b; padding: 4px 0;">Reference Code:</td>
            <td style="color: #0284c7; font-weight: 700; font-family: monospace; text-align: right;">${reference}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding: 4px 0;">Company / Entity:</td>
            <td style="color: #0f172a; font-weight: 600; text-align: right;">${escapeHtml(proposal.companyName)}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding: 4px 0;">Status:</td>
            <td style="color: #059669; font-weight: 600; text-align: right;">Under Preliminary Review</td>
          </tr>
        </table>
      </div>

      <div style="font-weight: 600; color: #0f172a; margin-top: 24px;">What happens next?</div>
      <ul class="steps-box">
        <li>Our partnerships team evaluates strategic fit and technical synergy (typically 2–3 business days).</li>
        <li>A partnership lead will contact you directly at <strong>${escapeHtml(proposal.email)}</strong> with next steps or scheduling for an introductory alignment session.</li>
      </ul>

      <p style="margin-top: 24px; font-size: 14px; color: #64748b;">
        If you have questions or wish to provide supplementary documentation, feel free to reply directly to this email.
      </p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Braxvio. All rights reserved. &bull; <a href="https://www.braxvio.com" style="color: #64748b; text-decoration: underline;">braxvio.com</a>
    </div>
  </div>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = {
  getInternalNotificationTemplate,
  getUserConfirmationTemplate,
};
