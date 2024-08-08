import React, { useState, useEffect } from "react";
import axios from "axios";
import SweetAlert from "../components/SweetAlert.js";

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
      try {
        const token = JSON.parse(localStorage.getItem("user")).token;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          "http://localhost:5000/api/feedback",
          config
        );
        setFeedbacks(data);
        setFilteredFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
        SweetAlert({
          message: "Error fetching feedback data. Please try again",
          icon: "error",
        });
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
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
  }, [filters, feedbacks]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
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
      <div>
        {filteredFeedbacks.map((feedback) => (
          <div key={feedback._id} className="mb-4">
            <div>
              <strong>Student Name:</strong> {feedback.studentName}
            </div>
            <div>
              <strong>Roll No:</strong> {feedback.rollNo}
            </div>
            <div>
              <strong>Trainer Name:</strong> {feedback.trainerName}
            </div>
            <div>
              <strong>Course Title:</strong> {feedback.CourseTitle}
            </div>
            <div>
              <strong>Feedback:</strong> {feedback.feedback}
            </div>
            <div>
              <strong>Ratings:</strong>
              <ul>
                {Object.entries(feedback.ratings).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/*       
      <table className="w-full border-collapse text-center">
        <thead>
          <tr>
            <th className="border px-4 py-2">Student Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td>
                <table className="w-full mb-4">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 w-52">Student Name</th>
                      <th className="border px-4 py-2 w-52">Roll No</th>
                      <th className="border px-4 py-2 w-52">Trainer Name</th>
                      <th className="border px-4 py-2 w-52">Course Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">
                        {feedback.studentName}
                      </td>
                      <td className="border px-4 py-2">{feedback.rollNo}</td>
                      <td className="border px-4 py-2">
                        {feedback.trainerName}
                      </td>
                      <td className="border px-4 py-2">
                        {feedback.CourseTitle}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="w-full mb-4">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">{feedback.feedback}</td>
                    </tr>
                  </tbody>
                </table>

                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Ratings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">
                        {Object.entries(feedback.ratings).map(
                          ([key, value]) => (
                            <div key={key} className="mb-2">
                              <strong>{key}:</strong> {value}
                            </div>
                          )
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default AdminDashboard;
