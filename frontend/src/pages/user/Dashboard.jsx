import React, { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });

  // GET SUMMARY
  const getSummary = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/report/summary", {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <UserLayout>
    <div className="w-full min-h-screen bg-gray-100 p-6">
      {/* TITLE */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>

        <p className="text-gray-500 mt-2">Welcome Back 👋</p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* BALANCE */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-500 text-lg">Total Balance</h3>

          <h1 className="text-4xl font-bold mt-4 text-blue-600">
            ₹ {summary.balance}
          </h1>
        </div>

        {/* INCOME */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-500 text-lg">Total Income</h3>

          <h1 className="text-4xl font-bold mt-4 text-green-600">
            ₹ {summary.totalIncome}
          </h1>
        </div>

        {/* EXPENSE */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-500 text-lg">Total Expense</h3>

          <h1 className="text-4xl font-bold mt-4 text-red-600">
            ₹ {summary.totalExpense}
          </h1>
        </div>
      </div>
    </div>
    </UserLayout>
  );
};

export default Dashboard;
