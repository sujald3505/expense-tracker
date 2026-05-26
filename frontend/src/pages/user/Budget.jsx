

import React, { useEffect, useState } from "react";

import UserLayout from "../../layouts/UserLayout";

const Budget = () => {
  // ============================
  // STATES
  // ============================

  const [budgets, setBudgets] = useState([]);

  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("");

  const [amount, setAmount] = useState("");

  // ============================
  // GET BUDGETS
  // ============================

  const getBudgets = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/budget", {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setBudgets(data.budgets || []);
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
  // CREATE BUDGET
  // ============================

  const createBudget = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/budget", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          category,
          amount,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCategory("");

        setAmount("");

        getBudgets();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // DELETE BUDGET
  // ============================

  const deleteBudget = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:8080/api/budget/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getBudgets();
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // USE EFFECT
  // ============================

  useEffect(() => {
    getBudgets();

    getCategories();
  }, []);

  return (
    <UserLayout>
      <div className="w-full min-h-screen bg-gray-100 p-6">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Budget Planner</h1>

          <p className="text-gray-500 mt-2">Manage your monthly budgets</p>
        </div>

        {/* ADD FORM */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <form
            onSubmit={createBudget}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full h-[55px] border rounded-xl px-4 outline-none"
            >
              <option value="">Select Category</option>

              {categories.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            {/* AMOUNT */}
            <input
              type="number"
              placeholder="Enter Budget Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full h-[55px] border rounded-xl px-4 outline-none"
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white rounded-xl h-[55px] font-semibold transition"
            >
              Add Budget
            </button>
          </form>
        </div>

        {/* BUDGET CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.length > 0 ? (
            budgets.map((budget) => {
              const percentage = ((budget.spent / budget.amount) * 100).toFixed(
                0,
              );

              return (
                <div
                  key={budget._id}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  {/* CATEGORY */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {budget.category}
                    </h2>

                    <button
                      onClick={() => deleteBudget(budget._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>

                  {/* DETAILS */}
                  <div className="space-y-2 mb-5">
                    <p className="text-gray-600">
                      Budget :
                      <span className="font-bold text-black ml-2">
                        ₹ {budget.amount}
                      </span>
                    </p>

                    <p className="text-gray-600">
                      Spent :
                      <span className="font-bold text-red-500 ml-2">
                        ₹ {budget.spent}
                      </span>
                    </p>

                    <p className="text-gray-600">
                      Remaining :
                      <span className="font-bold text-green-600 ml-2">
                        ₹ {budget.remaining}
                      </span>
                    </p>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                    <div
                      className={`h-4 rounded-full
                      
                      ${
                        percentage < 70
                          ? "bg-green-500"
                          : percentage < 100
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{
                        width: percentage > 100 ? "100%" : `${percentage}%`,
                      }}
                    />
                  </div>

                  {/* PERCENTAGE */}
                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-sm text-gray-500">{percentage}% Used</p>

                    {percentage >= 100 && (
                      <p className="text-red-500 font-semibold text-sm">
                        Budget Exceeded
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500 text-lg">
              No Budget Found
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default Budget;
