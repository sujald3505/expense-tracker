// import React, { useEffect, useState } from "react";

// import UserLayout from "../../layouts/UserLayout";

// const Transactions = () => {
//   const [transactions, setTransactions] = useState([]);

//   const [categories, setCategories] = useState([]);

//   // FILTER STATES
//   const [search, setSearch] = useState("");

//   const [type, setType] = useState("all");

//   const [category, setCategory] = useState("all");

//   // ============================
//   // GET TRANSACTIONS
//   // ============================

//   const getTransactions = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         `http://localhost:8080/api/transaction?search=${search}&type=${type}&category=${category}`,
//         {
//           method: "GET",

//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const data = await response.json();

//       setTransactions(data.transactions || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ============================
//   // GET CATEGORIES
//   // ============================

//   const getCategories = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/category");

//       const data = await response.json();

//       setCategories(data.categories || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ============================
//   // DELETE TRANSACTION
//   // ============================

//   const deleteTransaction = async (id) => {
//     try {
//       const token = localStorage.getItem("token");

//       await fetch(`http://localhost:8080/api/transaction/${id}`, {
//         method: "DELETE",

//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // REFRESH
//       getTransactions();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ============================
//   // DOWNLOAD PDF
//   // ============================

//   const downloadPDF = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         "http://localhost:8080/api/transaction/download/pdf",
//         {
//           method: "GET",

//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const blob = await response.blob();

//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");

//       link.href = url;

//       link.download = "transactions.pdf";

//       document.body.appendChild(link);

//       link.click();

//       link.remove();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ============================
//   // USE EFFECT
//   // ============================

//   useEffect(() => {
//     getTransactions();
//   }, [search, type, category]);

//   useEffect(() => {
//     getCategories();
//   }, []);

//   return (
//     <UserLayout>
//       <div className="w-full min-h-screen bg-gray-100 p-6">
//         {/* PAGE HEADER */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-800">Transactions</h1>

//             <p className="text-gray-500 mt-2">Manage your transactions</p>
//           </div>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={downloadPDF}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
//             >
//               Download PDF
//             </button>

//             <div className="bg-black text-white px-5 py-3 rounded-xl text-lg font-semibold">
//               Total : {transactions.length}
//             </div>
//           </div>
//         </div>

//         {/* FILTERS */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             {/* SEARCH */}
//             <input
//               type="text"
//               placeholder="Search Transaction..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full h-[55px] border rounded-xl px-4 outline-none"
//             />

//             {/* TYPE */}
//             <select
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               className="w-full h-[55px] border rounded-xl px-4 outline-none"
//             >
//               <option value="all">All Types</option>

//               <option value="income">Income</option>

//               <option value="expense">Expense</option>
//             </select>

//             {/* CATEGORY */}
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full h-[55px] border rounded-xl px-4 outline-none"
//             >
//               <option value="all">All Categories</option>

//               {categories.map((item) => (
//                 <option key={item._id} value={item.name}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               {/* TABLE HEADER */}
//               <thead className="bg-black text-white">
//                 <tr>
//                   <th className="text-left px-6 py-4">Title</th>

//                   <th className="text-left px-6 py-4">Amount</th>

//                   <th className="text-left px-6 py-4">Type</th>

//                   <th className="text-left px-6 py-4">Category</th>

//                   <th className="text-left px-6 py-4">Date</th>

//                   <th className="text-left px-6 py-4">Action</th>
//                 </tr>
//               </thead>

//               {/* TABLE BODY */}
//               <tbody>
//                 {transactions.length > 0 ? (
//                   transactions.map((transaction) => (
//                     <tr
//                       key={transaction._id}
//                       className="border-b hover:bg-gray-50 transition"
//                     >
//                       {/* TITLE */}
//                       <td className="px-6 py-4 font-medium text-gray-700">
//                         {transaction.title}
//                       </td>

//                       {/* AMOUNT */}
//                       <td className="px-6 py-4">
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm font-semibold
                            
//                             ${
//                               transaction.type === "income"
//                                 ? "bg-green-100 text-green-600"
//                                 : "bg-red-100 text-red-600"
//                             }`}
//                         >
//                           ₹ {transaction.amount}
//                         </span>
//                       </td>

//                       {/* TYPE */}
//                       <td className="px-6 py-4 capitalize">
//                         {transaction.type}
//                       </td>

//                       {/* CATEGORY */}
//                       <td className="px-6 py-4">{transaction.category}</td>

//                       {/* DATE */}
//                       <td className="px-6 py-4">
//                         {new Date(transaction.date).toLocaleDateString()}
//                       </td>

//                       {/* DELETE */}
//                       <td className="px-6 py-4">
//                         <button
//                           onClick={() => deleteTransaction(transaction._id)}
//                           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="text-center py-10 text-gray-500">
//                       No Transactions Found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </UserLayout>
//   );
// };

// export default Transactions;










import React, {
  useEffect,
  useState,
} from "react";

import UserLayout from "../../layouts/UserLayout";

