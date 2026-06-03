import React, { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  // ============================
  // GET ALL TRANSACTIONS
  // ============================

  const getTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/transaction/all",
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

      // REFRESH
      getTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // USE EFFECT
  // ============================

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <AdminLayout>
      {/* ================= PAGE HEADER ================= */}

      <div
        className="
        flex
        flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-4
        mb-6
        md:mb-8
      "
      >
        <div>
          <h1
            className="
            text-2xl
            sm:text-3xl
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
            mt-1
          "
          >
            Manage all user transactions
          </p>
        </div>

        {/* TOTAL */}
        <div
          className="
          bg-black
          text-white
          px-5
          py-3
          rounded-xl
          font-semibold
          w-fit
          text-sm
          sm:text-base
        "
        >
          Total : {transactions.length}
        </div>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}

      <div className="block lg:hidden space-y-4">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="
                bg-white
                rounded-2xl
                shadow-md
                p-4
              "
            >
              {/* USER */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={
                    transaction.user?.profileImage
                      ? `http://localhost:8080/uploads/${transaction.user.profileImage}`
                      : "https://i.pravatar.cc/150"
                  }
                  alt="user"
                  className="
                    w-12
                    h-12
                    rounded-full
                    object-cover
                    shrink-0
                  "
                />

                <div className="min-w-0 flex-1">
                  <h2
                    className="
                      font-bold
                      text-gray-800
                      truncate
                    "
                  >
                    {transaction.user?.name || "N/A"}
                  </h2>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      break-all
                    "
                  >
                    {transaction.user?.email || "N/A"}
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Title</span>

                  <span className="font-medium text-right">
                    {transaction.title}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Amount</span>

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold

                      ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }
                    `}
                  >
                    ₹ {transaction.amount}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Type</span>

                  <span className="capitalize font-medium">
                    {transaction.type}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Category</span>

                  <span className="font-medium text-right">
                    {transaction.category}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Date</span>

                  <span className="font-medium">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => deleteTransaction(transaction._id)}
                className="
                  w-full
                  mt-5
                  h-11.25
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  rounded-xl
                  font-semibold
                  transition
                "
              >
                Delete Transaction
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

      {/* ================= DESKTOP TABLE VIEW ================= */}

      <div
        className="
        hidden
        lg:block
        bg-white
        rounded-2xl
        shadow-lg
        overflow-hidden
      "
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-275">
            {/* TABLE HEADER */}

            <thead className="bg-black text-white">
              <tr>
                <th className="text-left px-6 py-4">User</th>

                <th className="text-left px-6 py-4">Email</th>

                <th className="text-left px-6 py-4">Title</th>

                <th className="text-left px-6 py-4">Amount</th>

                <th className="text-left px-6 py-4">Type</th>

                <th className="text-left px-6 py-4">Category</th>

                <th className="text-left px-6 py-4">Date</th>

                <th className="text-left px-6 py-4">Action</th>
              </tr>
            </thead>

            {/* TABLE BODY */}

            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="
                      border-b
                      hover:bg-gray-50
                      transition
                    "
                  >
                    {/* USER */}

                    <td
                      className="
                        px-6
                        py-4
                        font-medium
                        text-gray-700
                      "
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            transaction.user?.profileImage
                              ? `http://localhost:8080/uploads/${transaction.user.profileImage}`
                              : "https://i.pravatar.cc/150"
                          }
                          alt="user"
                          className="
                            w-10
                            h-10
                            rounded-full
                            object-cover
                          "
                        />

                        <span>{transaction.user?.name || "N/A"}</span>
                      </div>
                    </td>

                    {/* EMAIL */}

                    <td
                      className="
                        px-6
                        py-4
                        text-gray-600
                      "
                    >
                      {transaction.user?.email || "N/A"}
                    </td>

                    {/* TITLE */}

                    <td
                      className="
                        px-6
                        py-4
                        font-medium
                        text-gray-700
                      "
                    >
                      {transaction.title}
                    </td>

                    {/* AMOUNT */}

                    <td
                      className="
                        px-6
                        py-4
                        font-semibold
                      "
                    >
                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-semibold
                          whitespace-nowrap

                          ${
                            transaction.type === "income"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }
                        `}
                      >
                        ₹ {transaction.amount}
                      </span>
                    </td>

                    {/* TYPE */}

                    <td
                      className="
                        px-6
                        py-4
                        capitalize
                      "
                    >
                      {transaction.type}
                    </td>

                    {/* CATEGORY */}

                    <td className="px-6 py-4">{transaction.category}</td>

                    {/* DATE */}

                    <td className="px-6 py-4">
                      {new Date(transaction.date).toLocaleDateString("en-GB")}
                    </td>

                    {/* ACTION */}

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
                  <td
                    colSpan="8"
                    className="
                    text-center
                    py-10
                    text-gray-500
                  "
                  >
                    No Transactions Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Transactions;
