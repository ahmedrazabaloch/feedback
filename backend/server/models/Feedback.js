// models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  trainerName: { type: String, required: true },
  trainingTitle: { type: String, required: true },
  feedback: String,
  ratings: {
    objectives: String,
    participation: String,
    relevance: String,
    organization: String,
    materials: String,
    usefulness: String,
    preparation: String,
    objectivesMet: String,
    completion: String,
    sufficiency: String
  },
  campus: String,
  batch: String
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
