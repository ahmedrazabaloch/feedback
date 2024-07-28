// routes/feedbackRoutes.js
const express = require('express');
const { submitFeedback, getFeedback } = require('../controllers/feedbackController');
const router = express.Router();

router.post('/', submitFeedback);
router.get('/', getFeedback);  // Admin only

module.exports = router;
