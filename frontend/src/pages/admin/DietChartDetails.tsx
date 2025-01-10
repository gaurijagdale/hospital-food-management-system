import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DietChartDetails = () => {
  const { id } = useParams(); // Get diet chart ID from the route
  const [dietChart, setDietChart] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null); // To store patient data
  const navigate = useNavigate(); // For navigation

  const VITE_BACKEND_URL=import.meta.env.VITE_BACKEND_URL


  useEffect(() => {
    const fetchDietChartDetails = async () => {
      try {
        // Fetch diet chart details
        const dietChartResponse = await axios.get(
          `${VITE_BACKEND_URL}/api/dietcharts/${id}`
        );
        const dietChartData = dietChartResponse.data;
        setDietChart(dietChartData);

        // Fetch patient details based on patient_id from diet chart
        const patientResponse = await axios.get(
          `${VITE_BACKEND_URL}/api/patients/${dietChartData.patient_id}`
        );
        setPatientDetails(patientResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDietChartDetails();
  }, [id]);

  if (!dietChart || !patientDetails) {
    return <div>Loading diet chart details...</div>;
  }

  const { meal_plan } = dietChart;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Diet Chart Details</h1>
      <div className="border p-4 rounded-lg shadow-md">
        <p>
          <strong>Diet Chart ID:</strong> {dietChart._id}
        </p>
        <p>
          <strong>Patient Name:</strong> {patientDetails.name}
        </p>
        <p>
          <strong>Patient Disease:</strong>{" "}
          {patientDetails.medical_info?.diseases || "Not specified"}
        </p>
        <p>
          <strong>Created By:</strong> {dietChart.created_by}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(dietChart.created_at).toLocaleString()}
        </p>
        <h2 className="text-lg font-semibold mt-4">Meal Plan</h2>
        <div className="mt-2">
          {["morning", "evening", "night"].map((time) => (
            <div key={time} className="mb-4">
              <h3 className="text-md font-semibold capitalize">{time}:</h3>
              <p>
                <strong>Meal:</strong> {meal_plan[time]?.meal || "Not specified"}
              </p>
              <p>
                <strong>Ingredients:</strong>{" "}
                {meal_plan[time]?.ingredients?.join(", ") || "Not specified"}
              </p>
              <p>
                <strong>Instructions:</strong>{" "}
                {meal_plan[time]?.instructions || "Not specified"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
        onClick={async () => {
          try {
            if (
              window.confirm(
                "Are you sure you want to delete this diet chart?"
              )
            ) {
              await axios.delete(
                `${VITE_BACKEND_URL}/api/dietcharts/${id}`
              );
              alert("Diet chart deleted successfully");
              navigate("/admin/dietcharts"); // Redirect to the diet chart list page
            }
          } catch (error) {
            console.error("Error deleting diet chart:", error);
            alert("Failed to delete diet chart");
          }
        }}
      >
        Delete Diet Chart
      </button>
    </div>
  );
};

export default DietChartDetails;
