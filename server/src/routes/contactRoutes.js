const express = require('express');
const { submitContactInquiry } = require('../controllers/contactController');

const router = express.Router();

/**
 * @route   POST /api/contact
 * @desc    Submit general or categorized contact inquiry
 * @access  Public
 */
router.post('/api/contact', submitContactInquiry);
router.post('/', submitContactInquiry);

module.exports = router;
