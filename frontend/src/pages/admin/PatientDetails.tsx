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
    <div className=" w-full flex flex-col justify-center items-center px-16 py-16 bg-slate-100 ">
      {/* <h1 className="text-2xl font-bold mb-6"> {patient.name}</h1> */}
      <div className="flex flex-col justify-center border p-8 rounded-lg shadow-md space-y-3 w-[800px] bg-white">
        <p>
          <strong className="text-2xl font-semibold mb-6">{patient.name}</strong> 
        </p>
        <p className="text-md text-gray-600">
          <strong className="">Age:</strong> {patient.age}
        </p>
        <p className="text-md text-gray-600">
          <strong>Gender:</strong> {patient.gender}
        </p>
        <p className="text-md text-gray-600">
          <strong>Contact Phone:</strong> {patient.contact_info.phone}
        </p>
        <p className="text-md text-gray-600">
          <strong>Contact Email:</strong> {patient.contact_info.email}
        </p>
        <p className="text-md text-gray-600">
          <strong>Emergency Contact:</strong> {patient.emergency_contact.name} (
          {patient.emergency_contact.phone})
        </p>
        <p className="text-md text-gray-600">
          <strong>Room Details:</strong> Room {patient.room_details.room_number}
          , Bed {patient.room_details.bed_number}, Floor{" "}
          {patient.room_details.floor_number}
        </p>
        <p className="text-md text-gray-600">
          <strong>Diseases:</strong> {patient.medical_info.diseases}
        </p>
        <p className="text-md text-gray-600">
          <strong>Allergies:</strong> {patient.medical_info.allergies}
        </p>
        <p className="text-md text-gray-600">
          <strong>Notes:</strong> {patient.notes}
        </p>
      </div>
    <button
        className="mt-4 text-start bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
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
