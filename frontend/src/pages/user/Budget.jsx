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
      <div className="w-full">
        {/* ================= HEADER ================= */}

        <div className="mb-6 md:mb-8">
          <h1
            className="
            text-2xl
            sm:text-3xl
            lg:text-4xl
            font-bold
            text-gray-800
          "
          >
            Budget Planner
          </h1>

          <p
            className="
            text-sm
            md:text-base
            text-gray-500
            mt-2
          "
          >
            Manage your monthly budgets
          </p>
        </div>

        {/* ================= FORM ================= */}

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
          <form
            onSubmit={createBudget}
            className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-4
          "
          >
            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="
              w-full
              h-12.5
              md:h-13.75
              border
              border-gray-300
              rounded-xl
              px-4
              outline-none
              focus:border-black
              text-sm
              md:text-base
            "
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
              className="
              w-full
              h-12.5
              md:h-13.75
              border
              border-gray-300
              rounded-xl
              px-4
              outline-none
              focus:border-black
              text-sm
              md:text-base
            "
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="
              w-full
              h-12.5
              md:h-13.75
              bg-black
              hover:bg-gray-800
              text-white
              rounded-xl
              font-semibold
              text-sm
              md:text-base
              transition
            "
            >
              Add Budget
            </button>
          </form>
        </div>

        {/* ================= BUDGET CARDS ================= */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          2xl:grid-cols-3
          gap-5
        "
        >
          {budgets.length > 0 ? (
            budgets.map((budget) => {
              const percentage = ((budget.spent / budget.amount) * 100).toFixed(
                0,
              );

              return (
                <div
                  key={budget._id}
                  className="
                    bg-white
                    rounded-2xl
                    shadow-md
                    p-5
                    md:p-6
                  "
                >
                  {/* TOP */}
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                      mb-5
                    "
                  >
                    <div>
                      <h2
                        className="
                          text-xl
                          md:text-2xl
                          font-bold
                          text-gray-800
                          wrap-break-words
                        "
                      >
                        {budget.category}
                      </h2>
                    </div>

                    <button
                      onClick={() => deleteBudget(budget._id)}
                      className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-3
                        py-2
                        rounded-lg
                        text-xs
                        sm:text-sm
                        whitespace-nowrap
                        transition
                      "
                    >
                      Delete
                    </button>
                  </div>

                  {/* DETAILS */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-gray-500 text-sm md:text-base">
                        Budget
                      </p>

                      <p className="font-bold text-black text-sm md:text-base break-all">
                        ₹ {budget.amount}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <p className="text-gray-500 text-sm md:text-base">
                        Spent
                      </p>

                      <p className="font-bold text-red-500 text-sm md:text-base break-all">
                        ₹ {budget.spent}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <p className="text-gray-500 text-sm md:text-base">
                        Remaining
                      </p>

                      <p className="font-bold text-green-600 text-sm md:text-base break-all">
                        ₹ {budget.remaining}
                      </p>
                    </div>
                  </div>

                  {/* PROGRESS BAR */}
                  <div
                    className="
                      w-full
                      bg-gray-200
                      h-4
                      rounded-full
                      overflow-hidden
                    "
                  >
                    <div
                      className={`h-4 rounded-full transition-all duration-500

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

                  {/* FOOTER */}
                  <div
                    className="
                      mt-4
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      gap-2
                    "
                  >
                    <p className="text-sm text-gray-500">{percentage}% Used</p>

                    {percentage >= 100 && (
                      <p
                        className="
                          text-red-500
                          font-semibold
                          text-sm
                        "
                      >
                        Budget Exceeded
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className="
              col-span-full
              bg-white
              rounded-2xl
              shadow-md
              py-14
              text-center
              text-gray-500
              text-lg
            "
            >
              No Budget Found
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default Budget;
