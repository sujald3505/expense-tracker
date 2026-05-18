// // import React, { useEffect, useState } from "react";

// // const Users = () => {
// //   const [users, setUsers] = useState([]);

// //   // GET USERS
// //   const getUsers = async () => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       const response = await fetch(
// //         "http://localhost:8080/api/user",
// //         {
// //           method: "GET",

// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       const data = await response.json();

// //       setUsers(data.users);

// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   // DELETE USER
// //   const deleteUser = async (id) => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       await fetch(
// //         `http://localhost:8080/api/user/${id}`,
// //         {
// //           method: "DELETE",

// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       // Refresh users list
// //       getUsers();

// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     getUsers();
// //   }, []);

// //   return (
// //     <div>

// //       <h1>Users</h1>

// //       <table border="1">

// //         <thead>
// //           <tr>
// //             <th>Name</th>
// //             <th>Email</th>
// //             <th>Role</th>
// //             <th>Status</th>
// //             <th>Action</th>
// //           </tr>
// //         </thead>

// //         <body>

// //           {users.map((user) => (
// //             <tr key={user.email}>

// //               <td>{user.name}</td>

// //               <td>{user.email}</td>

// //               <td>{user.password}</td>

// //               <td>{user.confirmpassword}</td>
// //               <td>
// //                 {user.isBlocked
// //                   ? "Blocked"
// //                   : "Active"}
// //               </td>

// //               <td>
// //                 <button
// //                   onClick={() =>
// //                     deleteUser(user._id)
// //                   }
// //                 >
// //                   Delete
// //                 </button>
// //               </td>

// //             </tr>
// //           ))}

// //         </body>

// //       </table>

// //     </div>
// //   );
// // };

// // export default Users;

// import React, { useEffect, useState } from "react";
// import AdminLayout from "../../layouts/AdminLayout";

// const Users = () => {
//   const [users, setUsers] = useState([]);

//   // GET USERS
//   const getUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         "http://localhost:8080/api/user",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await response.json();

//       setUsers(data.users);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // DELETE USER
//   const deleteUser = async (id) => {
//     try {
//       const token = localStorage.getItem("token");

//       await fetch(
//         `http://localhost:8080/api/user/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Refresh users list
//       getUsers();

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUsers();
//   }, []);

//   return (
//     <AdminLayout>
//     <div className="min-h-screen bg-gradient-to-r w-fit from-blue-500 via-purple-500 to-pink-500 p-8">

//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

//         {/* HEADER */}
//         <div className="flex items-center justify-between px-8 py-6 border-b">

//           <div>
//             <h1 className="text-4xl font-bold text-gray-800">
//               Users Management
//             </h1>

//             <p className="text-gray-500 mt-1">
//               Manage all users easily
//             </p>
//           </div>

//           <div className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold shadow-lg">
//             Total Users : {users.length}
//           </div>

//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">

//           <table className="w-full">

//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="text-left p-5 text-gray-700 font-bold">
//                   Name
//                 </th>

//                 <th className="text-left p-5 text-gray-700 font-bold">
//                   Email
//                 </th>

//                 <th className="text-left p-5 text-gray-700 font-bold">
//                   Status
//                 </th>

//                 <th className="text-center p-5 text-gray-700 font-bold">
//                   Action
//                 </th>
//               </tr>
//             </thead>

//             <tbody>

//               {users.map((user) => (
//                 <tr
//                   key={user._id}
//                   className="border-b hover:bg-gray-50 transition duration-300"
//                 >

//                   {/* NAME */}
//                   <td className="p-5">

//                     <div className="flex items-center gap-4">

//                       <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-bold">
//                         {user.name?.charAt(0).toUpperCase()}
//                       </div>

//                       <div>
//                         <h2 className="font-semibold text-gray-800 text-lg">
//                           {user.name}
//                         </h2>

//                         <p className="text-sm text-gray-500">
//                           User Account
//                         </p>
//                       </div>

//                     </div>

//                   </td>

//                   {/* EMAIL */}
//                   <td className="p-5 text-gray-700">
//                     {user.email}
//                   </td>

