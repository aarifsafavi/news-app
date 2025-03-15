import React from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "./user.jpg";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            <b>News App</b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Profile Picture and Logout Button */}
            <div className="d-flex align-items-center ms-auto">
              <img
                src={profilePic} // Use your profile picture source
                alt="Profile"
                className="rounded-circle mx-2"
                style={{ width: "40px", height: "40px" }}
              />
              <button
                className="btn btn-outline-primary me-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
