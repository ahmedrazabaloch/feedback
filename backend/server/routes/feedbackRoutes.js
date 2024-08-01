const express = require("express");
const {
  submitFeedback,
  getFeedback,
} = require("../controllers/feedbackController");
const router = express.Router();

router.post("/", submitFeedback);
router.get("/", getFeedback);

module.exports = router;
