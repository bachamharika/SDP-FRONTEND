import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/adminlogin");
  };

  return (
    <div className="col-md-3 col-lg-2 p-3 bg-dark text-white min-vh-100">
      <h3 className="text-center bg-info mb-4">Admin Dashboard</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/users" className="nav-link text-white">
            Manage Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/postScholarShip" className="nav-link text-white">
            Post ScholarShips
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/allScholarShip" className="nav-link text-white">
            Manage ScholarShips
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/viewApplications" className="nav-link text-white">
            View Applications
          </Link>
        </li>
        <li className="nav-item mt-5">
          <button onClick={handleLogout} className="btn btn-danger w-100">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
