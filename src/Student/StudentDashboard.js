import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentDashboard.css"; 

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState("applyScholarship");
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the profile data when the component mounts
    axios.get("http://localhost:9999/student/getProfile", { withCredentials: true })
      .then(response => {
        if (response.data && response.data.profileImage) {
          // Assuming the profile image is returned as a base64-encoded string
          setProfileImage(`data:image/jpeg;base64,${response.data.profileImage}`);
        }
      })
      .catch(err => console.error("Error fetching profile image:", err));
  }, []);

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        {/* Profile image in the sidebar */}
        <div className="sidebar-image-container">
          <img
            src={profileImage || "https://via.placeholder.com/150"} // Fallback to a placeholder if no image is found
            alt="Student Profile"
            className="sidebar-profile-image"
          />
        </div>
        
        <h2 className="sidebar-title">Student Dashboard</h2>
        <ul className="sidebar-links">
          <li>
            <Link
              to="/viewApplications"
              className={`sidebar-link ${activeSection === "applyScholarship" ? "active" : ""}`}
              onClick={() => handleNavigation("applyScholarship")}
            >
              View Scholarships
            </Link>
          </li>
          <li>
            <Link
              to="/studentApplication"
              className={`sidebar-link ${activeSection === "myApplications" ? "active" : ""}`}
            >
              Apply Scholarships
            </Link>
          </li>
          <li>
            <Link
              to="/updateProfile"
              className={`sidebar-link ${activeSection === "profile" ? "active" : ""}`}
              onClick={() => handleNavigation("profile")}
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link to="/login" className="sidebar-link" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
