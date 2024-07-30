import React, { useState } from "react";
import axios from "axios";

const FeedbackForm = () => {
  const [studentName, setStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [CourseTitle, setCourseTitle] = useState("");
  const [feedback, setFeedback] = useState("");
  const [ratings, setRatings] = useState({
    Objectives: "",
    Participation: "",
    Relevance: "",
    Organization: "",
    Materials: "",
    Usefulness: "",
    Preparation: "",
    ObjectivesMet: "",
    Completion: "",
    Sufficiency: "",
  });

  const handleChange = (e) => {
    setRatings({ ...ratings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = {
      studentName,
      rollNo,
      trainerName,
      CourseTitle,
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

  const courseOptions = [
    "Web & Mobile Development",
    "Graphic Designing",
    "Python Programming",
    "CCNA",
    "IT Essentials",
    "Textile Training",
    "Bike Repairing",
    "Mobile Repairing",
    "Video Editing",
    "Freelancing",
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 text-blue-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded shadow-md w-full max-w-screen-sm"
      >
        <h2 className="text-2xl mb-8 text-black font-bold text-center">
          Feedback Form
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Student Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full px-3 py-2 rounded border border-green-600 outline-none focus:border-blue-500 hover:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Roll No</label>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="w-full px-3 py-2 rounded border border-green-600 outline-none focus:border-blue-500 hover:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Trainer Name</label>
          <input
            type="text"
            value={trainerName}
            onChange={(e) => setTrainerName(e.target.value)}
            className="w-full px-3 py-2 rounded border border-green-600 outline-none focus:border-blue-500 hover:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Course</label>
          <select
            value={CourseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="w-full px-3 py-2 text-black rounded border border-green-600 outline-none focus:border-blue-500 hover:border-blue-500"
            required
          >
            <option value="">Select a course</option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        {Object.keys(ratings).map((key) => (
          <div className="mb-4" key={key}>
            <label className="block text-sm font-bold mb-2">{key}</label>
            <div className="flex flex-wrap">
              {ratingOptions.map((option) => (
                <label
                  key={option}
                  className="mr-4 mb-2 flex items-center space-x-2 text-black cursor-pointer"
                >
                  <input
                    type="radio"
                    name={key}
                    value={option}
                    checked={ratings[key] === option}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-500 checked:border-green-500 checked:bg-green-500"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-3 py-2 text-black rounded border border-green-600 outline-none focus:border-blue-500 hover:border-blue-500"
            required
          />
        </div>
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
