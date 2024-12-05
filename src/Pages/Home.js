import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css"; // Import custom CSS for background image
import Navbar from "./Navbar"

const Home = () => {
  return (
    <div>
    <Navbar />
    <div className="home-container vh-100 d-flex align-items-center justify-content-center text-center">
      <div className="overlay text-white px-4">
        <h1 className="display-3 fw-bold mb-4">Welcome to ScholarshipTracker</h1>
        <p className="lead mb-5">
          Track your applications, find opportunities, and achieve your dreams.
        </p>
        <a href="/scholarships" className="btn btn-primary btn-lg px-4 py-3">
          Explore Scholarships
        </a>
      </div>
    </div>
    </div>
  );
};

export default Home;
