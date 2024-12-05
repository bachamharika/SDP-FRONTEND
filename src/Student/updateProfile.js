import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentDashboard from "./StudentDashboard";

const UpdateProfile = () => {
  // State to hold form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(""); // To display current student image

  // State for success/error messages
  const [message, setMessage] = useState("");

  // Function to handle image change
  const handleImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("contactNumber", contactNumber);
    formData.append("address", address);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await axios.put(
        "http://localhost:9999/student/updateProfile", // Use your backend URL here
        formData,
        { withCredentials: true }
      );

      setMessage({ type: "success", text: response.data });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response ? error.response.data : "Something went wrong!",
      });
    }
  };

  // Fetch the current user data on component mount (if necessary)
  useEffect(() => {
    axios.get("http://localhost:9999/student/getProfile", { withCredentials: true })
      .then(response => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setContactNumber(response.data.contactNumber);
        setAddress(response.data.address);
        setCurrentImage(`data:image/jpeg;base64,${response.data.profileImage}`); // Assuming profileImage is a base64 string
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <StudentDashboard />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className="card-header text-center bg-primary text-white">
                <h3>Update Profile</h3>
              </div>
              <div className="card-body">
                {message && (
                  <div className={`alert alert-${message.type === "success" ? "success" : "danger"}`}>
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="text-center mb-4">
                    {currentImage ? (
                      <img
                        src={currentImage}
                        alt="Profile"
                        className="img-fluid rounded-circle"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                      />
                    ) : (
                      <img
                        src="https://via.placeholder.com/150"
                        alt="Profile Placeholder"
                        className="img-fluid rounded-circle"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                      />
                    )}
                  </div>

                  {/* Row for first name and last name */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Row for contact number and address */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                      <input
                        type="text"
                        id="contactNumber"
                        className="form-control"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="address" className="form-label">Address</label>
                      <input
                        type="text"
                        id="address"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="profileImage" className="form-label">Profile Image</label>
                    <input
                      type="file"
                      id="profileImage"
                      className="form-control"
                      onChange={handleImageChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">Update Profile</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
