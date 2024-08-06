const Feedback = require("../models/Feedback");
const asyncHandler = require("express-async-handler");

const submitFeedback = asyncHandler(async (req, res) => {
  console.log("Received feedback data:", req.body);
  const feedback = new Feedback(req.body);
  const createdFeedback = await feedback.save();
  res.status(201).json(createdFeedback);
});

const getFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.find({});
  res.json(feedback);
});

module.exports = { submitFeedback, getFeedback };
