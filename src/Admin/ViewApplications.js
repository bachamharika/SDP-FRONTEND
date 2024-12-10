import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Spinner } from "react-bootstrap";
import axios from "axios";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";

const ViewApplication = ({ showModal, onClose, applicationId }) => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfFileUrl, setPdfFileUrl] = useState(null);

  useEffect(() => {
    if (applicationId) {
      fetchApplicationDetails(applicationId);
    }
  }, [applicationId]);

  // Fetch application details
  const fetchApplicationDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9999/applications/${id}`);
      setApplication(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching application details:", error);
      setLoading(false);
    }
  };

  // Fetch the PDF document for the application
  const fetchPdfDocument = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9999/applications/${id}/pdf`, {
        responseType: "blob",
      });
      const pdfBlob = URL.createObjectURL(response.data);
      setPdfFileUrl(pdfBlob);
    } catch (error) {
      console.error("Error fetching PDF document:", error);
    }
  };

  const handleViewPdf = () => {
    if (application) {
      fetchPdfDocument(application.id);
    }
  };

  return (
    <Modal show={showModal} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Application Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <h5>Applicant Information</h5>
            <Table striped bordered responsive>
              <tbody>
                <tr>
                  <td><strong>Name</strong></td>
                  <td>{application.student.firstName} {application.student.lastName}</td>
                </tr>
                <tr>
                  <td><strong>Email</strong></td>
                  <td>{application.student.email}</td>
                </tr>
                <tr>
                  <td><strong>Phone</strong></td>
                  <td>{application.student.contactNumber}</td>
                </tr>
                <tr>
                  <td><strong>Address</strong></td>
                  <td>{application.student.address}</td>
                </tr>
                <tr>
                  <td><strong>Scholarship Name</strong></td>
                  <td>{application.scholarship.name}</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td>{application.status}</td>
                </tr>
              </tbody>
            </Table>

            <Button variant="info" onClick={handleViewPdf}>
              View Document
            </Button>

            {/* Display PDF Preview */}
            {pdfFileUrl && (
              <div className="mt-4">
                <h5>PDF Document</h5>
                <div style={{ height: "500px" }}>
                  <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={pdfFileUrl} />
                  </Worker>
                </div>
              </div>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewApplication;
