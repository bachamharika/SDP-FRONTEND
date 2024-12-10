import React, { useEffect, useState } from 'react';
import api from './api'; // Assuming you're using the axios setup
import { Button, Table, Modal } from 'react-bootstrap';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';
import AdminDashboard from './AdminDashboard';

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [pdfFileUrl, setPdfFileUrl] = useState(null);

  useEffect(() => {
    // Fetch all scholarships on component mount
    api.get('/manageScholarship')
      .then(response => {
        setScholarships(response.data);
      })
      .catch(error => console.error('Error fetching scholarships:', error));
  }, []);

  const fetchApplications = (scholarshipId) => {
    // Fetch applications for a specific scholarship
    api.get(`/${scholarshipId}/applications`)
      .then(response => {
        setApplications(response.data);
        setSelectedScholarship(scholarships.find(s => s.id === scholarshipId));
        setShowApplicationModal(true);
      })
      .catch(error => console.error('Error fetching applications:', error));
  };

  const updateApplicationStatus = (applicationId, status) => {
    // Update the application status (approve/reject)
    api.put(`/applications/${applicationId}/status`, null, {
      params: { status }
    })
      .then(response => {
        alert(response.data);
        fetchApplications(selectedScholarship.id); // Refresh applications list
      })
      .catch(error => console.error('Error updating application status:', error));
  };

  const handlePdfView = (applicationId) => {
    // Fetch the PDF file for the application
    api.get(`/${applicationId}/pdf`, { responseType: 'blob' })
      .then(response => {
        const pdfBlob = URL.createObjectURL(response.data); // Convert PDF blob to URL
        setPdfFileUrl(pdfBlob); // Set the Blob URL to display the PDF
      })
      .catch(error => console.error('Error fetching PDF:', error));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <AdminDashboard />

        {/* Main Content Area */}
        <div className="col-md-9 col-lg-10 p-4">
          <h1 className="text-center mb-4 text-primary">Manage Scholarships</h1>

          {/* Scholarships Table */}
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map(scholarship => (
                <tr key={scholarship.id}>
                  <td>{scholarship.name}</td>
                  <td>{scholarship.amount} Rs</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => fetchApplications(scholarship.id)}
                    >
                      View Applications
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Application Modal */}
          {selectedScholarship && (
            <Modal show={showApplicationModal} onHide={() => setShowApplicationModal(false)} size="lg" centered>
              <Modal.Header closeButton>
                <Modal.Title>Applications for {selectedScholarship.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Applications Table */}
                <Table striped bordered hover responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Student Name</th>
                      <th>Status</th>
                      <th>Document</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(application => (
                      <tr key={application.id}>
                        <td>{application.student.firstName} {application.student.lastName}</td>
                        <td>{application.status}</td>
                        <td>
                          <Button
                            variant="info"
                            onClick={() => handlePdfView(application.id)} // Trigger the PDF view
                          >
                            View Document
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="success"
                            className="mr-2"
                            onClick={() => updateApplicationStatus(application.id, 'approved')}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => updateApplicationStatus(application.id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {/* Display PDF */}
                {pdfFileUrl && (
                  <div>
                    <h5>PDF Preview:</h5>
                    <div style={{ height: '500px' }}>
                      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={pdfFileUrl} />
                      </Worker>
                    </div>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowApplicationModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageScholarships;
