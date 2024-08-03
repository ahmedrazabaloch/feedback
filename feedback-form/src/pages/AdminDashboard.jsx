import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [filters, setFilters] = useState({
    campus: "",
    trainer: "",
    batch: "",
    feedback: "",
  });

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const { data } = await axios.get("/api/feedback");
      setFeedbacks(data);
      setFilteredFeedbacks(data);
    };

    fetchFeedbacks();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    const filtered = feedbacks.filter((feedback) => {
      return (
        (filters.campus === "" || feedback.campus === filters.campus) &&
        (filters.trainer === "" || feedback.trainerName === filters.trainer) &&
        (filters.batch === "" || feedback.batch === filters.batch) &&
        (filters.feedback === "" ||
          feedback.feedback.includes(filters.feedback))
      );
    });

    setFilteredFeedbacks(filtered);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <div className="mb-4">
        <input
          type="text"
          name="campus"
          placeholder="Filter by campus"
          value={filters.campus}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded mr-2"
        />
        <input
          type="text"
          name="trainer"
          placeholder="Filter by trainer"
          value={filters.trainer}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded mr-2"
        />
        <input
          type="text"
          name="batch"
          placeholder="Filter by batch"
          value={filters.batch}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded mr-2"
        />
        <input
          type="text"
          name="feedback"
          placeholder="Filter by feedback"
          value={filters.feedback}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded"
        />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Trainer Name</th>
            <th className="border px-4 py-2">Training Title</th>
            <th className="border px-4 py-2">Feedback</th>
            <th className="border px-4 py-2">Ratings</th>
            <th className="border px-4 py-2">Campus</th>
            <th className="border px-4 py-2">Batch</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td className="border px-4 py-2">{feedback.studentName}</td>
              <td className="border px-4 py-2">{feedback.trainerName}</td>
              <td className="border px-4 py-2">{feedback.trainingTitle}</td>
              <td className="border px-4 py-2">{feedback.feedback}</td>
              <td className="border px-4 py-2">
                {Object.keys(feedback.ratings).map((key) => (
                  <div key={key}>
                    <strong>{key}:</strong> {feedback.ratings[key]}
                  </div>
                ))}
              </td>
              <td className="border px-4 py-2">{feedback.campus}</td>
              <td className="border px-4 py-2">{feedback.batch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

