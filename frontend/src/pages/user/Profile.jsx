import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import UserLayout from "../../layouts/UserLayout";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    profession: "",
    profileImage: "",
  });

  const [image, setImage] = useState(null);

  // ============================
  // GET PROFILE
  // ============================

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/user/profile", {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // HANDLE CHANGE
  // ============================

  const handleChange = (e) => {
    setUser({
      ...user,

      [e.target.name]: e.target.value,
    });
  };

  // ============================
  // HANDLE IMAGE
  // ============================

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // ============================
  // UPDATE PROFILE
  // ============================

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", user.name);

      formData.append("email", user.email);

      formData.append("phone", user.phone);

      formData.append("gender", user.gender);

      formData.append("dob", user.dob);

      formData.append("address", user.address);

      formData.append("profession", user.profession);

      if (image) {
        formData.append("profileImage", image);
      }

      const response = await fetch("http://localhost:8080/api/user/profile", {
        method: "PUT",

        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: formData,
      });

      await response.json();

      toast.success("Profile Updated Successfully");

      getProfile();
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // USE EFFECT
  // ============================

  useEffect(() => {
    getProfile();
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
            My Profile
          </h1>

          <p
            className="
            text-sm
            md:text-base
            text-gray-500
            mt-2
          "
          >
            Manage your profile information
          </p>
        </div>

        {/* ================= PROFILE CARD ================= */}

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-4
          sm:p-6
          lg:p-8
          w-full
        "
        >
          {/* ================= TOP PROFILE ================= */}

          <div
            className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            gap-5
            mb-8
            lg:mb-10
          "
          >
            {/* IMAGE */}
            <div className="flex justify-center sm:justify-start">
              <img
                src={
                  user?.profileImage
                    ? `http://localhost:8080/uploads/${user.profileImage}`
                    : "https://i.pravatar.cc/150"
                }
                alt="profile"
                className="
                w-24
                h-24
                sm:w-28
                sm:h-28
                rounded-full
                object-cover
                border-4
                border-black
              "
              />
            </div>

            {/* USER INFO */}
            <div className="text-center sm:text-left">
              <h2
                className="
                text-2xl
                sm:text-3xl
                font-bold
                text-gray-800
                wrap-break-words
              "
              >
                {user?.name}
              </h2>

              <p
                className="
                text-sm
                sm:text-base
                text-gray-500
                mt-2
                break-all
              "
              >
                {user?.email}
              </p>
            </div>
          </div>

          {/* ================= FORM ================= */}

          <form
            onSubmit={updateProfile}
            className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-5
            md:gap-6
          "
          >
            {/* NAME */}
            <div>
              <label
                className="
                block
                mb-2
                font-semibold
                text-sm
                md:text-base
              "
              >
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={user?.name}
                onChange={handleChange}
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
            </div>

            {/* EMAIL */}
            <div>
              <label
                className="
                block
                mb-2
                font-semibold
                text-sm
                md:text-base
              "
              >
                Email
              </label>

              <input
                type="email"
                name="email"
                value={user?.email}
                onChange={handleChange}
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
            </div>

            {/* PHONE */}
            <div>
              <label
                className="
                block
                mb-2
                font-semibold
                text-sm
                md:text-base
              "
              >
                Contact Number
              </label>

              <input
                type="text"
                name="phone"
                value={user?.phone}
                onChange={handleChange}
                className="w-full h-12.5 md:h-13.75 border border-gray-300
                rounded-xl px-4 outline-none focus:border-black text-sm md:text-base"
              />
            </div>

            {/* GENDER */}
            <div>
              <label className="block mb-2 font-semibold text-sm md:text-base">
                Gender
              </label>

              <select
                name="gender"
                value={user?.gender}
                onChange={handleChange}
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
                <option value="">Select Gender</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>
              </select>
            </div>

            {/* DOB */}
            <div>
              <label
                className="
                block
                mb-2
                font-semibold
                text-sm
                md:text-base
              "
              >
                Date Of Birth
              </label>

              <input
                type="date"
                name="dob"
                value={user?.dob}
                onChange={handleChange}
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
            </div>

            {/* PROFESSION */}
            <div>
              <label
                className="
                block
                mb-2
                font-semibold
                text-sm
                md:text-base
              "
              >
                Profession
              </label>

              <input
                type="text"
                name="profession"
                value={user?.profession}
                onChange={handleChange}
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
            </div>

            {/* ADDRESS */}
            <div className="lg:col-span-2">
              <label
                className="
                block
                mb-2
                font-semibold
                text-sm
                md:text-base
              "
              >
                Address
              </label>

              <textarea
                name="address"
                value={user?.address}
                onChange={handleChange}
                rows="4"
                className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-black
                text-sm
                md:text-base
                resize-none
              "
              />
            </div>

            {/* PROFILE IMAGE */}
            <div className="lg:col-span-2">
              <label
                className="
                block
                mb-2
                font-semibold
                text-sm
                md:text-base
              "
              >
                Profile Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                bg-white
                text-sm
                md:text-base
              "
              />
            </div>

            {/* BUTTON */}
            <div className="lg:col-span-2">
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
                text-sm
                md:text-lg
                font-semibold
                transition
              "
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
