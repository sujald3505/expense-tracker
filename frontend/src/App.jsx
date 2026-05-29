
import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Register from "./pages/Register";
import Login from "./pages/Login";

import MainLayout from "./layouts/MainLayout";

import ProtectedRoute from "./routes/ProtectedRoute";

import PublicRoute from "./routes/PublicRoute";

// ADMIN
import Users from "./pages/admin/User";

import AdminDashboard from "./pages/admin/AdminDashboard";

import Transactions from "./pages/admin/Transaction";

import Categories from "./pages/admin/Categories";

import Reports from "./pages/admin/Reports";

import Setting from "./pages/admin/Setting";

// USER
import Dashboard from "./pages/user/Dashboard";

import AddTransaction from "./pages/user/AddTransaction";

import UserTransaction from "./pages/user/UserTransactions";

import UserReport from "./pages/user/UserReports";

import Profile from "./pages/user/Profile";

import Settings from "./pages/user/Settings";
import AdminRoute from "./routes/AdminRoute";
import Budget from "./pages/user/Budget";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* PUBLIC ROUTES */}
          <Route element={<PublicRoute />}>
            {/* DEFAULT REGISTER */}
            <Route path="/" element={<Register />} />

            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />
          </Route>

          {/* ADMIN */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            <Route path="/admin/user" element={<Users />} />

            <Route path="/transaction" element={<Transactions />} />

            <Route path="/category" element={<Categories />} />

            <Route path="/reports" element={<Reports />} />

            <Route path="/setting" element={<Setting />} />
          </Route>

          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>
            {/* USER */}
            <Route path="/user/dashboard" element={<Dashboard />} />

            <Route path="/user/addtransaction" element={<AddTransaction />} />

            <Route path="/user/transaction" element={<UserTransaction />} />

            <Route path="/user/report" element={<UserReport />} />

            <Route path="/user/budget" element={<Budget />}/>

            <Route path="/user/profile" element={<Profile />} />

            <Route path="/user/setting" element={<Settings />} />
          </Route>

          {/* NOT FOUND */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
