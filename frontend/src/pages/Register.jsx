import React, { useState } from "react";

import { Link, useNavigate } from "react-router";

import { toast } from "react-toastify";

import { User, Mail, Lock } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    // PASSWORD CHECK
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const response = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name,

          email: formData.email,

          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Registration Successful");

        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#edf2ff] overflow-hidden relative flex items-center justify-center px-4 py-10">
      {/* TOP LEFT CIRCLE */}
      <div className="absolute top-[-120px] left-[-120px] w-[280px] sm:w-[320px] h-[280px] sm:h-[320px] bg-pink-200 rounded-full opacity-50"></div>

      {/* BOTTOM RIGHT CIRCLE */}
      <div className="absolute bottom-[-150px] right-[-150px] w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] bg-blue-200 rounded-full opacity-40"></div>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center gap-10 relative z-10">
        {/* LEFT SIDE IMAGE */}
        <div className="hidden lg:flex justify-center">
          <div className="bg-white p-8 xl:p-10 rounded-3xl shadow-xl w-full max-w-lg">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/register-4488214-3723271.png"
              alt="register"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full max-w-xl mx-auto bg-transparent">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] mb-10 sm:mb-14 text-center lg:text-left">
            Register
          </h1>

          <form onSubmit={handleRegister} className="space-y-7 sm:space-y-8">
            {/* NAME */}
            <div>
              <label className="text-gray-600 block mb-3 text-sm sm:text-base">
                Name
              </label>

              <div className="flex items-center border-b border-gray-400 pb-3">
                <User size={20} className="text-gray-500 mr-4 flex-shrink-0" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-base sm:text-lg placeholder-gray-400"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-gray-600 block mb-3 text-sm sm:text-base">
                Email
              </label>

              <div className="flex items-center border-b border-gray-400 pb-3">
                <Mail size={20} className="text-gray-500 mr-4 flex-shrink-0" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-base sm:text-lg placeholder-gray-400"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-gray-600 block mb-3 text-sm sm:text-base">
                Password
              </label>

              <div className="flex items-center border-b border-gray-400 pb-3">
                <Lock size={20} className="text-gray-500 mr-4 flex-shrink-0" />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-base sm:text-lg placeholder-gray-400"
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-gray-600 block mb-3 text-sm sm:text-base">
                Confirm Password
              </label>

              <div className="flex items-center border-b border-gray-400 pb-3">
                <Lock size={20} className="text-gray-500 mr-4 flex-shrink-0" />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-base sm:text-lg placeholder-gray-400"
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-6">
              <p className="text-gray-600 text-center sm:text-left text-sm sm:text-base">
                Already have account?
                <Link
                  to="/login"
                  className="text-indigo-600 font-semibold ml-2 hover:underline"
                >
                  Login
                </Link>
              </p>

              <button
                type="submit"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-10 sm:px-12 py-3 rounded-lg font-bold shadow-lg transition duration-300"
              >
                REGISTER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
