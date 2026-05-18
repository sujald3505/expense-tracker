import React, { useState } from "react";

import UserLayout from "../../layouts/UserLayout";

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // ADD TRANSACTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/transaction", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log(data);

      alert("Transaction Added Successfully");

      // RESET FORM
      setFormData({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        date: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserLayout>
      <div className="w-full min-h-screen bg-gray-100 p-6">
        {/* PAGE TITLE */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Add Transaction</h1>

          <p className="text-gray-500 mt-2">Add your income and expenses</p>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TITLE */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-black"
                required
              />
            </div>

            {/* AMOUNT */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-black"
                required
              />
            </div>

            {/* TYPE */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-black"
              >
                <option value="income">Income</option>

                <option value="expense">Expense</option>
              </select>
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
                className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-black"
                required
              />
            </div>

            {/* DATE */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-black"
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full h-[55px] bg-black hover:bg-gray-800 text-white rounded-xl text-lg font-semibold transition"
            >
              Add Transaction
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default AddTransaction;
