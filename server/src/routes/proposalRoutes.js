const express = require('express');
const router = express.Router();
const { submitProposal, getProposalStatus } = require('../controllers/proposalController');

/**
 * @route   POST /api/partners/propose (and /propose if mounted under /api/partners)
 * @desc    Submit partnership proposal form
 * @access  Public
 */
router.post('/propose', submitProposal);
router.post('/api/partners/propose', submitProposal);

/**
 * @route   GET /api/partners/propose/:id
 * @desc    Get status of proposal
 * @access  Public
 */
router.get('/propose/:id', getProposalStatus);
router.get('/api/partners/propose/:id', getProposalStatus);

module.exports = router;
