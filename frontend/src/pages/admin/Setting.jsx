import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import AdminLayout from "../../layouts/AdminLayout";

const Settings = () => {

  // ============================
  // PROFILE STATES
  // ============================

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  // ============================
  // PASSWORD STATES
  // ============================

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  // ============================
  // GET ADMIN PROFILE
  // ============================

  const getProfile = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await fetch(
          "http://localhost:8080/api/user/profile",
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await response.json();

      if (response.ok) {

        setName(data.user?.name || "");

        setEmail(data.user?.email || "");

        setPhone(data.user?.phone || "");
      }

    } catch (error) {

      console.log(error);
    }
  };

  // ============================
  // UPDATE PROFILE
  // ============================

  const handleUpdateProfile =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            "http://localhost:8080/api/user/profile",
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({
                name,
                email,
                phone,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          return toast.error(
            data.message ||
            "Profile Update Failed"
          );
        }

        toast.success(
          data.message ||
          "Profile Updated Successfully"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Something went wrong"
        );
      }
    };

  // ============================
  // CHANGE PASSWORD
  // ============================

  const handleChangePassword =
    async (e) => {

      e.preventDefault();

      // PASSWORD MATCH CHECK

      if (
        newPassword !==
        confirmPassword
      ) {

        return toast.error(
          "New Password and Confirm Password do not match"
        );
      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            "http://localhost:8080/api/user/change-password",
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({
                currentPassword,
                newPassword,
              }),
            }
          );

        const data =
          await response.json();

        // ERROR

        if (!response.ok) {

          return toast.error(
            data.message ||
            "Password Change Failed"
          );
        }

        // SUCCESS

        toast.success(
          data.message ||
          "Password Updated Successfully"
        );

        setCurrentPassword("");

        setNewPassword("");

        setConfirmPassword("");

      } catch (error) {

        console.log(error);

        toast.error(
          "Something went wrong"
        );
      }
    };

  // ============================
  // USE EFFECT
  // ============================

  useEffect(() => {

    getProfile();

  }, []);

  return (

    <AdminLayout>

      <div
        className="
        w-full
        min-h-screen
        bg-gray-100
        p-4
        sm:p-6
      "
      >

        {/* HEADER */}

        <div className="mb-8">

          <h1
            className="
            text-3xl
            sm:text-4xl
            font-bold
            text-gray-800
          "
          >
            Admin Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage admin account settings
          </p>

        </div>

        {/* MAIN GRID */}

        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        "
        >

          {/* PROFILE CARD */}

          <div
            className="
            bg-white
            rounded-2xl
            shadow-lg
            p-6
          "
          >

            <div className="mb-6">

              <h2 className="text-2xl font-bold text-gray-800">
                Admin Profile
              </h2>

              <p className="text-gray-500 mt-1">
                Update admin information
              </p>

            </div>

            <form
              onSubmit={
                handleUpdateProfile
              }
              className="space-y-5"
            >

              {/* NAME */}

              <div>

                <label className="block mb-2 font-semibold text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  placeholder="Enter name"
                  className="
                  w-full
                  h-[55px]
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  outline-none
                  focus:border-black
                "
                  required
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="block mb-2 font-semibold text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Enter email"
                  className="
                  w-full
                  h-[55px]
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  outline-none
                  focus:border-black
                "
                  required
                />

              </div>

              {/* PHONE */}

              <div>

                <label className="block mb-2 font-semibold text-gray-700">
                  Phone
                </label>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  placeholder="Enter phone"
                  className="
                  w-full
                  h-[55px]
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  outline-none
                  focus:border-black
                "
                />

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                className="
                w-full
                h-[55px]
                bg-blue-600
                hover:bg-blue-700
                text-white
                rounded-xl
                font-semibold
                transition
              "
              >
                Update Profile
              </button>

            </form>

          </div>

          {/* PASSWORD CARD */}

          <div
            className="
            bg-white
            rounded-2xl
            shadow-lg
            p-6
          "
          >

            <div className="mb-6">

              <h2 className="text-2xl font-bold text-gray-800">
                Change Password
              </h2>

              <p className="text-gray-500 mt-1">
                Update admin password securely
              </p>

            </div>

            <form
              onSubmit={
                handleChangePassword
              }
              className="space-y-5"
            >

              {/* CURRENT PASSWORD */}

              <div>

                <label className="block mb-2 font-semibold text-gray-700">
                  Current Password
                </label>

                <input
                  type="password"
                  value={
                    currentPassword
                  }
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter current password"
                  className="
                  w-full
                  h-[55px]
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  outline-none
                  focus:border-black
                "
                  required
                />

              </div>

              {/* NEW PASSWORD */}

              <div>

                <label className="block mb-2 font-semibold text-gray-700">
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter new password"
                  className="
                  w-full
                  h-[55px]
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  outline-none
                  focus:border-black
                "
                  required
                />

              </div>

              {/* CONFIRM PASSWORD */}

              <div>

                <label className="block mb-2 font-semibold text-gray-700">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={
                    confirmPassword
                  }
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Confirm new password"
                  className="
                  w-full
                  h-[55px]
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  outline-none
                  focus:border-black
                "
                  required
                />

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                className="
                w-full
                h-[55px]
                bg-black
                hover:bg-gray-800
                text-white
                rounded-xl
                font-semibold
                transition
              "
              >
                Update Password
              </button>

            </form>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
};

export default Settings;