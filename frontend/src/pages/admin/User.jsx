import React, { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

const Users = () => {
  const [users, setUsers] = useState([]);

  // ============================
  // GET USERS
  // ============================

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/user", {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setUsers(data.users || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // DELETE USER
  // ============================

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:8080/api/user/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "application/json",
        },
      });

      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // USE EFFECT
  // ============================

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="w-full min-h-screen bg-gray-100 p-6">
        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Users Management
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Manage all registered users
            </p>
          </div>

          {/* TOTAL USERS */}

          <div className="bg-black text-white px-6 py-4 rounded-2xl shadow-lg text-lg font-semibold w-fit">
            Total Users : {users.length}
          </div>
        </div>

        {/* MOBILE VIEW */}

        <div className="grid grid-cols-1 gap-5 lg:hidden">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-3xl shadow-lg p-5 border border-gray-200"
              >
                {/* TOP */}

                <div className="flex items-center gap-4">
                  {/* AVATAR */}

                  <div
                    className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-linear-to-r
                    from-blue-500
                    to-purple-500
                    flex
                    items-center
                    justify-center
                    text-white
                    text-2xl
                    font-bold
                    shadow-lg
                  "
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  {/* USER INFO */}

                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">
                      {user.name}
                    </h2>

                    <p className="text-gray-500 text-sm break-all mt-1">
                      {user.email}
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      {user.email === "admin@gmail.com"
                        ? "Admin Account"
                        : "User Account"}
                    </p>
                  </div>
                </div>

                {/* STATUS */}

                <div className="mt-5">
                  <span
                    className={`
                    px-5
                    py-2
                    rounded-full
                    text-sm
                    font-semibold

                    ${
                      user.isBlocked
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }
                  `}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </div>

                {/* BUTTON */}

                <button
                  onClick={() => deleteUser(user._id)}
                  className="
                  mt-5
                  w-full
                  h-12.5
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  rounded-2xl
                  font-semibold
                  shadow-md
                  transition
                "
                >
                  Delete User
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center text-gray-500 shadow-lg">
              No Users Found
            </div>
          )}
        </div>

        {/* DESKTOP VIEW */}

        <div className="hidden lg:block bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          {/* TABLE HEADER */}

          <div className="grid grid-cols-4 bg-gray-50 border-b px-8 py-6">
            <div className="text-xl font-bold text-gray-700">User</div>

            <div className="text-xl font-bold text-gray-700">Email</div>

            <div className="text-xl font-bold text-gray-700">Status</div>

            <div className="text-xl font-bold text-gray-700 text-center">
              Action
            </div>
          </div>

          {/* TABLE BODY */}

          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="
                grid
                grid-cols-4
                items-center
                px-8
                py-6
                border-b
                hover:bg-gray-50
                transition
              "
              >
                {/* USER */}

                <div className="flex items-center gap-4">
                  {/* AVATAR */}

                  <div
                    className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-linear-to-r
                    from-blue-500
                    to-purple-500
                    flex
                    items-center
                    justify-center
                    text-white
                    text-2xl
                    font-bold
                    shadow-lg
                  "
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  {/* INFO */}

                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {user.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {user.email === "admin@gmail.com"
                        ? "Admin Account"
                        : "User Account"}
                    </p>
                  </div>
                </div>

                {/* EMAIL */}

                <div className="text-gray-700 text-lg">
                  {user.email}
                </div>

                {/* STATUS */}

                <div>
                  <span
                    className={`
                    px-5
                    py-2
                    rounded-full
                    text-sm
                    font-semibold

                    ${
                      user.isBlocked
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }
                  `}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </div>

                {/* ACTION */}

                <div className="flex justify-center">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-6
                    py-3
                    rounded-2xl
                    font-semibold
                    shadow-md
                    transition
                  "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-gray-500 text-xl">
              No Users Found
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Users;