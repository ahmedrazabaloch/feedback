const express = require("express");
const router = express.Router();
const { submitFeedback, getFeedback } = require("../controllers/feedbackController");
const { protect, admin } = require("../middleware/authMiddleware"); // Adjust the path to your middleware

// Route to submit feedback (accessible by authenticated users)
router.post("/", protect, submitFeedback);

// Route to get feedback (accessible by admins)
router.get("/", protect, admin, getFeedback);

module.exports = router;
