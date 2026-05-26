// import React, { useEffect, useState } from "react";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";

// import UserLayout from "../../layouts/UserLayout";

// const Reports = () => {
//   // ============================
//   // STATES
//   // ============================

//   const [summary, setSummary] = useState({
//     totalIncome: 0,
//     totalExpense: 0,
//     balance: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   // ============================
//   // GET REPORTS
//   // ============================

//   const getReports = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch("http://localhost:8080/api/report/summary", {
//         method: "GET",

//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       setSummary({
//         totalIncome: data.totalIncome || 0,

//         totalExpense: data.totalExpense || 0,

//         balance: data.balance || 0,
//       });
//     } catch (error) {
//       console.log("Report Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================
//   // USE EFFECT
//   // ============================

//   useEffect(() => {
//     getReports();
//   }, []);

//   // ============================
//   // PIE DATA
//   // ============================

//   const pieData = [
//     {
//       name: "Income",

//       value: summary.totalIncome,
//     },

//     {
//       name: "Expense",

//       value: summary.totalExpense,
//     },
//   ];

//   // ============================
//   // BAR DATA
//   // ============================

//   const barData = [
//     {
//       name: "Income",

//       amount: summary.totalIncome,
//     },

//     {
//       name: "Expense",

//       amount: summary.totalExpense,
//     },

//     {
//       name: "Balance",

//       amount: summary.balance,
//     },
//   ];

//   // ============================
//   // COLORS
//   // ============================

//   const COLORS = ["#22c55e", "#ef4444"];

//   // ============================
//   // LOADING
//   // ============================

//   if (loading) {
//     return (
//       <UserLayout>
//         <div className="flex justify-center items-center h-screen text-2xl font-bold">
//           Loading Reports...
//         </div>
//       </UserLayout>
//     );
//   }

//   return (
//     <UserLayout>
//       <div className="w-full min-h-screen bg-gray-100 p-6">
//         {/* HEADER */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-800">Reports</h1>

//           <p className="text-gray-500 mt-2">Financial analytics overview</p>
//         </div>

//         {/* SUMMARY CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {/* BALANCE */}
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-gray-500 text-lg">Total Balance</h3>

//             <h1 className="text-4xl font-bold mt-4 text-blue-600">
//               ₹ {summary.balance}
//             </h1>
//           </div>

//           {/* INCOME */}
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-gray-500 text-lg">Total Income</h3>

//             <h1 className="text-4xl font-bold mt-4 text-green-600">
//               ₹ {summary.totalIncome}
//             </h1>
//           </div>

//           {/* EXPENSE */}
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-gray-500 text-lg">Total Expense</h3>

//             <h1 className="text-4xl font-bold mt-4 text-red-600">
//               ₹ {summary.totalExpense}
//             </h1>
//           </div>
//         </div>

//         {/* CHARTS */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* PIE CHART */}
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h2 className="text-2xl font-semibold mb-6">Income vs Expense</h2>

//             <div className="w-full h-[400px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={pieData}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={120}
//                     dataKey="value"
//                     label
//                   >
//                     {pieData.map((entry, index) => (
//                       <Cell key={index} fill={COLORS[index]} />
//                     ))}
//                   </Pie>

//                   <Tooltip />

//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* BAR CHART */}
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h2 className="text-2xl font-semibold mb-6">Financial Overview</h2>

//             <div className="w-full h-[400px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={barData}>
//                   <CartesianGrid strokeDasharray="3 3" />

//                   <XAxis dataKey="name" />

//                   <YAxis />

//                   <Tooltip />

//                   <Legend />

//                   <Bar
//                     dataKey="amount"
//                     fill="#3b82f6"
//                     radius={[10, 10, 0, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </UserLayout>
//   );
// };

// export default Reports;











import React, { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import UserLayout from "../../layouts/UserLayout";

const Reports = () => {
  // ============================
  // STATES
  // ============================

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [categoryData, setCategoryData] = useState([]);

  const [loading, setLoading] = useState(true);

  // ============================
  // GET REPORTS
  // ============================

  const getReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/report/summary",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      setSummary({
        totalIncome: data.totalIncome || 0,

        totalExpense: data.totalExpense || 0,

        balance: data.balance || 0,
      });

      // CATEGORY DATA
      setCategoryData(data.categoryData || []);
    } catch (error) {
      console.log("Report Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // USE EFFECT
  // ============================

  useEffect(() => {
    getReports();
  }, []);

  // ============================
  // BAR DATA
  // ============================

  const barData = [
    {
      name: "Income",

      amount: summary.totalIncome,
    },

    {
      name: "Expense",

      amount: summary.totalExpense,
    },

    {
      name: "Balance",

      amount: summary.balance,
    },
  ];

  // ============================
  // CATEGORY COLORS
  // ============================

  const CATEGORY_COLORS = [
    "#3b82f6",
    "#22c55e",
    "#ef4444",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
  ];

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <UserLayout>
        <div className="flex justify-center items-center h-screen text-2xl font-bold">
          Loading Reports...
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="w-full min-h-screen bg-gray-100 p-6">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Reports</h1>

          <p className="text-gray-500 mt-2">
            Financial analytics overview
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CATEGORY PIE CHART */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">
              Category Wise Expenses
            </h2>

            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="amount"
                    nameKey="category"
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          CATEGORY_COLORS[
                            index % CATEGORY_COLORS.length
                          ]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip />

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* BAR CHART */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">
              Financial Overview
            </h2>

            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="amount"
                    fill="#3b82f6"
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Reports;