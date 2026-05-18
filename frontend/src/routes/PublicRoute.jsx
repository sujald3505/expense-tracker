import React from "react";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;