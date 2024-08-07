import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import SweetAlert from "../components/SweetAlert.js";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { fullName, rollNo, email, password };
    try {
      await register(userData);
      SweetAlert({
        message: `Registration successful! Welcome ${fullName}`,
        icon: "success",
      });
      navigate("/feedback");
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          SweetAlert({ message: "User already exists", icon: "error" });
        } else {
          SweetAlert({
            message: "An error occurred. Please try again.",
            icon: "error",
          });
        }
      } else {
        SweetAlert({
          message: "An error occurred. Please try again.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow lg:w-1/3 md:w-1/3 sm:w-4/5 w-4/5 text-blue-500"
      >
        <h2 className="text-2xl mb-6 text-center font-bold">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 text-black rounded border border-blue-600 outline-none focus:border-green-500 hover:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Roll No</label>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="w-full px-3 py-2 text-black rounded border border-blue-600 outline-none focus:border-green-500 hover:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className="w-full px-3 py-2 text-black rounded border border-blue-600 outline-none focus:border-green-500 hover:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-black rounded border border-blue-600 outline-none focus:border-green-500 hover:border-green-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Sign Up
        </button>
        <div className="mt-4 text-center flex gap-3 justify-center">
          <p className="cursor-default">Already have an account?</p>
          <Link to="/" className="text-blue-500 font-bold">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
