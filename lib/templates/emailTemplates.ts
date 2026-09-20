/**
 * Unified email template generators for Braxvio form submissions:
 * - Strategic Partnerships (Proposals)
 * - Capital Allocation & Strategic Co-Investment
 * - Engineering & Design Careers (Talent)
 * - General & Categorized Inquiries (Contact)
 */

export function escapeHtml(str: unknown): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   1. PARTNERSHIP PROPOSALS
   ========================================================================== */

export function getProposalInternalTemplate(proposal: {
  fullName: string;
  email: string;
  companyName: string;
  proposalDetails: string;
  phone?: string;
  website?: string;
  country?: string;
  partnershipType?: string;
  proposalTitle?: string;
  targetProductId?: string;
  timeline?: string;
  referenceCode?: string;
  _id?: string;
  createdAt?: Date;
}) {
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
  <title>${escapeHtml(subject)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0c0f17; color: #e2e8f0; margin: 0; padding: 24px; line-height: 1.6; }
    .container { max-width: 640px; margin: 0 auto; background: #131826; border: 1px solid #243048; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px 32px; border-bottom: 1px solid #2d3b55; }
    .header h1 { margin: 0; font-size: 20px; color: #f8fafc; font-weight: 700; }
    .badge { display: inline-block; margin-top: 8px; font-size: 12px; font-family: monospace; background: #0284c7; color: #ffffff; padding: 4px 10px; border-radius: 4px; font-weight: 600; }
    .content { padding: 32px; }
    .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin: 24px 0 12px 0; border-bottom: 1px solid #1e293b; padding-bottom: 6px; }
    .data-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    .data-table td { padding: 8px 0; font-size: 14px; }
    .data-table .label { width: 38%; color: #94a3b8; font-weight: 500; }
    .data-table .value { width: 62%; color: #f1f5f9; font-weight: 600; }
    .proposal-box { background: #0a0d14; border: 1px solid #1e293b; border-radius: 8px; padding: 18px; margin-top: 10px; font-size: 14px; white-space: pre-wrap; color: #e2e8f0; }
    .footer { background: #0c0f17; padding: 18px 32px; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Partnership Proposal</h1>
      <span class="badge">REF: ${escapeHtml(reference)}</span>
    </div>
    <div class="content">
      <div class="section-title" style="margin-top: 0;">Submitter Details</div>
      <table class="data-table">
        <tr><td class="label">Full Name:</td><td class="value">${escapeHtml(proposal.fullName)}</td></tr>
        <tr><td class="label">Email Address:</td><td class="value"><a href="mailto:${escapeHtml(proposal.email)}" style="color: #38bdf8;">${escapeHtml(proposal.email)}</a></td></tr>
        <tr><td class="label">Company / Organization:</td><td class="value">${escapeHtml(proposal.companyName)}</td></tr>
        ${proposal.phone ? `<tr><td class="label">Phone:</td><td class="value">${escapeHtml(proposal.phone)}</td></tr>` : ''}
        ${proposal.website ? `<tr><td class="label">Website:</td><td class="value"><a href="${escapeHtml(proposal.website)}" style="color: #38bdf8;" target="_blank">${escapeHtml(proposal.website)}</a></td></tr>` : ''}
        ${proposal.country ? `<tr><td class="label">Country:</td><td class="value">${escapeHtml(proposal.country)}</td></tr>` : ''}
        ${proposal.partnershipType ? `<tr><td class="label">Type:</td><td class="value">${escapeHtml(proposal.partnershipType)}</td></tr>` : ''}
      </table>
      <div class="section-title">Proposal Details</div>
      ${proposal.proposalTitle ? `<div style="font-size: 15px; font-weight: 700; color: #38bdf8; margin-bottom: 8px;">${escapeHtml(proposal.proposalTitle)}</div>` : ''}
      <div class="proposal-box">${escapeHtml(proposal.proposalDetails)}</div>
    </div>
    <div class="footer">Internal notification generated automatically by Braxvio Processing System.</div>
  </div>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

export function getProposalConfirmationTemplate(proposal: {
  fullName: string;
  email: string;
  companyName: string;
  referenceCode?: string;
  _id?: string;
}) {
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
  <title>${escapeHtml(subject)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f19; color: #334155; margin: 0; padding: 24px; line-height: 1.6; }
    .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .brand-header { background: #0f172a; padding: 28px 32px; text-align: left; }
    .brand-title { font-size: 22px; font-weight: 800; color: #ffffff; margin: 0; letter-spacing: -0.03em; }
    .brand-subtitle { font-size: 13px; color: #94a3b8; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
    .body-content { padding: 36px 32px; color: #1e293b; font-size: 15px; }
    .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .summary-row { padding: 6px 0; font-size: 14px; border-bottom: 1px solid #edf2f7; }
    .summary-row:last-child { border-bottom: none; }
    .summary-label { color: #64748b; font-weight: 500; display: inline-block; width: 40%; }
    .summary-value { color: #0f172a; font-weight: 600; display: inline-block; width: 55%; }
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
      <p style="font-weight: 600; font-size: 16px; margin-top: 0;">Dear ${escapeHtml(proposal.fullName)},</p>
      <p>Thank you for your interest in collaborating with Braxvio. We have successfully received your partnership proposal on behalf of <strong>${escapeHtml(proposal.companyName)}</strong>.</p>
      <div class="summary-card">
        <div class="summary-row"><span class="summary-label">Reference ID:</span><span class="summary-value" style="font-family: monospace; color: #0284c7;">${escapeHtml(reference)}</span></div>
        <div class="summary-row"><span class="summary-label">Organization:</span><span class="summary-value">${escapeHtml(proposal.companyName)}</span></div>
        <div class="summary-row"><span class="summary-label">Contact Person:</span><span class="summary-value">${escapeHtml(proposal.fullName)}</span></div>
        <div class="summary-row"><span class="summary-label">Status:</span><span class="summary-value" style="color: #16a34a;">Received &amp; Queued</span></div>
      </div>
      <p>Our strategic partnerships team is reviewing your proposal. Turnaround is typically 2–3 business days.</p>
      <p style="margin-bottom: 0;">Warm regards,<br><strong>Braxvio Strategic Partnerships</strong></p>
    </div>
    <div class="footer">&copy; ${new Date().getFullYear()} Braxvio Technologies. All rights reserved.</div>
  </div>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

/* ==========================================================================
   2. INVESTMENT INTEREST
   ========================================================================== */

export function getInvestmentInternalTemplate(data: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  organization?: string;
  jobTitle?: string;
  investorType?: string;
  interestType?: string;
  indicativeRange?: string;
  country?: string;
  referenceCode?: string;
  _id?: string;
}) {
  const reference = data.referenceCode || (data._id ? `BX-INV-${data._id.toString().slice(-6).toUpperCase()}` : 'N/A');
  const subject = `[Investment Interest] ${data.firstName} ${data.lastName} (${data.organization || 'Individual'}) - ${reference}`;

  const text = `
NEW INVESTMENT INTEREST RECEIVED
=================================
Reference: ${reference}
Investor: ${data.firstName} ${data.lastName}
Email: ${data.email}
Organization: ${data.organization || 'Not provided'}
Role: ${data.jobTitle || 'Not provided'}
Investor Type: ${data.investorType || 'Individual Investor'}
Interest Scope: ${data.interestType || 'Braxvio Parent Company'}
Indicative Range: ${data.indicativeRange || 'Undisclosed'}
Country: ${data.country || 'Not provided'}

Thesis / Message:
${data.message}
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="font-family: sans-serif; background: #0c0f17; color: #e2e8f0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #131826; border: 1px solid #243048; border-radius: 12px; padding: 32px;">
    <h2 style="color: #38bdf8; margin-top: 0;">Investment Interest: ${escapeHtml(reference)}</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}" style="color: #38bdf8;">${escapeHtml(data.email)}</a></p>
    <p><strong>Organization:</strong> ${escapeHtml(data.organization || 'Individual')}</p>
    <p><strong>Investor Type:</strong> ${escapeHtml(data.investorType || 'Individual')}</p>
    <p><strong>Indicative Range:</strong> ${escapeHtml(data.indicativeRange || 'Undisclosed')}</p>
    <div style="background: #0a0d14; border: 1px solid #1e293b; padding: 16px; border-radius: 8px; margin-top: 16px; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
  </div>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

export function getInvestmentConfirmationTemplate(data: {
  firstName: string;
  lastName: string;
  email: string;
  referenceCode?: string;
  _id?: string;
}) {
  const reference = data.referenceCode || (data._id ? `BX-INV-${data._id.toString().slice(-6).toUpperCase()}` : 'N/A');
  const subject = `Investment Inquiry Received: ${reference} - Braxvio Capital`;

  const text = `
Dear ${data.firstName} ${data.lastName},

Thank you for registering your strategic investment interest with Braxvio.

Reference ID: ${reference}

Our investor relations team has received your submission. Qualified institutional and accredited partner inquiries are reviewed in strict confidence.

Warm regards,
Braxvio Investor Relations & Capital Allocation
https://www.braxvio.com
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="font-family: sans-serif; background: #0b0f19; color: #334155; padding: 24px;">
  <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 32px; border: 1px solid #e2e8f0;">
    <h2 style="color: #0f172a; margin-top: 0;">BRAXVIO CAPITAL</h2>
    <p>Dear ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)},</p>
    <p>Thank you for expressing investment interest in Braxvio. Your transmission has been secured under reference <strong style="color: #0284c7;">${escapeHtml(reference)}</strong>.</p>
    <p>Our capital relations desk handles strategic alignment and will reach out if synergies match.</p>
    <p style="margin-bottom: 0;">Warm regards,<br><strong>Braxvio Investor Relations</strong></p>
  </div>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

/* ==========================================================================
   3. TALENT & CAREERS
   ========================================================================== */

export function getTalentInternalTemplate(data: {
  name: string;
  email: string;
  discipline?: string;
  location?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  message: string;
  referenceCode?: string;
  _id?: string;
}) {
  const reference = data.referenceCode || (data._id ? `BX-TLT-${data._id.toString().slice(-6).toUpperCase()}` : 'N/A');
  const subject = `[Career Application] ${data.name} - ${data.discipline || 'Engineering'} (${reference})`;

  const text = `
NEW CAREER APPLICATION RECEIVED
================================
Reference: ${reference}
Applicant: ${data.name}
Email: ${data.email}
Discipline: ${data.discipline || 'General'}
Location: ${data.location || 'Not provided'}
Portfolio: ${data.portfolio || 'Not provided'}
LinkedIn: ${data.linkedin || 'Not provided'}
GitHub: ${data.github || 'Not provided'}

Cover Letter / Intro:
${data.message}
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="font-family: sans-serif; background: #0c0f17; color: #e2e8f0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #131826; border: 1px solid #243048; border-radius: 12px; padding: 32px;">
    <h2 style="color: #38bdf8; margin-top: 0;">Career Application: ${escapeHtml(reference)}</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}" style="color: #38bdf8;">${escapeHtml(data.email)}</a></p>
    <p><strong>Discipline:</strong> ${escapeHtml(data.discipline || 'General')}</p>
    <p><strong>Location:</strong> ${escapeHtml(data.location || 'Remote')}</p>
    <div style="background: #0a0d14; border: 1px solid #1e293b; padding: 16px; border-radius: 8px; margin-top: 16px; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
  </div>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

export function getTalentConfirmationTemplate(data: {
  name: string;
  email: string;
  referenceCode?: string;
  _id?: string;
}) {
  const reference = data.referenceCode || (data._id ? `BX-TLT-${data._id.toString().slice(-6).toUpperCase()}` : 'N/A');
  const subject = `Application Received: ${reference} - Braxvio Careers`;

  const text = `
Dear ${data.name},

Thank you for your interest in joining the Braxvio ecosystem. We have safely received your application.

Reference: ${reference}

Our engineering and talent team reviews all incoming profiles. If there is an active match for your background, we will reach out directly.

Warm regards,
Braxvio Talent Team
https://www.braxvio.com
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="font-family: sans-serif; background: #0b0f19; color: #334155; padding: 24px;">
  <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 32px; border: 1px solid #e2e8f0;">
    <h2 style="color: #0f172a; margin-top: 0;">BRAXVIO CAREERS</h2>
    <p>Dear ${escapeHtml(data.name)},</p>
    <p>Thank you for submitting your application to Braxvio. Your profile has been filed under reference <strong style="color: #0284c7;">${escapeHtml(reference)}</strong>.</p>
    <p>Our team evaluates engineering and product applications on a rolling basis.</p>
    <p style="margin-bottom: 0;">Warm regards,<br><strong>Braxvio Talent Operations</strong></p>
  </div>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

/* ==========================================================================
   4. CONTACT & INQUIRIES
   ========================================================================== */

export function getContactInternalTemplate(data: {
  name: string;
  email: string;
  category?: string;
  organization?: string;
  subject: string;
  message: string;
  referenceCode?: string;
  _id?: string;
}) {
  const reference = data.referenceCode || (data._id ? `BX-CNT-${data._id.toString().slice(-6).toUpperCase()}` : 'N/A');
  const emailSubject = `[Inquiry: ${data.category || 'General'}] ${data.subject} - ${reference}`;

  const text = `
NEW CONTACT INQUIRY RECEIVED
=============================
Reference: ${reference}
Category: ${data.category || 'General'}
Sender: ${data.name}
Email: ${data.email}
Organization: ${data.organization || 'Not provided'}
Subject: ${data.subject}

Message:
${data.message}
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(emailSubject)}</title></head>
<body style="font-family: sans-serif; background: #0c0f17; color: #e2e8f0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #131826; border: 1px solid #243048; border-radius: 12px; padding: 32px;">
    <h2 style="color: #38bdf8; margin-top: 0;">Contact Inquiry: ${escapeHtml(reference)}</h2>
    <p><strong>Category:</strong> ${escapeHtml(data.category || 'General')}</p>
    <p><strong>Sender:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}" style="color: #38bdf8;">${escapeHtml(data.email)}</a></p>
    <p><strong>Organization:</strong> ${escapeHtml(data.organization || 'None')}</p>
    <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
    <div style="background: #0a0d14; border: 1px solid #1e293b; padding: 16px; border-radius: 8px; margin-top: 16px; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
  </div>
</body>
</html>
  `.trim();

  return { subject: emailSubject, text, html };
}

export function getContactConfirmationTemplate(data: {
  name: string;
  email: string;
  subject: string;
  referenceCode?: string;
  _id?: string;
}) {
  const reference = data.referenceCode || (data._id ? `BX-CNT-${data._id.toString().slice(-6).toUpperCase()}` : 'N/A');
  const emailSubject = `Inquiry Received: ${reference} - Braxvio Support`;

  const text = `
Dear ${data.name},

Thank you for reaching out to Braxvio. We have successfully logged your inquiry regarding "${data.subject}".

Reference ID: ${reference}

A member of our team will review your message and reply directly to this email within 1 to 2 business days.

Warm regards,
Braxvio Communications Team
https://www.braxvio.com
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(emailSubject)}</title></head>
<body style="font-family: sans-serif; background: #0b0f19; color: #334155; padding: 24px;">
  <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 32px; border: 1px solid #e2e8f0;">
    <h2 style="color: #0f172a; margin-top: 0;">BRAXVIO COMMUNICATIONS</h2>
    <p>Dear ${escapeHtml(data.name)},</p>
    <p>We have received your message regarding <strong>${escapeHtml(data.subject)}</strong>. Your inquiry reference is <strong style="color: #0284c7;">${escapeHtml(reference)}</strong>.</p>
    <p>Our communications team is reviewing your note and will follow up within 1–2 business days.</p>
    <p style="margin-bottom: 0;">Warm regards,<br><strong>Braxvio Team</strong></p>
  </div>
</body>
</html>
  `.trim();

  return { subject: emailSubject, text, html };
}
