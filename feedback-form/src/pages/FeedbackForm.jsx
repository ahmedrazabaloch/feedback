// src/pages/FeedbackForm.js
import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [studentName, setStudentName] = useState('');
  const [trainerName, setTrainerName] = useState('');
  const [trainingTitle, setTrainingTitle] = useState('');
  const [feedback, setFeedback] = useState('');
  const [ratings, setRatings] = useState({
    objectives: '',
    participation: '',
    relevance: '',
    organization: '',
    materials: '',
    usefulness: '',
    preparation: '',
    objectivesMet: '',
    completion: '',
    sufficiency: ''
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
      ratings
    };
    await axios.post('/api/feedback', feedbackData);
    alert('Feedback submitted successfully');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Feedback Form</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Student Name</label>
          <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Trainer Name</label>
          <input type="text" value={trainerName} onChange={(e) => setTrainerName(e.target.value)} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Training Title</label>
          <input type="text" value={trainingTitle} onChange={(e) => setTrainingTitle(e.target.value)} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Feedback</label>
          <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="w-full px-3 py-2 border rounded" required />
        </div>
        {Object.keys(ratings).map((key) => (
          <div className="mb-4" key={key}>
            <label className="block text-sm font-bold mb-2">{key}</label>
            <select name={key} value={ratings[key]} onChange={handleChange} className="w-full px-3 py-2 border rounded" required>
              <option value="">Select</option>
              <option value="Strongly Agree">Strongly Agree</option>
              <option value="Agree">Agree</option>
              <option value="Neutral">Neutral</option>
              <option value="Disagree">Disagree</option>
              <option value="Strongly Disagree">Strongly Disagree</option>
            </select>
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
