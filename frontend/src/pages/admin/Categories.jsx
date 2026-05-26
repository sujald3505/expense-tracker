import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");

  // GET CATEGORIES
  const getCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/category", {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD CATEGORY
  const addCategory = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:8080/api/category/add", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          name,
        }),
      });

      setName("");

      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE CATEGORY
  const deleteCategory = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:8080/api/category/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <AdminLayout>
    <div className="w-full min-h-screen p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Categories</h1>

        <p className="text-gray-500 mt-1">Manage expense categories</p>
      </div>

      {/* ADD CATEGORY */}
      <form
        onSubmit={addCategory}
        className="bg-white p-6 rounded-2xl shadow-lg mb-8 flex gap-4"
      >
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full h-[50] px-4 rounded-lg outline-none"
        />

        <button
          type="submit"
          className="bg-black text-white w-[150px] h-[50px] rounded-lg hover:bg-gray-800 transition"
        >
          Add
        </button>
      </form>

      {/* CATEGORY TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-black text-white h-[70px]">
            <tr>
              <th className="text-left px-6">Category Name</th>

              <th className="text-left px-6">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category._id} className="border-b h-[70px]">
                  <td className="px-6 font-medium">{category.name}</td>

                  <td className="px-6">
                    <button
                      onClick={() => deleteCategory(category._id)}
                      className="bg-red-500 hover:bg-red-600 text-white w-[100px] h-[40px] rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center h-[300px] text-gray-500">
                  No Categories Found
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

export default Categories;
