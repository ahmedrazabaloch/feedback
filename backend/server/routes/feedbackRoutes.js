// const express = require("express");
// const router = express.Router();
// const { submitFeedback, getFeedback } = require("../controllers/feedbackController");
// const { protect, admin } = require("../middleware/authMiddleware"); 

// // Route to submit feedback (accessible by authenticated users)
// router.post("/", protect, submitFeedback);

// // Route to get feedback (accessible by admins)
// router.get("/", protect, admin, getFeedback);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { submitFeedback, getFeedback } = require('../controllers/feedbackController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, submitFeedback);
router.get('/', protect, admin, getFeedback);

module.exports = router;
