import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
  });

  // GET DASHBOARD STATS
  const getDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      const totalUsers = data.users.length;

      const activeUsers = data.users.filter(
        (user) => !user.isBlocked
      ).length;

      setStats({
        totalUsers,
        activeUsers,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardStats();
  }, []);

  return (
    <AdminLayout>
      {/* MAIN CONTAINER */}
      <div className="w-full min-h-screen bg-gray-100 pl-6">

        {/* HEADER */}
        <div className="w-full bg-white shadow-md rounded-2xl px-8 py-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Expense Tracker Admin Panel
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">

          {/* TOTAL USERS */}
          <div className="w-full h-42.5 bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-lg">
                Total Users
              </h3>
              <h1 className="text-5xl font-bold mt-4 text-black">
                {stats.totalUsers}
              </h1>
            </div>

            <div className="w-22.5 h-22.5 bg-blue-100 rounded-full flex items-center justify-center text-4xl">
              👥
            </div>
          </div>

          {/* ACTIVE USERS */}
          <div className="w-full h-42.5 bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-lg">
                Active Users
              </h3>
              <h1 className="text-5xl font-bold mt-4 text-green-600">
                {stats.activeUsers}
              </h1>
            </div>

            <div className="w-22.5 h-22.5 bg-green-100 rounded-full flex items-center justify-center text-4xl">
              ✅
            </div>
          </div>

        </div>

        {/* WELCOME SECTION */}
        <div className="w-full min-h-55 mt-8 bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-5">
            Welcome Admin 👋
          </h2>

          <p className="text-gray-600 text-lg leading-8 max-w-250">
            This is your Expense Tracker admin dashboard.
            Here you can manage users, transactions,
            reports, analytics, and system settings.
          </p>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;