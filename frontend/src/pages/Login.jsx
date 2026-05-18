import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // FIRST SAVE TOKEN
      localStorage.setItem("token", data.token);

      alert("Login Successful");

      // THEN NAVIGATE
      navigate("/admin/dashboard");

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow-md w-[400px]">

        <h1 className="text-2xl font-bold text-center mb-5">
          Login
        </h1>

        {error && (
          <p className="text-red-500 mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 w-full"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2 w-full"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="bg-blue-500 text-white w-full p-2 rounded">
            Login
          </button>

          <div>
              <p className="mt-4 text-center">
          Already have account?

          <NavLink to="/register" className="text-blue-500 ml-2">
            Register
          </NavLink>
        </p>
          </div>
        </form>
        
      </div>
      
    </div>
  );
};

export default Login;