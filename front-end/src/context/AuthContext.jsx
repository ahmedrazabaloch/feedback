import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import SweetAlert from "../components/SweetAlert.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData, isAdmin) => {
    console.log("userData-->", userData);
    try {
      const endpoint = isAdmin
        ? "http://localhost:5000/api/users/login/admin"
        : "http://localhost:5000/api/users/login/user";
      const { data } = await axios.post(endpoint, userData);
      console.log("data-->", data);
      SweetAlert({ message: "Login successful!", icon: "success" });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          SweetAlert({ message: "Invalid email or password", icon: "error" });
        } else {
          SweetAlert({ message: "Invalid email or password.", icon: "error" });
        }
      } else {
        SweetAlert({
          message: "An error occurred. Please try again.",
          icon: "error",
        });
      }
    }
  };

  const register = async (userData) => {
    const { data } = await axios.post(
      "http://localhost:5000/api/users/register",
      userData
    );
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
