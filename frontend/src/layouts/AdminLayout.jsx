// import React from "react";
// import { Children } from "react";
// import { Outlet, Link, useNavigate } from "react-router";

// const AdminLayout = ({ children }) => {
//   const navigate = useNavigate();

//   // LOGOUT
//   const handleLogout = () => {
//     localStorage.removeItem("token");

//     navigate("/");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* SIDEBAR */}

//       <div className="flex">
//         <div className="w-64 bg-black text-white p-5">
//           {/* LOGO */}
//           <h1 className="text-3xl font-bold mb-10">Admin Panel</h1>

//           {/* MENU */}
//           <ul className="space-y-4">
//             <li>
//               <Link
//                 to="/admindashboard"
//                 className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
//               >
//                 📊 Dashboard
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/user"
//                 className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
//               >
//                 👥 Users
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/transaction"
//                 className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
//               >
//                 💰 Transactions
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/category"
//                 className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
//               >
//                 📂 Categories
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/reports"
//                 className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
//               >
//                 📈 Reports
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/setting"
//                 className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
//               >
//                 ⚙️ Settings
//               </Link>
//             </li>
//           </ul>
//         </div>

//         <div>
//           <div className="flex-1 flex flex-col">
//             {/* TOP NAVBAR */}
//             <div className= " w-full  bg-white shadow-md px-8 py-4 flex items-center justify-between">
//               <h2 className="text-2xl font-semibold text-gray-800">
//                 Expense Tracker Admin
//               </h2>

//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
//               >
//                 Logout
//               </button>
//             </div>

//             {/* PAGE CONTENT */}
//             <div className="p-6">
//               <Outlet />
//             </div>
//           </div>
//           {children}
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//     </div>
//   );
// };

// export default AdminLayout;
// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// const AdminLayout = ({ children }) => {
//   const location = useLocation();

//   const menus = [
//     {
//       name: "📊 Dashboard",
//       path: "/admin/admindashboard",
//     },
//     {
//       name: "👥 Users",
//       path: "/admin/user",
//     },
//     {
//       name: "💰 Transactions",
//       path: "/admin/transaction",
//     },
//     {
//       name: "📂 Categories",
//       path: "/admin/category",
//     },
//     {
//       name: "📈 Reports",
//       path: "/admin/reports",
//     },
//     {
//       name: "⚙️ Settings",
//       path: "/admin/setting",
//     },
//   ];

//   return (
//     <div className="flex w-full min-h-screen bg-gray-100 overflow-hidden">
//       {/* SIDEBAR */}
//       <div className="w-[280px] bg-black text-white flex flex-col flex-shrink-0">
//         {/* LOGO */}
//         <div className="h-[90px] flex items-center px-6 border-b border-gray-800">
//           <h1 className="text-4xl font-bold">Admin Panel</h1>
//         </div>

//         {/* MENU */}
//         <div className="flex-1 p-4 space-y-3">
//           {menus.map((menu) => (
//             <Link
//               key={menu.path}
//               to={menu.path}
//               className={`flex items-center h-[55px] px-5 rounded-xl text-lg font-medium transition-all duration-300

//               ${
//                 location.pathname === menu.path
//                   ? "bg-white text-black"
//                   : "hover:bg-gray-800"
//               }`}
//             >
//               {menu.name}
//             </Link>
//           ))}
//         </div>

//         {/* FOOTER */}
//         <div className="p-5 border-t border-gray-800">
//           <button className="w-full h-[50px] bg-red-500 hover:bg-red-600 rounded-xl text-lg font-semibold transition duration-300">
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex-1 flex flex-col w-full overflow-x-hidden">
//         {/* TOPBAR */}
//         <div className="h-[90px] bg-white shadow-sm px-8 flex items-center justify-between">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Expense Tracker Admin
//           </h1>

//           <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
//             A
//           </div>
//         </div>

//         {/* PAGE CONTENT */}
//         <div className="flex-1 p-8 w-full overflow-x-hidden">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;
import React, { useEffect, useState } from "react";

import { Link, Navigate, useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState("");

  // SET ACTIVE MENU
  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  const menus = [
    {
      name: "📊 Dashboard",
      path: "/admin/dashboard",
    },
    {
      name: "👥 Users",
      path: "/admin/user",
    },
    {
      name: "💰 Transactions",
      path: "/transaction",
    },
    {
      name: "📂 Categories",
      path: "/category",
    },
    {
      name: "📈 Reports",
      path: "/reports",
    },
    {
      name: "⚙️ Settings",
      path: "/setting",
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");

    Navigate("/login");
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100 overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-[280px] bg-black text-white flex flex-col flex-shrink-0">
        {/* LOGO */}
        <div className="h-[90px] flex items-center px-6 border-b border-gray-800">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
        </div>

        {/* MENUS */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center h-[55px] px-5 rounded-xl text-lg font-medium transition-all duration-300
              
              ${
                activeMenu === menu.path
                  ? "bg-white text-black"
                  : "hover:bg-gray-800"
              }`}
            >
              {menu.name}
            </Link>
          ))}
        </div>

        {/* FOOTER */}
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
          <h1 className="text-3xl font-bold text-gray-800">
            Expense Tracker Admin
          </h1>

          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
            A
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-8 overflow-y-auto w-full">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
