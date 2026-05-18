import React, { useState } from "react";
import { useNavigate, Link } from "react-router";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  async function registerUser() {
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/register",
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

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {
      alert(error.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await registerUser();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-[400px]">

        <h1 className="text-2xl font-bold text-center mb-5">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border p-2 w-full"
              value={formData.name}
              onChange={handleChange}
            />
            <p className="text-red-500 text-sm">{errors.name}</p>
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 w-full"
              value={formData.email}
              onChange={handleChange}
            />
            <p className="text-red-500 text-sm">{errors.email}</p>
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 w-full"
              value={formData.password}
              onChange={handleChange}
            />
            <p className="text-red-500 text-sm">{errors.password}</p>
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="border p-2 w-full"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <p className="text-red-500 text-sm">
              {errors.confirmPassword}
            </p>
          </div>

          <button className="bg-blue-500 text-white w-full p-2 rounded">
            Register
          </button>

        </form>

        <p className="mt-4 text-center">
          Already have account?

          <Link to="/login" className="text-blue-500 ml-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
