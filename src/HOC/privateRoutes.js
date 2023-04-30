import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const auth = localStorage.getItem("userData");
  return auth ? children : <Navigate to="/" />;
};
export default PrivateRoutes;
