import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    // EMPTY FIELD VALIDATION
    if (!email.trim() || !password.trim()) {
      return toast.error("Email and Password are required");
    }

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email");
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/user/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Login Successful");

        localStorage.setItem("token", data.token);

        // USER LOGIN
        if (data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );

          if (data.user.role === "ADMIN") {
            navigate("/admin/dashboard");
          } else {
            navigate("/user/dashboard");
          }
        }

        // STATIC ADMIN LOGIN
        else if (data.role === "admin") {
          navigate("/admin/dashboard");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#edf2ff] overflow-hidden relative flex items-center justify-center px-5">
      {/* TOP LEFT CIRCLE */}
      <div className="absolute top-30 left-30 w-75 h-75 bg-purple-200 rounded-full opacity-50"></div>

      {/* BOTTOM RIGHT CIRCLE */}
      <div className="absolute bottom-37.5 right-37.5 w-87.5 h-87.5 bg-blue-200 rounded-full opacity-40"></div>

      {/* CONTAINER */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center gap-10 z-10">
        {/* LEFT SIDE */}
        <div className="w-full max-w-xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight text-center lg:text-left">
            Login
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-indigo-600 font-semibold tracking-wide text-center lg:text-left">
            Continue Tracking Your Expenses
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-10 mt-10"
          >
            {/* EMAIL */}
            <div>
              <label className="text-gray-600 block mb-3">
                Email
              </label>

              <div className="flex items-center border-b border-gray-400 pb-3">
                <Mail size={22} className="text-gray-500 mr-4" />

                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full bg-transparent outline-none text-lg placeholder-gray-400"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-gray-600 block mb-3">
                Password
              </label>

              <div className="flex items-center border-b border-gray-400 pb-3">
                <Lock size={22} className="text-gray-500 mr-4" />

                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full bg-transparent outline-none text-lg placeholder-gray-400"
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-5">
              <p className="text-gray-600">
                Not Registered Yet?
                <Link
                  to="/register"
                  className="text-indigo-600 font-semibold ml-2 hover:underline"
                >
                  Register
                </Link>
              </p>

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-3 rounded-lg font-bold shadow-lg transition duration-300"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex justify-center">
          <div className="bg-white p-10 rounded-3xl shadow-xl">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/expense-tracker-4488213-3723270.png"
              alt="login"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;