const Transactions = () => {

  const [transactions, setTransactions] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  // FILTER STATES
  const [search, setSearch] =
    useState("");

  const [type, setType] =
    useState("all");

  const [category, setCategory] =
    useState("all");

  // NEW PERIOD FILTER
  const [period, setPeriod] =
    useState("all");

  // ============================
  // GET TRANSACTIONS
  // ============================

  const getTransactions =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(

            `http://localhost:8080/api/transaction?search=${search}&type=${type}&category=${category}&period=${period}`,

            {
              method: "GET",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        setTransactions(
          data.transactions || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  // ============================
  // GET CATEGORIES
  // ============================

  const getCategories =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:8080/api/category"
          );

        const data =
          await response.json();

        setCategories(
          data.categories || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  // ============================
  // DELETE TRANSACTION
  // ============================

  const deleteTransaction =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await fetch(

          `http://localhost:8080/api/transaction/${id}`,

          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        // REFRESH
        getTransactions();

      } catch (error) {

        console.log(error);
      }
    };

  // ============================
  // DOWNLOAD PDF
  // ============================

  const downloadPDF =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(

            "http://localhost:8080/api/transaction/download/pdf",

            {
              method: "GET",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const blob =
          await response.blob();

        const url =
          window.URL.createObjectURL(
            blob
          );

        const link =
          document.createElement(
            "a"
          );

        link.href = url;

        link.download =
          "transactions.pdf";

        document.body.appendChild(
          link
        );

        link.click();

        link.remove();

      } catch (error) {

        console.log(error);
      }
    };

  // ============================
  // USE EFFECT
  // ============================

  useEffect(() => {

    getTransactions();

  }, [
    search,
    type,
    category,
    period,
  ]);

  useEffect(() => {

    getCategories();

  }, []);

  return (

    <UserLayout>

      <div className="w-full min-h-screen bg-gray-100 p-6">

        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Transactions
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your transactions
            </p>

          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={downloadPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
            >
              Download PDF
            </button>

            <div className="bg-black text-white px-5 py-3 rounded-xl text-lg font-semibold">
              Total :
              {" "}
              {transactions.length}
            </div>

          </div>

        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search Transaction..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full h-[55px] border rounded-xl px-4 outline-none"
            />

            {/* TYPE */}
            <select
              value={type}
              onChange={(e) =>
                setType(
                  e.target.value
                )
              }
              className="w-full h-[55px] border rounded-xl px-4 outline-none"
            >

              <option value="all">
                All Types
              </option>

              <option value="income">
                Income
              </option>

              <option value="expense">
                Expense
              </option>

            </select>

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="w-full h-[55px] border rounded-xl px-4 outline-none"
            >

              <option value="all">
                All Categories
              </option>

              {categories.map(
                (item) => (

                  <option
                    key={item._id}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                )
              )}

            </select>

            {/* PERIOD FILTER */}
            <select
              value={period}
              onChange={(e) =>
                setPeriod(
                  e.target.value
                )
              }
              className="w-full h-[55px] border rounded-xl px-4 outline-none"
            >

              <option value="all">
                All Time
              </option>

              <option value="month">
                This Month
              </option>

              <option value="lastmonth">
                Last Month
              </option>

              <option value="year">
                This Year
              </option>

            </select>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              {/* TABLE HEADER */}
              <thead className="bg-black text-white">

                <tr>

                  <th className="text-left px-6 py-4">
                    Title
                  </th>

                  <th className="text-left px-6 py-4">
                    Amount
                  </th>

                  <th className="text-left px-6 py-4">
                    Type
                  </th>

                  <th className="text-left px-6 py-4">
                    Category
                  </th>

                  <th className="text-left px-6 py-4">
                    Date
                  </th>

                  <th className="text-left px-6 py-4">
                    Action
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}
              <tbody>

                {transactions.length > 0 ? (

                  transactions.map(
                    (
                      transaction
                    ) => (

                      <tr
                        key={
                          transaction._id
                        }
                        className="border-b hover:bg-gray-50 transition"
                      >

                        {/* TITLE */}
                        <td className="px-6 py-4 font-medium text-gray-700">
                          {
                            transaction.title
                          }
                        </td>

                        {/* AMOUNT */}
                        <td className="px-6 py-4">

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold
                            
                            ${
                              transaction.type ===
                              "income"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            ₹
                            {" "}
                            {
                              transaction.amount
                            }
                          </span>

                        </td>

                        {/* TYPE */}
                        <td className="px-6 py-4 capitalize">
                          {
                            transaction.type
                          }
                        </td>

                        {/* CATEGORY */}
                        <td className="px-6 py-4">
                          {
                            transaction.category
                          }
                        </td>

                        {/* DATE */}
                        <td className="px-6 py-4">

                          {new Date(
                            transaction.date
                          ).toLocaleDateString()}

                        </td>

                        {/* DELETE */}
                        <td className="px-6 py-4">

                          <button
                            onClick={() =>
                              deleteTransaction(
                                transaction._id
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-10 text-gray-500"
                    >
                      No Transactions Found
                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </UserLayout>
  );
};

export default Transactions;
