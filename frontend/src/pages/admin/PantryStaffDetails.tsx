import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PantryStaffDetails = () => {
  const { id } = useParams(); // Get pantry staff ID from the route
  const [pantryStaff, setPantryStaff] = useState(null);
  const navigate = useNavigate();

  const VITE_BACKEND_URL=import.meta.env.VITE_BACKEND_URL


  useEffect(() => {
    const fetchPantryStaffDetails = async () => {
      try {
        // Fetch pantry staff details
        const response = await axios.get(
          `${VITE_BACKEND_URL}/api/pantrystaff/${id}`
        );
        setPantryStaff(response.data);
      } catch (error) {
        console.error("Error fetching pantry staff details:", error);
      }
    };

    fetchPantryStaffDetails();
  }, [id]);

  if (!pantryStaff) {
    return <div>Loading pantry staff details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Pantry Staff Details</h1>
      <div className="border p-4 rounded-lg shadow-md">
        <img
          src={pantryStaff.img_url}
          alt={`${pantryStaff.name}'s profile`}
          className="w-32 h-32 rounded-full mb-4"
        />
        <p>
          <strong>Name:</strong> {pantryStaff.name}
        </p>
        <p>
          <strong>Phone:</strong> {pantryStaff.contact_info.phone}
        </p>
        <p>
          <strong>Email:</strong> {pantryStaff.contact_info.email}
        </p>
        <p>
          <strong>Location:</strong> {pantryStaff.location}
        </p>
        <p>
          <strong>Role:</strong> {pantryStaff.role}
        </p>
        <p>
          <strong>Assigned Tasks:</strong>{" "}
          {pantryStaff.assigned_tasks.length > 0
            ? pantryStaff.assigned_tasks.join(", ")
            : "No tasks assigned"}
        </p>
      </div>

      <button
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
        onClick={async () => {
          try {
            if (
              window.confirm(
                "Are you sure you want to delete this pantry staff member?"
              )
            ) {
              await axios.delete(
                `${VITE_BACKEND_URL}/api/pantrystaff/${id}`
              );
              alert("Pantry staff deleted successfully");
              navigate("/admin/pantrystaff"); // Redirect to the pantry staff list page
            }
          } catch (error) {
            console.error("Error deleting pantry staff:", error);
            alert("Failed to delete pantry staff");
          }
        }}
      >
        Delete Pantry Staff
      </button>
    </div>
  );
};

export default PantryStaffDetails;
