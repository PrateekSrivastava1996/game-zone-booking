import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const auth = localStorage.getItem("userData");
  return auth ? <Navigate to="/dashboard" /> : children;
};

export default ProtectedRoutes;
