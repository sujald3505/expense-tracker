
import React, { useState } from "react";

import { toast } from "react-toastify";

import UserLayout from "../../layouts/UserLayout";

const Settings = () => {

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  // ============================
  // CHANGE PASSWORD
  // ============================

  const handleChangePassword =
    async (e) => {

      e.preventDefault();

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
            },
          );

        const data =
          await response.json();

        // ============================
        // WRONG PASSWORD
        // ============================

        if (!response.ok) {

          return toast.error(
            data.message ||
              "Current Password Incorrect"
          );
        }

        // SUCCESS
        toast.success(
          "Password Updated Successfully"
        );

        setCurrentPassword("");

        setNewPassword("");

      } catch (error) {

        console.log(error);

        toast.error(
          "Something went wrong"
        );
      }
    };

  return (

    <UserLayout>

      {/* ================= MAIN CONTAINER ================= */}

      <div
        className="
        w-full
        min-h-screen
        bg-gray-100
        p-4
        sm:p-6
      "
      >

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
            Settings
          </h1>

          <p
            className="
            text-sm
            sm:text-base
            text-gray-500
            mt-2
          "
          >
            Manage your account settings
          </p>

        </div>

        {/* ================= SETTINGS CARD ================= */}

        <div
          className="
          w-full
          max-w-3xl
          bg-white
          rounded-2xl
          shadow-lg
          p-4
          sm:p-6
          lg:p-8
        "
        >

          {/* CARD HEADER */}

          <div className="mb-6">

            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 ">

              Change Password

            </h2>

            <p className="text-sm sm:text-base text-gray-500 mt-2">

              Update your account password securely

            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={
              handleChangePassword
            }
            className="space-y-5"
          >

            {/* CURRENT PASSWORD */}

            <div>

              <label className="block mb-2 font-semibold text-sm sm:text-base text-gray-700">

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
                h-[50px]
                sm:h-[55px]
                border
                border-gray-300
                rounded-xl
                px-4
                outline-none
                focus:border-black
                text-sm
                sm:text-base
              "
                required
              />

            </div>

            {/* NEW PASSWORD */}

            <div>

              <label
                className="
                block
                mb-2
                font-semibold
                text-sm
                sm:text-base
                text-gray-700
              "
              >

                New Password

              </label>

              <input
                type="password"
                value={
                  newPassword
                }
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                placeholder="Enter new password"
                className="
                w-full
                h-[50px]
                sm:h-[55px]
                border
                border-gray-300
                rounded-xl
                px-4
                outline-none
                focus:border-black
                text-sm
                sm:text-base
              "
                required
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="
              w-full
              h-[50px]
              sm:h-[55px]
              bg-black
              hover:bg-gray-800
              text-white
              rounded-xl
              text-sm
              sm:text-lg
              font-semibold
              transition
            "
            >

              Update Password

            </button>

          </form>

        </div>

      </div>

    </UserLayout>
  );
};

export default Settings;