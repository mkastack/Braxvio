function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getContactInternalNotificationTemplate(inquiry) {
  const reference = inquiry.referenceCode || (inquiry._id ? `BX-CNT-${inquiry._id.toString().slice(-6).toUpperCase()}` : 'N/A');
  const subject = `[New Contact Inquiry] [${inquiry.category || 'General'}] ${inquiry.subject} - ${reference}`;

  const text = `
NEW BRAXVIO CONTACT INQUIRY
===========================
Reference: ${reference}
Category:  ${inquiry.category || 'General'}
Date:      ${new Date(inquiry.createdAt || Date.now()).toUTCString()}

CONTACT DETAILS:
----------------
Name:         ${inquiry.name}
Email:        ${inquiry.email}
Organization: ${inquiry.organization || 'Not provided'}
Subject:      ${inquiry.subject}

MESSAGE:
--------
${inquiry.message}

--
Braxvio Automated Contact Inquiry Processing System
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0c0f17; color: #e2e8f0; margin: 0; padding: 24px; line-height: 1.6; }
    .container { max-width: 640px; margin: 0 auto; background: #131826; border: 1px solid #243048; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px 32px; border-bottom: 1px solid #2d3b55; }
    .header h1 { margin: 0; font-size: 20px; color: #f8fafc; font-weight: 700; }
    .badge { display: inline-block; margin-top: 8px; font-size: 12px; font-family: monospace; background: #0284c7; color: #fff; padding: 4px 10px; border-radius: 4px; font-weight: 600; }
    .content { padding: 32px; }
    .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin: 24px 0 12px; border-bottom: 1px solid #1e293b; padding-bottom: 6px; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table td { padding: 8px 0; font-size: 14px; vertical-align: top; }
    .label { width: 35%; color: #94a3b8; font-weight: 500; }
    .value { width: 65%; color: #f1f5f9; font-weight: 600; }
    .message-box { background: #0a0d14; border: 1px solid #1e293b; border-radius: 8px; padding: 18px; margin-top: 10px; font-size: 14px; white-space: pre-wrap; color: #e2e8f0; line-height: 1.7; }
    .action-btn { display: inline-block; background: #006eaa; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: 600; margin-top: 20px; }
    .footer { background: #0c0f17; padding: 18px 32px; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Braxvio Contact Inquiry</h1>
      <span class="badge">REF: ${reference} · ${escapeHtml(inquiry.category || 'General')}</span>
    </div>
    <div class="content">
      <div class="section-title" style="margin-top:0;">Inquiry Information</div>
      <table class="data-table">
        <tr><td class="label">Category:</td><td class="value">${escapeHtml(inquiry.category || 'General')}</td></tr>
        <tr><td class="label">Full Name:</td><td class="value">${escapeHtml(inquiry.name)}</td></tr>
        <tr><td class="label">Email Address:</td><td class="value"><a href="mailto:${escapeHtml(inquiry.email)}" style="color:#38bdf8;text-decoration:none;">${escapeHtml(inquiry.email)}</a></td></tr>
        <tr><td class="label">Organization:</td><td class="value">${escapeHtml(inquiry.organization || 'Not provided')}</td></tr>
        <tr><td class="label">Subject:</td><td class="value">${escapeHtml(inquiry.subject)}</td></tr>
      </table>

      <div class="section-title">Message Body</div>
      <div class="message-box">${escapeHtml(inquiry.message)}</div>

      <div style="text-align:center;margin-top:24px;">
        <a href="mailto:${escapeHtml(inquiry.email)}?subject=Re: [${reference}] ${escapeHtml(inquiry.subject)}" class="action-btn">Reply to Sender</a>
      </div>
    </div>
    <div class="footer">Internal notification dispatched via Braxvio Automated Contact Queue.</div>
  </div>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

function getContactConfirmationTemplate(inquiry) {
  const reference = inquiry.referenceCode || (inquiry._id ? `BX-CNT-${inquiry._id.toString().slice(-6).toUpperCase()}` : 'N/A');
  const subject = `Inquiry Received - ${reference} | Braxvio`;

  const text = `
Hello ${inquiry.name},

Thank you for reaching out to Braxvio Technologies. We have received your ${inquiry.category || 'inquiry'} message regarding "${inquiry.subject}".

Your submission reference code is: ${reference}

Our team has received your message and will review it carefully.
Expected response turnaround: 2–3 business days.

Inquiry Summary:
- Category: ${inquiry.category || 'General'}
- Subject: ${inquiry.subject}
- Submitter Email: ${inquiry.email}

If you need to supplement your inquiry or have urgent updates, please reply directly to this email referencing your reference code.

Best regards,
Braxvio Communications Desk
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
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #002F5B; padding: 32px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; color: #ffffff; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 8px 0 0; color: #93c5fd; font-size: 13px; font-family: monospace; letter-spacing: 0.05em; text-transform: uppercase; }
    .content { padding: 32px; }
    .greeting { font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 12px; }
    .lead { font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 24px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px; }
    .card-title { font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px; font-weight: 700; }
    .ref-badge { display: inline-block; font-family: monospace; font-size: 16px; font-weight: 700; color: #006eaa; background: #e0f2fe; padding: 4px 12px; border-radius: 6px; }
    .timeline-row { display: flex; justify-content: space-between; margin-top: 12px; font-size: 13px; color: #334155; }
    .footer { background: #f1f5f9; padding: 20px 32px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>BRAXVIO</h1>
      <p>Communications & Inquiries Desk</p>
    </div>
    <div class="content">
      <div class="greeting">Hello ${escapeHtml(inquiry.name)},</div>
      <p class="lead">
        Thank you for contacting Braxvio Technologies. Your inquiry regarding <strong>"${escapeHtml(inquiry.subject)}"</strong> has been safely received through our email pipeline.
      </p>

      <div class="card">
        <div class="card-title">Inquiry Reference Code</div>
        <div class="ref-badge">${reference}</div>
        <div style="margin-top: 16px; font-size: 13px; color: #475569;">
          <div><strong>Category:</strong> ${escapeHtml(inquiry.category || 'General')}</div>
          ${inquiry.organization ? `<div><strong>Organization:</strong> ${escapeHtml(inquiry.organization)}</div>` : ''}
          <div style="margin-top: 8px;"><strong>Expected Response:</strong> <span style="color: #047857; font-weight: 600;">2–3 Business Days</span></div>
        </div>
      </div>

      <p style="font-size: 13px; color: #64748b;">
        Our team reviews all incoming communications. If you need to submit supplementary documentation or follow up, please reply directly to this email referencing your reference code <strong>${reference}</strong>.
      </p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} Braxvio Technologies. All rights reserved.<br>
      Accra, Greater Accra Region, Ghana · <a href="https://www.braxvio.com" style="color: #006eaa; text-decoration: none;">www.braxvio.com</a>
    </div>
  </div>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

module.exports = {
  getContactInternalNotificationTemplate,
  getContactConfirmationTemplate,
};
