function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Internal notification email for admin team when a new investment interest is submitted.
 */
function getInvestmentInternalNotificationTemplate(inv) {
  const reference = inv.referenceCode || (inv._id ? `BX-INV-${inv._id.toString().slice(-6).toUpperCase()}` : 'N/A');
  const fullName = `${inv.firstName || ''} ${inv.lastName || ''}`.trim();
  const subject = `[New Investment Interest] ${fullName} (${inv.organization || 'Individual'}) - ${reference}`;

  const text = `
NEW INVESTMENT EXPRESSION OF INTEREST
======================================
Reference: ${reference}
Submission Date: ${new Date(inv.createdAt || Date.now()).toUTCString()}

INVESTOR DETAILS:
-----------------
Name: ${fullName}
Email: ${inv.email}
Phone: ${inv.phone || 'Not provided'}
Organization: ${inv.organization || 'Individual'}
Job Title: ${inv.jobTitle || 'Not provided'}
Country: ${inv.country || 'Not provided'}
Website: ${inv.website || 'Not provided'}

INVESTMENT PARAMETERS:
----------------------
Investor Type: ${inv.investorType || 'Not specified'}
Area of Interest: ${inv.interestType || 'Not specified'}
Indicative Capital Range: ${inv.indicativeRange || 'Not disclosed'}
Investment Timeline: ${inv.timeline || 'Exploring'}

STRATEGIC THESIS / MESSAGE:
-----------------------------
${inv.message}

--
Braxvio Automated Investment Interest Processing System
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
    .data-table .label { width: 40%; color: #94a3b8; font-weight: 500; }
    .data-table .value { width: 60%; color: #f1f5f9; font-weight: 600; }
    .message-box { background: #0a0d14; border: 1px solid #1e293b; border-radius: 8px; padding: 18px; margin-top: 10px; font-size: 14px; white-space: pre-wrap; color: #e2e8f0; line-height: 1.7; }
    .action-btn { display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: 600; margin-top: 20px; }
    .footer { background: #0c0f17; padding: 18px 32px; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Investment Expression of Interest</h1>
      <span class="badge">REF: ${reference}</span>
    </div>
    <div class="content">
      <div class="section-title" style="margin-top: 0;">Investor Details</div>
      <table class="data-table">
        <tr><td class="label">Full Name:</td><td class="value">${escapeHtml(fullName)}</td></tr>
        <tr><td class="label">Email:</td><td class="value"><a href="mailto:${escapeHtml(inv.email)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(inv.email)}</a></td></tr>
        ${inv.phone ? `<tr><td class="label">Phone:</td><td class="value">${escapeHtml(inv.phone)}</td></tr>` : ''}
        <tr><td class="label">Organization:</td><td class="value">${escapeHtml(inv.organization || 'Individual')}</td></tr>
        ${inv.jobTitle ? `<tr><td class="label">Job Title:</td><td class="value">${escapeHtml(inv.jobTitle)}</td></tr>` : ''}
        ${inv.country ? `<tr><td class="label">Country:</td><td class="value">${escapeHtml(inv.country)}</td></tr>` : ''}
        ${inv.website ? `<tr><td class="label">Website:</td><td class="value"><a href="${escapeHtml(inv.website)}" style="color: #38bdf8;" target="_blank">${escapeHtml(inv.website)}</a></td></tr>` : ''}
      </table>

      <div class="section-title">Investment Parameters</div>
      <table class="data-table">
        <tr><td class="label">Investor Type:</td><td class="value">${escapeHtml(inv.investorType || 'Not specified')}</td></tr>
        <tr><td class="label">Area of Interest:</td><td class="value">${escapeHtml(inv.interestType || 'Not specified')}</td></tr>
        <tr><td class="label">Indicative Range:</td><td class="value">${escapeHtml(inv.indicativeRange || 'Not disclosed')}</td></tr>
        <tr><td class="label">Timeline:</td><td class="value">${escapeHtml(inv.timeline || 'Exploring')}</td></tr>
      </table>

      <div class="section-title">Strategic Thesis / Message</div>
      <div class="message-box">${escapeHtml(inv.message)}</div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${escapeHtml(inv.email)}?subject=Re: Braxvio Investment Interest - ${reference}" class="action-btn" style="margin-right: 12px;">Reply to Investor</a>
        ${inv._id ? `<a href="${(process.env.APP_BASE_URL || 'https://www.braxvio.com')}/admin/partnerships/investment/${inv._id}" class="action-btn" style="background: #334155;" target="_blank">View Record &rarr;</a>` : ''}
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
 * Confirmation auto-reply email sent to the investor.
 */
function getInvestmentConfirmationTemplate(inv) {
  const reference = inv.referenceCode || (inv._id ? `BX-INV-${inv._id.toString().slice(-6).toUpperCase()}` : 'N/A');
  const fullName = `${inv.firstName || ''} ${inv.lastName || ''}`.trim();
  const subject = `Investment Interest Received - Reference ${reference} | Braxvio`;

  const text = `
Dear ${fullName},

Thank you for expressing your investment interest in Braxvio. We have successfully received and logged your submission.

Reference ID: ${reference}

A summary of your submission:
- Name: ${fullName}
- Organization: ${inv.organization || 'Individual'}
- Area of Interest: ${inv.interestType || 'Braxvio Parent Company'}
- Indicative Range: ${inv.indicativeRange || 'Not disclosed'}

Our team reviews all investment expressions within 2 to 3 business days. If there is a relevant opportunity for discussion, a member of the Braxvio leadership team will contact you directly at ${inv.email}.

If you have supplementary documentation, questions, or updates, simply reply to this email referencing ${reference}.

Warm regards,

Braxvio Corporate Development Team
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
    .steps-box { margin-top: 24px; padding-left: 20px; }
    .steps-box li { margin-bottom: 8px; font-size: 14px; color: #475569; }
    .footer { background: #f8fafc; padding: 20px 32px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="brand-header">
      <div class="brand-title">BRAXVIO</div>
      <div class="brand-subtitle">Corporate Development &amp; Investor Relations</div>
    </div>
    <div class="body-content">
      <div class="lead">Dear ${escapeHtml(fullName)},</div>
      <p>
        Thank you for expressing your investment interest in Braxvio. We have successfully received and logged your submission.
      </p>

      <div class="summary-card">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 700; margin-bottom: 10px;">Submission Overview</div>
        <table style="width: 100%; font-size: 14px;">
          <tr>
            <td style="color: #64748b; padding: 4px 0;">Reference Code:</td>
            <td style="color: #0284c7; font-weight: 700; font-family: monospace; text-align: right;">${reference}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding: 4px 0;">Organization:</td>
            <td style="color: #0f172a; font-weight: 600; text-align: right;">${escapeHtml(inv.organization || 'Individual')}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding: 4px 0;">Area of Interest:</td>
            <td style="color: #0f172a; font-weight: 600; text-align: right;">${escapeHtml(inv.interestType || 'Braxvio Parent Company')}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding: 4px 0;">Status:</td>
            <td style="color: #059669; font-weight: 600; text-align: right;">Under Preliminary Review</td>
          </tr>
        </table>
      </div>

      <div style="font-weight: 600; color: #0f172a; margin-top: 24px;">What happens next?</div>
      <ul class="steps-box">
        <li>Our corporate development team reviews all expressions within 2&ndash;3 business days.</li>
        <li>If there is a relevant opportunity for discussion, a member of Braxvio leadership will contact you directly at <strong>${escapeHtml(inv.email)}</strong>.</li>
      </ul>

      <p style="margin-top: 24px; font-size: 14px; color: #64748b;">
        If you have supplementary documentation or questions, feel free to reply directly to this email referencing <strong>${reference}</strong>.
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

module.exports = {
  getInvestmentInternalNotificationTemplate,
  getInvestmentConfirmationTemplate,
};
