import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import StudentDashboard from "./StudentDashboard";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9999/student/AppliedScholarships",
          { withCredentials: true }
        );
        setApplications(response.data);
      } catch (error) {
        const errorMsg =
          error.response?.data?.message || "Failed to fetch applications. Please try again later.";
        setErrorMessage(errorMsg);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="dashboard-container">
      <StudentDashboard />
    <div className="container">
      <h2 className="text-center my-4">My Scholarship Applications</h2>
      {errorMessage && (
        <div className="alert alert-danger text-center">{errorMessage}</div>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Scholarship Name</th>
            <th>Application Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((application, index) => (
              <tr key={application.id}>
                <td>{index + 1}</td>
                <td>{application.scholarship.name}</td>
                <td>
                  {application.status ? application.status : "In Process"}
                </td>
                <td>
                  {/* You can add any additional actions if needed, e.g. view details */}
                  <button className="btn btn-info">View Details</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                You have not applied for any scholarships.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default MyApplications;