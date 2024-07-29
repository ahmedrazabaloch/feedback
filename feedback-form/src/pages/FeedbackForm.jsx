// src/pages/FeedbackForm.jsx
import React, { useState } from "react";
import axios from "axios";

const FeedbackForm = () => {
  const [studentName, setStudentName] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [trainingTitle, setTrainingTitle] = useState("");
  const [feedback, setFeedback] = useState("");
  const [ratings, setRatings] = useState({
    objectives: "",
    participation: "",
    relevance: "",
    organization: "",
    materials: "",
    usefulness: "",
    preparation: "",
    objectivesMet: "",
    completion: "",
    sufficiency: "",
  });

  const handleChange = (e) => {
    setRatings({ ...ratings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = {
      studentName,
      trainerName,
      trainingTitle,
      feedback,
      ratings,
    };
    await axios.post("/api/feedback", feedbackData);
    alert("Feedback submitted successfully");
  };

  const ratingOptions = [
    "Strongly Agree",
    "Agree",
    "Neutral",
    "Disagree",
    "Strongly Disagree",
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-screen-sm"
      >
        <h2 className="text-2xl mb-4">Feedback Form</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Student Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Trainer Name</label>
          <input
            type="text"
            value={trainerName}
            onChange={(e) => setTrainerName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Training Title</label>
          <input
            type="text"
            value={trainingTitle}
            onChange={(e) => setTrainingTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {Object.keys(ratings).map((key) => (
          <div className="mb-4" key={key}>
            <label className="block text-sm font-bold mb-2">{key}</label>
            <div className="flex flex-wrap">
              {ratingOptions.map((option) => (
                <label
                  key={option}
                  className="mr-4 mb-2 flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    name={key}
                    value={option}
                    checked={ratings[key] === option}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
