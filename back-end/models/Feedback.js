const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  studentName: { type: String, required: true },
  rollNo: { type: String, required: true },
  trainerName: { type: String, required: true },
  CourseTitle: { type: String, required: true },
  feedback: { type: String, required: true },
  ratings: {
    Objectives: { type: String, required: true },
    Participation: { type: String, required: true },
    Relevance: { type: String, required: true },
    Organization: { type: String, required: true },
    Materials: { type: String, required: true },
    Usefulness: { type: String, required: true },
    Preparation: { type: String, required: true },
    ObjectivesMet: { type: String, required: true },
    Completion: { type: String, required: true },
    Sufficiency: { type: String, required: true },
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
