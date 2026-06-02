import React, { useEffect, useState } from "react";

import UserLayout from "../../layouts/UserLayout";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const [categories, setCategories] = useState([]);

  // FILTER STATES
  const [search, setSearch] = useState("");

  const [type, setType] = useState("all");

  const [category, setCategory] = useState("all");

  const [period, setPeriod] = useState("all");

  // ============================
  // GET TRANSACTIONS
  // ============================

  const getTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/api/transaction?search=${search}&type=${type}&category=${category}&period=${period}`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      setTransactions(data.transactions || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // GET CATEGORIES
  // ============================

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/category");

      const data = await response.json();

      setCategories(data.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // DELETE TRANSACTION
  // ============================

  const deleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:8080/api/transaction/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // DOWNLOAD PDF
  // ============================

  const downloadPDF = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/transaction/download/pdf",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = "transactions.pdf";

      document.body.appendChild(link);

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
  }, [search, type, category, period]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <UserLayout>
      <div className="w-full">
        {/* ================= HEADER ================= */}

        <div
          className="
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-5
          mb-6
        "
        >
          {/* LEFT */}
          <div>
            <h1
              className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-bold
              text-gray-800
            "
            >
              Transactions
            </h1>

            <p
              className="
              text-sm
              sm:text-base
              text-gray-500
              mt-2
            "
            >
              Manage your transactions easily
            </p>
          </div>

          {/* RIGHT */}
          <div
            className="
            flex
            flex-col
            sm:flex-row
            gap-3
            w-full
            xl:w-auto
          "
          >
            <button
              onClick={downloadPDF}
              className="
              w-full
              sm:w-auto
              h-12.5
              px-6
              bg-blue-600
              hover:bg-blue-700
              text-white
              rounded-xl
              font-semibold
              transition
            "
            >
              Download PDF
            </button>

            <div
              className="
              h-12.5
              px-6
              bg-black
              text-white
              rounded-xl
              flex
              items-center
              justify-center
              font-semibold
              whitespace-nowrap
            "
            >
              Total : {transactions.length}
            </div>
          </div>
        </div>

        {/* ================= FILTERS ================= */}

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-4
          sm:p-6
          mb-6
        "
        >
          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
          >
            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search Transaction..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
              w-full
              h-12.5
              border
              border-gray-300
              rounded-xl
              px-4
              outline-none
              focus:border-black
              text-sm
              sm:text-base
            "
            />

            {/* TYPE */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="
              w-full
              h-12.5
              border
              border-gray-300
              rounded-xl
              px-4
              outline-none
              focus:border-black
              text-sm
              sm:text-base
            "
            >
              <option value="all">All Types</option>

              <option value="income">Income</option>

              <option value="expense">Expense</option>
            </select>

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
              w-full
              h-12.5
              border
              border-gray-300
              rounded-xl
              px-4
              outline-none
              focus:border-black
              text-sm
              sm:text-base
            "
            >
              <option value="all">All Categories</option>

              {categories.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            {/* PERIOD */}
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="
              w-full
              h-12.5
              border
              border-gray-300
              rounded-xl
              px-4
              outline-none
              focus:border-black
              text-sm
              sm:text-base
            "
            >
              <option value="all">All Time</option>

              <option value="month">This Month</option>

              <option value="lastmonth">Last Month</option>

              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* ================= MOBILE CARDS ================= */}

        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="
                  bg-white
                  rounded-2xl
                  shadow-md
                  p-5
                  space-y-4
                "
              >
                {/* TOP */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 wrap-break-words">
                      {transaction.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {transaction.category}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap

                      ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                  >
                    ₹ {transaction.amount}
                  </span>
                </div>

                {/* MIDDLE */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Type</p>

                    <p className="font-medium capitalize">{transaction.type}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">Date</p>

                      <p className="font-medium">
                        {new Date(transaction.date).toLocaleDateString("en-GB")}
                      </p>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => deleteTransaction(transaction._id)}
                  className="
                    w-full
                    h-11.25
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    rounded-xl
                    font-medium
                    transition
                  "
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div
              className="
              bg-white
              rounded-2xl
              shadow-md
              p-10
              text-center
              text-gray-500
            "
            >
              No Transactions Found
            </div>
          )}
        </div>

        {/* ================= DESKTOP TABLE ================= */}

        <div
          className="
          hidden
          lg:block
          bg-white
          rounded-2xl
          shadow-md
          overflow-hidden
        "
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* HEADER */}
              <thead className="bg-black text-white">
                <tr>
                  <th className="text-left px-6 py-4">Title</th>

                  <th className="text-left px-6 py-4">Amount</th>

                  <th className="text-left px-6 py-4">Type</th>

                  <th className="text-left px-6 py-4">Category</th>

                  <th className="text-left px-6 py-4">Date</th>

                  <th className="text-left px-6 py-4">Action</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr
                      key={transaction._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {transaction.title}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold

                            ${
                              transaction.type === "income"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                        >
                          ₹ {transaction.amount}
                        </span>
                      </td>

                      <td className="px-6 py-4 capitalize">
                        {transaction.type}
                      </td>

                      <td className="px-6 py-4">{transaction.category}</td>

                      <td className="px-6 py-4">
                          {new Date(transaction.date).toLocaleDateString("en-GB")}
                        </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteTransaction(transaction._id)}
                          className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            transition
                          "
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
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
