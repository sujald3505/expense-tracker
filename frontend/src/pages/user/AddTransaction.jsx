import React, {
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import UserLayout from "../../layouts/UserLayout";

const AddTransaction = () => {
  const [categories, setCategories] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: "",
    });

  // ============================
  // GET CATEGORIES
  // ============================

  const getCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/category"
      );

      const data = await response.json();

      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // HANDLE CHANGE
  // ============================

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // ============================
  // ADD TRANSACTION
  // ============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/transaction",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(
            formData
          ),
        }
      );

      await response.json();

      toast.success(
        "Transaction Added"
      );

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

  // ============================
  // USE EFFECT
  // ============================

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <UserLayout>
      <div className="w-full min-h-screen">

        {/* PAGE HEADER */}
        <div className="mb-6 md:mb-8">

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Add Transaction
          </h1>

          <p className="text-sm md:text-base text-gray-500 mt-2">
            Add your income and
            expenses
          </p>
        </div>

        {/* FORM CARD */}
        <div
          className="
          bg-white
          rounded-2xl
          shadow-lg
          p-4
          sm:p-6
          md:p-8
          w-full
          max-w-4xl
        "
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-5 md:space-y-6"
          >

            {/* GRID */}
            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            "
            >

              {/* TITLE */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  className="
                  w-full
                  h-12.5
                  md:h-13.75
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  text-sm
                  md:text-base
                  outline-none
                  focus:border-black
                "
                  required
                />
              </div>

              {/* AMOUNT */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                  Amount
                </label>

                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  className="
                  w-full
                  h-12.5
                  md:h-13.75
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  text-sm
                  md:text-base
                  outline-none
                  focus:border-black
                "
                  required
                />
              </div>

              {/* TYPE */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                  Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="
                  w-full
                  h-12.5
                  md:h-13.75
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  text-sm
                  md:text-base
                  outline-none
                  focus:border-black
                "
                >
                  <option value="income">
                    Income
                  </option>

                  <option value="expense">
                    Expense
                  </option>
                </select>
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                  Category
                </label>

                <select
                  name="category"
                  value={
                    formData.category
                  }
                  onChange={handleChange}
                  className="
                  w-full
                  h-12.75
                  md:h-13.75
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  text-sm
                  md:text-base
                  outline-none
                  focus:border-black
                "
                  required
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map(
                    (item) => (
                      <option
                        key={item._id}
                        value={
                          item.name
                        }
                      >
                        {item.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* DATE */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                  Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="
                  w-full
                  h-12.5
                  md:h-13.75
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  text-sm
                  md:text-base
                  outline-none
                  focus:border-black
                "
                  required
                />
              </div>
            </div>

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
              text-base
              md:text-lg
              font-semibold
              transition
            "
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