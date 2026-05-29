import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user")) || {};

  // USER LOGIN CHE
  if (token) {
    // ADMIN
    if (user?.role === "ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    // NORMAL USER
    return <Navigate to="/user/dashboard" replace />;
  }

  // LOGIN NATHI
  return <Outlet />;
};

export default PublicRoute;
