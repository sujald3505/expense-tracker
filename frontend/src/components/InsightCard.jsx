import React, { useEffect, useState } from "react";

const InsightCard = () => {
  const [insights, setInsights] = useState([]);

  // ============================
  // GET INSIGHTS
  // ============================

  const getInsights = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/transaction/insights",

        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      setInsights(data.insights || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // USE EFFECT
  // ============================

  useEffect(() => {
    getInsights();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* TITLE */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
          🤖
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            AI Expense Insights
          </h2>

          <p className="text-gray-500 text-sm">Smart financial analysis</p>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="space-y-4">
        {insights.length > 0 ? (
          insights.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl p-4 text-gray-700 font-medium"
            >
              ✅ {item}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No insights available</p>
        )}
      </div>
    </div>
  );
};

export default InsightCard;
