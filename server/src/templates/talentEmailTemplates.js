function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getTalentInternalNotificationTemplate(app) {
  const reference = app.referenceCode || (app._id ? `BX-TLT-${app._id.toString().slice(-6).toUpperCase()}` : 'N/A');
  const subject = `[New Talent Application] ${app.name} (${app.discipline || 'Engineering'}) - ${reference}`;

  const text = `
NEW BRAXVIO TALENT NETWORK APPLICATION
=======================================
Reference: ${reference}
Submission Date: ${new Date(app.createdAt || Date.now()).toUTCString()}

CANDIDATE DETAILS:
------------------
Full Name:  ${app.name}
Email:      ${app.email}
Location:   ${app.location || 'Not provided'}
Discipline: ${app.discipline || 'Not specified'}
Portfolio:  ${app.portfolio || 'Not provided'}
LinkedIn:   ${app.linkedin || 'Not provided'}
GitHub:     ${app.github || 'Not provided'}

CANDIDATE MESSAGE / WHAT THEY WANT TO BUILD:
---------------------------------------------
${app.message}

--
Braxvio Automated Talent Processing System
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
    .label { width: 38%; color: #94a3b8; font-weight: 500; }
    .value { width: 62%; color: #f1f5f9; font-weight: 600; }
    .message-box { background: #0a0d14; border: 1px solid #1e293b; border-radius: 8px; padding: 18px; margin-top: 10px; font-size: 14px; white-space: pre-wrap; color: #e2e8f0; line-height: 1.7; }
    .action-btn { display: inline-block; background: #2563eb; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: 600; margin-top: 20px; }
    .footer { background: #0c0f17; padding: 18px 32px; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Talent Network Application</h1>
      <span class="badge">REF: ${reference}</span>
    </div>
    <div class="content">
      <div class="section-title" style="margin-top:0;">Candidate Details</div>
      <table class="data-table">
        <tr><td class="label">Full Name:</td><td class="value">${escapeHtml(app.name)}</td></tr>
        <tr><td class="label">Email:</td><td class="value"><a href="mailto:${escapeHtml(app.email)}" style="color:#38bdf8;text-decoration:none;">${escapeHtml(app.email)}</a></td></tr>
        <tr><td class="label">Location:</td><td class="value">${escapeHtml(app.location || 'Not provided')}</td></tr>
        <tr><td class="label">Discipline:</td><td class="value">${escapeHtml(app.discipline || 'Not specified')}</td></tr>
        ${app.portfolio ? `<tr><td class="label">Portfolio:</td><td class="value"><a href="${escapeHtml(app.portfolio)}" style="color:#38bdf8;" target="_blank">${escapeHtml(app.portfolio)}</a></td></tr>` : ''}
        ${app.linkedin ? `<tr><td class="label">LinkedIn:</td><td class="value"><a href="${escapeHtml(app.linkedin)}" style="color:#38bdf8;" target="_blank">${escapeHtml(app.linkedin)}</a></td></tr>` : ''}
        ${app.github ? `<tr><td class="label">GitHub:</td><td class="value"><a href="${escapeHtml(app.github)}" style="color:#38bdf8;" target="_blank">${escapeHtml(app.github)}</a></td></tr>` : ''}
      </table>

      <div class="section-title">Message / What They Want to Build</div>
      <div class="message-box">${escapeHtml(app.message)}</div>

      <div style="text-align:center;margin-top:24px;">
        <a href="mailto:${escapeHtml(app.email)}?subject=Re: Braxvio Talent Network - ${reference}" class="action-btn">Reply to Candidate</a>
      </div>
    </div>
    <div class="footer">Internal notification generated automatically by Braxvio Backend Queue.</div>
  </div>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

function getTalentConfirmationTemplate(app) {
  const reference = app.referenceCode || (app._id ? `BX-TLT-${app._id.toString().slice(-6).toUpperCase()}` : 'N/A');
  const subject = `Talent Application Received - ${reference} | Braxvio`;

  const text = `
Dear ${app.name},

Thank you for your interest in joining the Braxvio Talent Network. We have successfully received your application.

Reference ID: ${reference}

Your submission:
- Name: ${app.name}
- Discipline: ${app.discipline || 'Not specified'}
- Location: ${app.location || 'Not provided'}

Our engineering leads review all talent submissions carefully. We will reach out at ${app.email} if there is a relevant opportunity or if we would like to learn more about your work.

If you have additional portfolio links or context you would like to share, simply reply to this email referencing ${reference}.

Warm regards,

Braxvio Engineering Team
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
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f19; color: #334155; margin: 0; padding: 24px; line-height: 1.6; }
    .card { max-width: 580px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .brand-header { background: #0f172a; padding: 28px 32px; }
    .brand-title { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.03em; margin: 0; }
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
      <div class="brand-subtitle">Engineering &amp; Talent Network</div>
    </div>
    <div class="body-content">
      <div class="lead">Dear ${escapeHtml(app.name)},</div>
      <p>
        Thank you for your interest in joining the Braxvio Talent Network. We have successfully received your application.
      </p>

      <div class="summary-card">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;font-weight:700;margin-bottom:10px;">Application Overview</div>
        <table style="width:100%;font-size:14px;">
          <tr>
            <td style="color:#64748b;padding:4px 0;">Reference Code:</td>
            <td style="color:#0284c7;font-weight:700;font-family:monospace;text-align:right;">${reference}</td>
          </tr>
          <tr>
            <td style="color:#64748b;padding:4px 0;">Discipline:</td>
            <td style="color:#0f172a;font-weight:600;text-align:right;">${escapeHtml(app.discipline || 'Not specified')}</td>
          </tr>
          <tr>
            <td style="color:#64748b;padding:4px 0;">Location:</td>
            <td style="color:#0f172a;font-weight:600;text-align:right;">${escapeHtml(app.location || 'Not provided')}</td>
          </tr>
          <tr>
            <td style="color:#64748b;padding:4px 0;">Status:</td>
            <td style="color:#059669;font-weight:600;text-align:right;">Received &amp; Under Review</td>
          </tr>
        </table>
      </div>

      <div style="font-weight:600;color:#0f172a;margin-top:24px;">What happens next?</div>
      <ul class="steps-box">
        <li>Our engineering leads review all talent submissions carefully.</li>
        <li>We will reach out at <strong>${escapeHtml(app.email)}</strong> if there is a relevant opportunity or if we would like to learn more about your work.</li>
      </ul>

      <p style="margin-top:24px;font-size:14px;color:#64748b;">
        If you have additional portfolio links or context to share, feel free to reply to this email referencing <strong>${reference}</strong>.
      </p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Braxvio. All rights reserved. &bull; <a href="https://www.braxvio.com" style="color:#64748b;text-decoration:underline;">braxvio.com</a>
    </div>
  </div>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

module.exports = { getTalentInternalNotificationTemplate, getTalentConfirmationTemplate };
