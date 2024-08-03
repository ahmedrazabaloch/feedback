// controllers/feedbackController.js
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

// const Feedback = require('../models/Feedback');

// const submitFeedback = async (req, res) => {
//   const { feedback } = req.body;
//   const newFeedback = new Feedback({ feedback, user: req.user._id });
//   await newFeedback.save();
//   res.status(201).json(newFeedback);
// };

// const getFeedback = async (req, res) => {
//   const feedbacks = await Feedback.find({}).populate('user', 'name rollNo');
//   res.json(feedbacks);
// };

// module.exports = { submitFeedback, getFeedback };
