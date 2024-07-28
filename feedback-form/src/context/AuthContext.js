// src/context/AuthContext.js
import React, { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const { data } = await axios.post("/api/users/login", { email, password });
    setUser(data);
  };

  const register = async (name, email, password) => {
    const { data } = await axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    setUser(data);
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
