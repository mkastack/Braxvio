require('dotenv').config();
const { getUserConfirmationTemplate } = require('../src/templates/emailTemplates');

const mockProposal = {
  _id: 'testid123',
  fullName: 'Test User',
  email: 'test@braxvio.com',
  companyName: 'Test Company',
  proposalDetails: 'Test proposal details.',
  referenceCode: 'BX-PRP-2026-TESTID',
};

const t = getUserConfirmationTemplate(mockProposal);
const hasBadge = t.html.includes('status-badge') || t.html.includes('ecfdf5') || t.html.includes('Proposal Received');

console.log('Badge found in email HTML:', hasBadge);
if (!hasBadge) {
  console.log('CONFIRMED: No badge in confirmation email template.');
} else {
  // Print surrounding context of any match
  ['status-badge', 'ecfdf5', 'Proposal Received'].forEach((term) => {
    const idx = t.html.indexOf(term);
    if (idx !== -1) {
      console.log('Found:', term, '->', t.html.slice(Math.max(0, idx - 40), idx + 80));
    }
  });
}
