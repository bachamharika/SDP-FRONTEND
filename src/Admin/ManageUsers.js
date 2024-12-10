import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard"; // Import the AdminDashboard sidebar
import { Modal, Button, Form, InputGroup } from "react-bootstrap"; // Import Bootstrap Modal and Form components

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Store the selected user for modal
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:9999/admin/manageUsers");
      setUsers(response.data);
    } catch (err) {
      setError("Error fetching users");
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user); // Set the selected user to show in the modal
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:9999/admin/deleteUser/${id}`);
      fetchUsers(); // Reload users after deletion
    } catch (err) {
      setError("Error deleting user");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <AdminDashboard />
        <div className="col-md-9 col-lg-10 p-4">
          <h1 className="mb-4 text-primary">Manage Users</h1>

          {error && <p className="text-danger">{error}</p>}

          {/* Search Bar */}
          <div className="mb-4">
            <InputGroup>
              <Form.Control
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={handleSearch}
                className="form-control-lg"
              />
            </InputGroup>
          </div>

          <h3 className="mb-4">Users List</h3>

          {/* User Cards */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="col">
                <div className="card shadow-sm rounded">
                  {/* Image Display */}
                  <img
                    src={user.profileImage ? `data:image/jpeg;base64,${user.profileImage}` : "default-profile.png"}
                    alt="Profile"
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }} // Adjust to fit the card size
                  />
                  <div className="card-body">
                    <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                    <p className="card-text">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handleViewDetails(user)}
                      >
                        View Details
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for User Details */}
      {selectedUser && (
        <Modal
          show={true}
          onHide={() => setSelectedUser(null)}
          animation={true}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center mb-3">
              {/* Full-View Profile Image */}
              <img
                src={selectedUser.profileImage ? `data:image/jpeg;base64,${selectedUser.profileImage}` : "default-profile.png"}
                alt="Profile"
                className="img-fluid rounded-circle"
                style={{ maxWidth: "200px", height: "auto" }} // Full view with correct aspect ratio
              />
            </div>
            <h4 className="text-center">{selectedUser.firstName} {selectedUser.lastName}</h4>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.contactNumber}</p>
            <p><strong>Address:</strong> {selectedUser.address}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedUser(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ManageUsers;
