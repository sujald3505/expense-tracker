import React from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const UserLayout = ({
  children,
}) => {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");

  };

  const menus = [
    {
      name: "🏠 Dashboard",
      path: "/user/dashboard",
    },

    {
      name: "➕ Add Transaction",
      path:
        "/user/addtransaction",
    },

    {
      name: "💰 Transactions",
      path:
        "/user/transaction",
    },

    {
      name: "📊 Reports",
      path: "/user/report",
    },

    {
      name: "👤 Profile",
      path: "/user/profile",
    },

    {
      name: "⚙️ Settings",
      path: "/settings",
    },
  ];

  return (
    <div className="flex w-full min-h-screen bg-gray-100 overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-[280px] bg-black text-white flex flex-col flex-shrink-0">

        {/* LOGO */}
        <div className="h-[90px] flex items-center px-6 border-b border-gray-800">

          <h1 className="text-3xl font-bold">
            Expense Tracker
          </h1>

        </div>

        {/* MENUS */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">

          {menus.map((menu) => (

            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center h-[55px] px-5 rounded-xl text-lg font-medium transition-all duration-300
              
              ${
                location.pathname ===
                menu.path
                  ? "bg-white text-black"
                  : "hover:bg-gray-800"
              }`}
            >
              {menu.name}
            </Link>
          ))}

        </div>

        {/* LOGOUT */}
        <div className="p-5 border-t border-gray-800">

          <button
            onClick={handleLogout}
            className="w-full h-[50px] bg-red-500 hover:bg-red-600 rounded-xl text-lg font-semibold transition duration-300"
          >
            Logout
          </button>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOPBAR */}
        <div className="h-[90px] bg-white shadow-sm px-8 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Expense Tracker
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Manage your expenses easily
            </p>

          </div>

          {/* USER PROFILE */}
          <div className="flex items-center gap-4">

            <div className="text-right">

              <h2 className="font-semibold text-gray-800">
                User
              </h2>

              <p className="text-sm text-gray-500">
                Welcome Back
              </p>

            </div>

            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
              U
            </div>

          </div>

        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-8 overflow-y-auto">

          {children}

        </div>

      </div>

    </div>
  );
};

export default UserLayout;