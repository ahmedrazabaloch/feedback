const express = require("express");
const router = express.Router();
const {
  submitFeedback,
  getFeedback,
} = require("../controllers/feedbackController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, submitFeedback);

// router.get("/", protect, admin, getFeedback);
router.get("/",  getFeedback);

module.exports = router;
