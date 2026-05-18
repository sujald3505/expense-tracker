// import React, { useEffect, useState } from "react";
// import AdminLayout from "../../layouts/AdminLayout";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     activeUsers: 0,
//     blockedUsers: 0,
//   });

//   // GET DASHBOARD STATS
//   const getDashboardStats = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         "http://localhost:8080/api/user",
//         {
//           method: "GET",

//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();

//       const totalUsers = data.users.length;

//       const blockedUsers = data.users.filter(
//         (user) => user.isBlocked
//       ).length;

//       const activeUsers =
//         totalUsers - blockedUsers;

//       setStats({
//         totalUsers,
//         activeUsers,
//         blockedUsers,
//       });

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getDashboardStats();
//   }, []);

//   return (
//     <AdminLayout>
//     <div className="min-h-screen bg-gray-100">
       

//       {/* HEADER */}
//       <div className="bg-white shadow-md px-8 py-5 flex items-center justify-between">

//         <div>
         
//           <h1 className="text-3xl font-bold text-gray-800">
//             Admin Dashboard
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Expense Tracker Admin Panel
//           </p>
//         </div>

//         {/* <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">
//           Logout
//         </button> */}

//       </div>

//       {/* CONTENT */}
//       <div className="p-8">

//         {/* STATS CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//           {/* TOTAL USERS */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">

//             <div className="flex items-center justify-between">

//               <div>
//                 <h3 className="text-gray-500 text-lg">
//                   Total Users
//                 </h3>

//                 <h1 className="text-4xl font-bold mt-2 text-black">
//                   {stats.totalUsers}
//                 </h1>
//               </div>

//               <div className="bg-blue-100 p-4 rounded-full text-3xl">
//                 👥
//               </div>

//             </div>

//           </div>

//           {/* ACTIVE USERS */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">

//             <div className="flex items-center justify-between">

//               <div>
//                 <h3 className="text-gray-500 text-lg">
//                   Active Users
//                 </h3>

//                 <h1 className="text-4xl font-bold mt-2 text-green-600">
//                   {stats.activeUsers}
//                 </h1>
//               </div>

//               <div className="bg-green-100 p-4 rounded-full text-3xl">
//                 ✅
//               </div>

//             </div>

//           </div>

//           {/* BLOCKED USERS */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">

//             <div className="flex items-center justify-between">

//               <div>
//                 <h3 className="text-gray-500 text-lg">
//                   Blocked Users
//                 </h3>

//                 <h1 className="text-4xl font-bold mt-2 text-red-600">
//                   {stats.blockedUsers}
//                 </h1>
//               </div>

//               <div className="bg-red-100 p-4 rounded-full text-3xl">
//                 🚫
//               </div>

//             </div>

//           </div>

//         </div>

//         {/* RECENT SECTION */}
//         <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">

//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Welcome Admin 👋
//           </h2>

//           <p className="text-gray-600 ">
//             This is your Expense Tracker admin dashboard.
//             Here you can manage users, transactions,
//             reports, analytics, and system settings.
//           </p>

//         </div>

//       </div>

//     </div>
//     </AdminLayout>
//   );
// };

// export default AdminDashboard;



import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
  });

  // GET DASHBOARD STATS
  const getDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/user",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      const totalUsers = data.users.length;

      const blockedUsers = data.users.filter(
        (user) => user.isBlocked
      ).length;

      const activeUsers =
        totalUsers - blockedUsers;

      setStats({
        totalUsers,
        activeUsers,
        blockedUsers,
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardStats();
  }, []);

  return (
    <AdminLayout>

      {/* MAIN CONTAINER */}
      <div className="w-full min-h-screen bg-gray-100 pl-6">

        {/* HEADER */}
        <div className="w-full bg-white shadow-md rounded-2xl px-8 py-6 mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2  ">
            Expense Tracker Admin Panel
          </p>

        </div>

        {/* STATS CARDS */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* TOTAL USERS */}
          <div className="w-full h-[170px] bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between">

            <div>

              <h3 className="text-gray-500 text-lg">
                Total Users
              </h3>

              <h1 className="text-5xl font-bold mt-4 text-black">
                {stats.totalUsers}
              </h1>

            </div>

            <div className="w-[90px] h-[90px] bg-blue-100 rounded-full flex items-center justify-center text-4xl">
              👥
            </div>

          </div>

          {/* ACTIVE USERS */}
          <div className="w-full h-[170px] bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between">

            <div>

              <h3 className="text-gray-500 text-lg">
                Active Users
              </h3>

              <h1 className="text-5xl font-bold mt-4 text-green-600">
                {stats.activeUsers}
              </h1>

            </div>

            <div className="w-[90px] h-[90px] bg-green-100 rounded-full flex items-center justify-center text-4xl">
              ✅
            </div>

          </div>

          {/* BLOCKED USERS */}
          <div className="w-full h-[170px] bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between">

            <div>

              <h3 className="text-gray-500 text-lg">
                Blocked Users
              </h3>

              <h1 className="text-5xl font-bold mt-4 text-red-600">
                {stats.blockedUsers}
              </h1>

            </div>

            <div className="w-[90px] h-[90px] bg-red-100 rounded-full flex items-center justify-center text-4xl">
              🚫
            </div>

          </div>

        </div>

        {/* WELCOME SECTION */}
        <div className="w-full min-h-[220px] mt-8 bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">

          <h2 className="text-3xl font-semibold text-gray-800 mb-5">
            Welcome Admin 👋
          </h2>

          <p className="text-gray-600 text-lg leading-8 max-w-[1000px]">
            This is your Expense Tracker admin dashboard.
            Here you can manage users, transactions,
            reports, analytics, and system settings.
          </p>

        </div>

      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;