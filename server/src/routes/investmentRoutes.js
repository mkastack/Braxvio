const express = require('express');
const { submitInvestmentInterest } = require('../controllers/investmentController');

const router = express.Router();

/**
 * @route   POST /api/partners/invest
 */
router.post('/api/partners/invest', submitInvestmentInterest);

module.exports = router;
