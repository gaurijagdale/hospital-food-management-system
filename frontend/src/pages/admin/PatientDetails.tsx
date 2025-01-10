import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PatientDetails = () => {
    console.log('inside PatientDetails');
  const { id } = useParams(); // Get patient ID from the route
  const [patient, setPatient] = useState(null);

  const VITE_BACKEND_URL=import.meta.env.VITE_BACKEND_URL


  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        console.log(id);
        const response = await axios.get(
          `${VITE_BACKEND_URL}/api/patients/${id}`
        );
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (!patient) {
    return <div>Loading patient details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Patient Details</h1>
      <div className="border p-4 rounded-lg shadow-md">
        <p>
          <strong>Name:</strong> {patient.name}
        </p>
        <p>
          <strong>Age:</strong> {patient.age}
        </p>
        <p>
          <strong>Gender:</strong> {patient.gender}
        </p>
        <p>
          <strong>Contact Phone:</strong> {patient.contact_info.phone}
        </p>
        <p>
          <strong>Contact Email:</strong> {patient.contact_info.email}
        </p>
        <p>
          <strong>Emergency Contact:</strong> {patient.emergency_contact.name} (
          {patient.emergency_contact.phone})
        </p>
        <p>
          <strong>Room Details:</strong> Room {patient.room_details.room_number}
          , Bed {patient.room_details.bed_number}, Floor{" "}
          {patient.room_details.floor_number}
        </p>
        <p>
          <strong>Diseases:</strong> {patient.medical_info.diseases}
        </p>
        <p>
          <strong>Allergies:</strong> {patient.medical_info.allergies}
        </p>
        <p>
          <strong>Notes:</strong> {patient.notes}
        </p>
      </div>
    <button
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
        onClick={async () => {
            try {
                if (window.confirm("Are you sure you want to delete this patient?")) {
                    await axios.delete(`${VITE_BACKEND_URL}/api/patients/${id}`);
                    alert("Patient deleted successfully");
                    window.location.href = "/admin/patients";
                }
                else {

                    window.location.href = `/patient/${id}`;
                }
                // Redirect or update the UI as needed
            } catch (error) {
                window.location.href = "/admin/patients";
                console.error("Error deleting patient:", error);
                alert("Failed to delete patient");
            }
        }}
    >
        Delete Patient
    </button>
    </div>
  );
};

export default PatientDetails;
