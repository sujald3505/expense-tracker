// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import AdminLayout from "../../layouts/AdminLayout";

// const Reports = () => {

//   const [summary, setSummary] =
//     useState({
//       totalIncome: 0,
//       totalExpense: 0,
//       balance: 0,
//     });

//   // GET SUMMARY REPORT
//   const getSummaryReport =
//     async () => {
//       try {

//         const token =
//           localStorage.getItem(
//             "token"
//           );

//         const response =
//           await fetch(
//             "http://localhost:8080/api/report/summary",
//             {
//               method: "GET",

//               headers: {
//                 Authorization:
//                   `Bearer ${token}`,
//               },
//             }
//           );

//         const data =
//           await response.json();

//         setSummary(data);

//       } catch (error) {

//         console.log(error);
//       }
//     };

//   useEffect(() => {
//     getSummaryReport();
//   }, []);

//   // PIE CHART DATA
//   const chartData = [
//     {
//       name: "Income",
//       value:
//         summary.totalIncome,
//     },
//     {
//       name: "Expense",
//       value:
//         summary.totalExpense,
//     },
//   ];

//   const COLORS = [
//     "#22c55e",
//     "#ef4444",
//   ];

//   return (
//     <AdminLayout>
//     <div className="w-full min-h-screen bg-gray-100 p-6">

//       {/* PAGE TITLE */}
//       <div className="mb-8">

//         <h1 className="text-4xl font-bold text-gray-800">
//           Reports & Analytics
//         </h1>

//         <p className="text-gray-500 mt-2">
//           Financial insights and reports
//         </p>

//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

//         {/* BALANCE */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">

//           <h3 className="text-gray-500 text-lg">
//             Total Balance
//           </h3>

//           <h1 className="text-4xl font-bold mt-4 text-blue-600">
//             ₹ {summary.balance}
//           </h1>

//         </div>

//         {/* INCOME */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">

//           <h3 className="text-gray-500 text-lg">
//             Total Income
//           </h3>

//           <h1 className="text-4xl font-bold mt-4 text-green-600">
//             ₹ {summary.totalIncome}
//           </h1>

//         </div>

//         {/* EXPENSE */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">

//           <h3 className="text-gray-500 text-lg">
//             Total Expense
//           </h3>

//           <h1 className="text-4xl font-bold mt-4 text-red-600">
//             ₹ {summary.totalExpense}
//           </h1>

//         </div>

//       </div>

//       {/* CHART SECTION */}
//       <div className="bg-white rounded-2xl shadow-lg p-6 h-[500px]">

//         <h2 className="text-2xl font-semibold mb-6">
//           Income vs Expense
//         </h2>

//         <ResponsiveContainer
//           width="100%"
//           height="100%"
//         >

//           <PieChart>

//             <Pie
//               data={chartData}
//               cx="50%"
//               cy="50%"
//               outerRadius={150}
//               dataKey="value"
//               label
//             >

//               {chartData.map(
//                 (entry, index) => (

//                   <Cell
//                     key={index}
//                     fill={
//                       COLORS[index]
//                     }
//                   />
//                 )
//               )}

//             </Pie>

//             <Tooltip />

//           </PieChart>

//         </ResponsiveContainer>

//       </div>

//     </div>
//     </AdminLayout>
//   );
// };

// export default Reports;
import React, {
  useEffect,
  useState,
} from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import AdminLayout from "../../layouts/AdminLayout";

const Reports = () => {

  const [summary, setSummary] =
    useState({
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
    });

  // GET SUMMARY REPORT
  const getSummaryReport =
    async () => {
      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            "http://localhost:8080/api/report/summary",
            {
              method: "GET",

              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        setSummary(data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    getSummaryReport();
  }, []);

  // CHART DATA
  const chartData = [
    {
      name: "Income",
      value:
        summary.totalIncome,
    },
    {
      name: "Expense",
      value:
        summary.totalExpense,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  return (
    <AdminLayout>

      {/* MAIN CONTAINER */}
      <div className="w-full min-h-screen">

        {/* PAGE HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Reports & Analytics
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Financial insights and reports
          </p>

        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">

          {/* BALANCE */}
          <div className="bg-white rounded-3xl shadow-md p-8 h-[180px] flex flex-col justify-center hover:shadow-xl transition duration-300">

            <p className="text-gray-500 text-lg font-medium">
              Total Balance
            </p>

            <h1 className="text-5xl font-bold text-blue-600 mt-4">
              ₹ {summary.balance}
            </h1>

          </div>

          {/* INCOME */}
          <div className="bg-white rounded-3xl shadow-md p-8 h-[180px] flex flex-col justify-center hover:shadow-xl transition duration-300">

            <p className="text-gray-500 text-lg font-medium">
              Total Income
            </p>

            <h1 className="text-5xl font-bold text-green-600 mt-4">
              ₹ {summary.totalIncome}
            </h1>

          </div>

          {/* EXPENSE */}
          <div className="bg-white rounded-3xl shadow-md p-8 h-[180px] flex flex-col justify-center hover:shadow-xl transition duration-300">

            <p className="text-gray-500 text-lg font-medium">
              Total Expense
            </p>

            <h1 className="text-5xl font-bold text-red-600 mt-4">
              ₹ {summary.totalExpense}
            </h1>

          </div>

        </div>

        {/* CHART SECTION */}
        <div className="bg-white rounded-3xl shadow-md p-8 mt-10 w-full min-h-[600px]">

          <div className="mb-8">

            <h2 className="text-3xl font-bold text-gray-800">
              Income vs Expense
            </h2>

            <p className="text-gray-500 mt-2">
              Visual representation of income and expenses
            </p>

          </div>

          {/* CHART */}
          <div className="w-full h-[450px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={170}
                  dataKey="value"
                  label
                >

                  {chartData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
};

export default Reports;