import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">Login</h2>
          <img
            src="path/to/smit-logo.png"
            alt="SMIT Logo"
            className="mx-auto mt-4"
          />
        </div>
        <form className="text-left">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">CNIC</label>
            <input
              type="text"
              placeholder="CNIC"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="******"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            login
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Not have account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Signup here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
