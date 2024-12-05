import React from "react";
import { Link } from "react-router-dom"; // Corrected import
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css"; // Import custom CSS for additional styling

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar shadow-lg">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <i className="bi bi-mortarboard-fill fs-2 me-2 text-gold"></i>
          <span className="fs-3 text-gradient">ScholarshipTracker</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link fs-5 text-hover-light" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5 text-hover-light" to="/scholarships">
                Scholarships
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5 text-hover-light" to="/applications">
                Contact us
              </Link>
            </li>
            
            <li className="nav-item">
              <Link
                className="btn btn-gold px-4 py-2 fw-bold text-dark shadow-sm"
                to="/login"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="btn btn-gold px-4 py-2 fw-bold text-dark shadow-sm"
                to="/adminlogin"
              >
                AdminLogin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
