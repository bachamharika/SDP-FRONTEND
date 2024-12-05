import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; 
import Navbar from "./Navbar";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:9999/admin/login",
        null,
        {
          params: {
            email,
            password,
          },
        }
      );

      if (response.status === 200) {
        alert(response.data); // Display the success message
        navigate("/admindashboard"); // Navigate to the admin dashboard
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
        <Navbar/>
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
            <h2 className="text-center mb-4 text-primary">Admin Login</h2>
            <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">
                Email
                </label>
                <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">
                Password
                </label>
                <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                />
            </div>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <div className="d-grid">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
                </button>
            </div>
            </form>
        </div>
        </div>
    </div>
  );
};

export default AdminLogin;