//                   {/* STATUS */}
//                   <td className="p-5">

//                     <span
//                       className={`px-4 py-1 rounded-full text-sm font-semibold ${
//                         user.isBlocked
//                           ? "bg-red-100 text-red-600"
//                           : "bg-green-100 text-green-600"
//                       }`}
//                     >
//                       {user.isBlocked ? "Blocked" : "Active"}
//                     </span>

//                   </td>

//                   {/* ACTION */}
//                   <td className="p-5 text-center">

//                     <button
//                       onClick={() => deleteUser(user._id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition duration-300"
//                     >
//                       Delete
//                     </button>

//                   </td>

//                 </tr>
//               ))}

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//     </AdminLayout>
//   );
// };

// export default Users;

import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const Users = () => {

  const [users, setUsers] = useState([]);

  // GET USERS
  const getUsers = async () => {
    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/user",
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json",
          },
        }
      );

      const data = await response.json();

      setUsers(data.users);

    } catch (error) {

      console.log(error);
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {
    try {

      const token =
        localStorage.getItem("token");

      await fetch(
        `http://localhost:8080/api/user/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json",
          },
        }
      );

      // REFRESH USERS
      getUsers();

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <AdminLayout>

      {/* MAIN CONTAINER */}
      <div className="w-full min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8">

        {/* MAIN CARD */}
        <div className="w-full min-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* HEADER */}
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between px-10 py-8 border-b">

            <div>

              <h1 className="text-5xl font-bold text-gray-800">
                Users Management
              </h1>

              <p className="text-gray-500 mt-3 text-lg">
                Manage all users easily
              </p>

            </div>

            {/* TOTAL USERS */}
            <div className="mt-5 lg:mt-0 bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg text-xl w-fit">

              Total Users : {users.length}

            </div>

          </div>

          {/* TABLE SECTION */}
          <div className="w-full overflow-x-auto">

            <table className="w-full min-w-full">

              {/* TABLE HEADER */}
              <thead className="bg-gray-100">

                <tr className="h-[90px]">

                  <th className="text-left px-8 text-gray-700 text-2xl font-bold">
                    Name
                  </th>

                  <th className="text-left px-8 text-gray-700 text-2xl font-bold">
                    Email
                  </th>

                  <th className="text-left px-8 text-gray-700 text-2xl font-bold">
                    Status
                  </th>

                  <th className="text-center px-8 text-gray-700 text-2xl font-bold">
                    Action
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}
              <tbody>

                {users.length > 0 ? (

                  users.map((user) => (

                    <tr
                      key={user._id}
                      className="border-b hover:bg-gray-50 transition duration-300 h-[120px]"
                    >

                      {/* NAME */}
                      <td className="px-8">

                        <div className="flex items-center gap-5">

                          {/* USER ICON */}
                          <div className="w-[65px] h-[65px] rounded-full bg-indigo-500 text-white flex items-center justify-center text-3xl font-bold">

                            {user.name
                              ?.charAt(0)
                              .toUpperCase()}

                          </div>

                          {/* USER INFO */}
                          <div>

                            <h2 className="font-semibold text-gray-800 text-2xl">
                              {user.name}
                            </h2>

                            <p className="text-gray-500 mt-1">
                              User Account
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* EMAIL */}
                      <td className="px-8 text-gray-700 text-lg">
                        {user.email}
                      </td>

                      {/* STATUS */}
                      <td className="px-8">

                        <span
                          className={`px-5 py-2 rounded-full text-base font-semibold
                          
                          ${
                            user.isBlocked
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {user.isBlocked
                            ? "Blocked"
                            : "Active"}
                        </span>

                      </td>

                      {/* ACTION */}
                      <td className="px-8 text-center">

                        <button
                          onClick={() =>
                            deleteUser(user._id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white w-[130px] h-[50px] rounded-xl font-semibold shadow-md transition duration-300 text-lg"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center h-[400px] text-2xl text-gray-500"
                    >
                      No Users Found
                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
};

export default Users;