const express = require('express');
const { submitTalentApplication } = require('../controllers/talentController');

const router = express.Router();

/** @route POST /api/careers/apply */
router.post('/api/careers/apply', submitTalentApplication);
router.post('/apply', submitTalentApplication);

module.exports = router;
