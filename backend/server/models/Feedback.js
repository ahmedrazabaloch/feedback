const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  studentName: { type: String, required: true },
  rollNo: { type: String, required: true },
  trainerName: { type: String, required: true },
  CourseTitle: { type: String, required: true }, 
  feedback: { type: String, required: true },
  ratings: {
    Objectives: { type: String },
    Participation: { type: String },
    Relevance: { type: String },
    Organization: { type: String },
    Materials: { type: String },
    Usefulness: { type: String },
    Preparation: { type: String },
    ObjectivesMet: { type: String },
    Completion: { type: String },
    Sufficiency: { type: String },
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
