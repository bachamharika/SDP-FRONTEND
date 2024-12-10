import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard"; // Sidebar component

const ManageScholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const [newScholarship, setNewScholarship] = useState({
    name: "",
    description: "",
    deadline: "",
    amount: "",
  });
  const [editScholarship, setEditScholarship] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const response = await axios.get("http://localhost:9999/admin/manageScholarship");
      setScholarships(response.data);
    } catch (err) {
      setError("Error fetching scholarships");
    }
  };

  const handleAddScholarship = async () => {
    try {
      await axios.post("http://localhost:9999/admin/postScholarShip", newScholarship);
      setNewScholarship({ name: "", description: "", deadline: "", amount: "" });
      fetchScholarships();
    } catch (err) {
      setError("Error adding scholarship");
    }
  };

  const handleDeleteScholarship = async (id) => {
    try {
      await axios.delete(`http://localhost:9999/admin/deleteScholarship/${id}`);
      fetchScholarships();
    } catch (err) {
      setError("Error deleting scholarship");
    }
  };

  const handleEditScholarship = async () => {
    try {
      await axios.put(`http://localhost:9999/admin/updateScholarship/${editScholarship.id}`, editScholarship);
      setEditScholarship(null);
      fetchScholarships();
    } catch (err) {
      setError("Error updating scholarship");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <AdminDashboard />

        <div className="col-md-9 col-lg-10 p-4">
          <h1 className="mb-4 text-center text-primary">Manage Scholarships</h1>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Scholarship List</h3>
            <button className="btn btn-success" onClick={() => setEditScholarship({})}>
              Add New Scholarship
            </button>
          </div>

          <table className="table table-striped table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((scholarship) => (
                <tr key={scholarship.id}>
                  <td>{scholarship.name}</td>
                  <td>{scholarship.description}</td>
                  <td>{scholarship.deadline}</td>
                  <td>{scholarship.amount}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm mr-2"
                      onClick={() => setEditScholarship(scholarship)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteScholarship(scholarship.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit Scholarship Modal */}
          {editScholarship && (
            <div className="modal fade show" style={{ display: "block" }} aria-modal="true" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Scholarship</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setEditScholarship(null)}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group mb-3">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editScholarship.name}
                        onChange={(e) => setEditScholarship({ ...editScholarship, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Description</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editScholarship.description}
                        onChange={(e) => setEditScholarship({ ...editScholarship, description: e.target.value })}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Deadline</label>
                      <input
                        type="date"
                        className="form-control"
                        value={editScholarship.deadline}
                        onChange={(e) => setEditScholarship({ ...editScholarship, deadline: e.target.value })}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Amount</label>
                      <input
                        type="number"
                        className="form-control"
                        value={editScholarship.amount}
                        onChange={(e) => setEditScholarship({ ...editScholarship, amount: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-primary" onClick={handleEditScholarship}>
                      Save Changes
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setEditScholarship(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageScholarship;
