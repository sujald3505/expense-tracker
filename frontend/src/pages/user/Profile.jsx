import React, { useEffect, useState } from "react";

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

  // GET PROFILE
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

  // HANDLE CHANGE
  const handleChange = (e) => {
    setUser({
      ...user,

      [e.target.name]: e.target.value,
    });
  };

  // HANDLE IMAGE
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // UPDATE PROFILE
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

      const data = await response.json();

      alert(data.message);

      getProfile();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <UserLayout>
      <div className="w-full min-h-screen bg-gray-100 p-6">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Profile</h1>

          <p className="text-gray-500 mt-2">Manage your profile</p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl">
          {/* PROFILE TOP */}
          <div className="flex items-center gap-6 mb-10">
            <img
              src={
                user.profileImage
                  ? `http://localhost:8080/uploads/${user.profileImage}`
                  : "https://i.pravatar.cc/150"
              }
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-black"
            />

            <div>
              <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>

              <p className="text-gray-500 mt-1">{user.email}</p>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={updateProfile}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* NAME */}
            <div>
              <label className="block mb-2 font-semibold">Full Name</label>

              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full h-[55px] border rounded-xl px-4"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 font-semibold">Email</label>

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full h-[55px] border rounded-xl px-4"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block mb-2 font-semibold">Contact Number</label>

              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full h-[55px] border rounded-xl px-4"
              />
            </div>

            {/* GENDER */}
            <div>
              <label className="block mb-2 font-semibold">Gender</label>

              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="w-full h-[55px] border rounded-xl px-4"
              >
                <option value="">Select Gender</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>
              </select>
            </div>

            {/* DOB */}
            <div>
              <label className="block mb-2 font-semibold">Date Of Birth</label>

              <input
                type="date"
                name="dob"
                value={user.dob}
                onChange={handleChange}
                className="w-full h-[55px] border rounded-xl px-4"
              />
            </div>

            {/* PROFESSION */}
            <div>
              <label className="block mb-2 font-semibold">Profession</label>

              <input
                type="text"
                name="profession"
                value={user.profession}
                onChange={handleChange}
                className="w-full h-[55px] border rounded-xl px-4"
              />
            </div>

            {/* ADDRESS */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Address</label>

              <textarea
                name="address"
                value={user.address}
                onChange={handleChange}
                rows="4"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* PROFILE IMAGE */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Profile Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded-xl px-4 py-3 bg-white"
              />
            </div>

            {/* BUTTON */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full h-[55px] bg-black hover:bg-gray-800 text-white rounded-xl text-lg font-semibold transition"
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
