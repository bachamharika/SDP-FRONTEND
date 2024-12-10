import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/adminlogin");
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      {/* Header */}
      <div className="bg-info text-dark py-5 mb-4 shadow rounded">
        <h3 className="text-center">Admin Dashboard</h3>
      </div>

      {/* Navigation Links */}
      <div className="d-flex flex-column flex-grow-1">
        <nav className="nav flex-column">
          <Link
            to="/admin/users"
            className="btn btn-outline-light mb-3 w-100 text-start py-3 rounded-pill hover-shadow"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/postScholarShip"
            className="btn btn-outline-light mb-3 w-100 text-start py-3 rounded-pill hover-shadow"
          >
            Post Scholarships
          </Link>
          <Link
            to="/admin/allScholarShip"
            className="btn btn-outline-light mb-3 w-100 text-start py-3 rounded-pill hover-shadow"
          >
            Manage Scholarships
          </Link>
          <Link
            to="/admin/viewApplications"
            className="btn btn-outline-light mb-3 w-100 text-start py-3 rounded-pill hover-shadow"
          >
            View Applications
          </Link>
        </nav>
      </div>

      {/* Footer (Logout Button) */}
      <div className="mt-auto bg-success">
        <button
          onClick={handleLogout}
          className="btn btn-danger w-100 py-3 rounded-pill shadow-lg hover-shadow"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
