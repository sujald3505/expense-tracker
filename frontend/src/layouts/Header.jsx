import React from "react";
import { NavLink, useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  return (
    <div >
      {/* {token && <NavLink to="/admindashboard">Admin Dashboard</NavLink>} */}

      {!token && (
        <>
          {/* <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink> */}
        </>
      )}

      {/* {token && (
        <button onClick={logout}>
          Logout
        </button>
      )} */}
    </div>
  );
};

export default Header;