import React, { useState } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

const PostScholarship = () => {
  const [scholarship, setScholarship] = useState({
    name: "",
    description: "",
    deadline: "",
    amount: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScholarship({ ...scholarship, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9999/admin/postScholarShip", scholarship);
      setSuccessMessage(response.data);
      setErrorMessage("");
      setScholarship({
        name: "",
        description: "",
        deadline: "",
        amount: "",
      });
    } catch (error) {
      setErrorMessage("Error posting scholarship. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <AdminDashboard />

        {/* Main Content Area */}
        <div className="col-md-9 col-lg-10 p-4">
          <div className="card shadow-lg border-light rounded">
            <div className="card-header bg-primary text-white text-center py-4">
              <h3>Post a New Scholarship</h3>
            </div>
            <div className="card-body">
              {/* Success and Error Messages */}
              {successMessage && (
                <div className="alert alert-success text-center">
                  <strong>Success!</strong> {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="alert alert-danger text-center">
                  <strong>Error!</strong> {errorMessage}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label text-dark">
                    Scholarship Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="name"
                    name="name"
                    value={scholarship.name}
                    onChange={handleChange}
                    placeholder="Enter scholarship name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="form-label text-dark">
                    Description
                  </label>
                  <textarea
                    className="form-control form-control-lg"
                    id="description"
                    name="description"
                    rows="5"
                    value={scholarship.description}
                    onChange={handleChange}
                    placeholder="Enter scholarship description"
                    required
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="deadline" className="form-label text-dark">
                      Deadline
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      id="deadline"
                      name="deadline"
                      value={scholarship.deadline}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label htmlFor="amount" className="form-label text-dark">
                      Amount
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      id="amount"
                      name="amount"
                      value={scholarship.amount}
                      onChange={handleChange}
                      placeholder="Enter scholarship amount"
                      required
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-warning btn-lg w-50">
                    Post Scholarship
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostScholarship;
