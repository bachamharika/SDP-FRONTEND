import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentDashboard from "./StudentDashboard";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ApplyApplication = () => {
  const [scholarships, setScholarships] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9999/student/notAppliedScholarships",
          { withCredentials: true }
        );
        setScholarships(response.data);
      } catch (error) {
        const errorMsg =
          error.response?.data?.message ||
          "Failed to fetch scholarships. Please try again later.";
        setErrorMessage(errorMsg);
      }
    };
    fetchScholarships();
  }, []);

  const applyForScholarship = async () => {
    if (!selectedFile || !selectedScholarship) {
      setErrorMessage("Please select a scholarship and upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("scholarshipId", selectedScholarship);
    formData.append("pdfFile", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:9999/student/submitApplication",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setSuccessMessage(response.data.message || "Application submitted successfully.");
      setScholarships(scholarships.filter((s) => s.id !== selectedScholarship));
      setSelectedFile(null);
      setSelectedScholarship(null);

      // Close the modal after successful submission
      setIsModalOpen(false); // Close the modal by updating the state
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error applying for scholarship.";
      setErrorMessage(errorMsg);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleApplyClick = (scholarshipId) => {
    setSelectedScholarship(scholarshipId);
    setIsModalOpen(true); // Open the modal when "Apply" is clicked
  };

  return (
    <div className="dashboard-container">
      <StudentDashboard />
      <div className="container">
        <h2 className="text-center">Available Scholarships</h2>
        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="alert alert-success text-center">{successMessage}</div>
        )}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.length > 0 ? (
              scholarships.map((scholarship, index) => (
                <tr key={scholarship.id}>
                  <td>{index + 1}</td>
                  <td>{scholarship.name}</td>
                  <td>{scholarship.description}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleApplyClick(scholarship.id)}
                    >
                      Apply
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No scholarships available to apply for.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="modal fade show"
            id="applyModal"
            tabIndex="-1"
            aria-labelledby="applyModalLabel"
            aria-hidden="true"
            style={{ display: 'block' }} // This style is used to make the modal visible
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="applyModalLabel">
                    Submit Application
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsModalOpen(false)} // Close modal on click of 'Close'
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Upload your PDF file to apply for the scholarship.</p>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)} // Close modal on click of 'Close'
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={applyForScholarship}
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyApplication;
