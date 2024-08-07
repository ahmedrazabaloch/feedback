import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  //getting admin data from the backend
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user")).token;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          "http://localhost:5000/api/admin",
          config
        );
        data.forEach((item) => {
          console.log(`Email: ${item.email}, isAdmin: ${item.isAdmin}`);
        });
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    await login(userData);
    navigate("/feedback");
    // navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow lg:w-1/3 md:w-1/3 sm:w-4/5 w-4/5 text-blue-500"
      >
        <h2 className="text-2xl mb-6 text-center font-bold">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className="w-full px-3 py-2 text-black rounded border border-green-600 outline-none focus:border-blue-500 hover:border-blue-500"
            placeholder="example@example.com"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*******"
            className="w-full px-3 py-2 text-black rounded border border-green-600 outline-none focus:border-blue-500 hover:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
        <div className="mt-4 text-center flex gap-3 justify-center">
          <p className="cursor-default">Don't have an account?</p>
          <Link to="/signup" className="text-blue-500 font-bold">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;