import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    console.log("userData auth context-->", userData);
    const { data } = await axios.post(
      "http://localhost:5000/api/users/login",
      userData
    );
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  // const login = async (email, password) => {
  //   try {
  //     const { data } = await axios.post(
  //       "http://localhost:5000/api/users/login",
  //       { email, password }
  //     );
  //     setUser(data);
  //     console.log("data-->", data);
  //     console.log("email, password-->", email, password);
  //     localStorage.setItem("user", JSON.stringify(data));
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //   }
  // };

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
