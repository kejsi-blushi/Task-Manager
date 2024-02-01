
import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ Component }) => {
  const { currentUser } = useAuth();

  return currentUser.role === "manager" ? (
    <Component />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

export default PrivateRoute;
