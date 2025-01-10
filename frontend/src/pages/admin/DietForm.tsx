import React, { useState } from "react";
import axios from "axios";

const DietChartForm = () => {
  const [patientId, setPatientId] = useState("");
  const [morningMeal, setMorningMeal] = useState("");
  const [morningIngredients, setMorningIngredients] = useState("");
  const [morningInstructions, setMorningInstructions] = useState("");
  const [eveningMeal, setEveningMeal] = useState("");
  const [eveningIngredients, setEveningIngredients] = useState("");
  const [eveningInstructions, setEveningInstructions] = useState("");
  const [nightMeal, setNightMeal] = useState("");
  const [nightIngredients, setNightIngredients] = useState("");
  const [nightInstructions, setNightInstructions] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dietChartData = {
      patient_id: patientId,
      meal_plan: {
        morning: {
          meal: morningMeal,
          ingredients: morningIngredients.split(","),
          instructions: morningInstructions,
        },
        evening: {
          meal: eveningMeal,
          ingredients: eveningIngredients.split(","),
          instructions: eveningInstructions,
        },
        night: {
          meal: nightMeal,
          ingredients: nightIngredients.split(","),
          instructions: nightInstructions,
        },
      },
      created_by: createdBy,
    };

    try {
      await axios.post("/api/diet-charts", dietChartData); // Adjust URL to your backend
      alert("Diet Chart added successfully");
    } catch (err) {
      setError("Failed to add Diet Chart");
    }
  };

  return (
    <div className="w-full p-16 bg-slate-100">
      <div className=" w-[800px] mx-auto border p-4 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl mb-4">Add Diet Chart</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Patient Name</label>
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Morning Meal */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Morning Meal</label>
            <input
              type="text"
              value={morningMeal}
              onChange={(e) => setMorningMeal(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Morning Ingredients (comma separated)
            </label>
            <input
              type="text"
              value={morningIngredients}
              onChange={(e) => setMorningIngredients(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Morning Instructions
            </label>
            <textarea
              value={morningInstructions}
              onChange={(e) => setMorningInstructions(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Evening Meal */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Evening Meal</label>
            <input
              type="text"
              value={eveningMeal}
              onChange={(e) => setEveningMeal(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Evening Ingredients (comma separated)
            </label>
            <input
              type="text"
              value={eveningIngredients}
              onChange={(e) => setEveningIngredients(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Evening Instructions
            </label>
            <textarea
              value={eveningInstructions}
              onChange={(e) => setEveningInstructions(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Night Meal */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Night Meal</label>
            <input
              type="text"
              value={nightMeal}
              onChange={(e) => setNightMeal(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Night Ingredients (comma separated)
            </label>
            <input
              type="text"
              value={nightIngredients}
              onChange={(e) => setNightIngredients(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Night Instructions
            </label>
            <textarea
              value={nightInstructions}
              onChange={(e) => setNightInstructions(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Created By */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Created By</label>
            <input
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full p-3 bg-Dblue hover:bg-blue-900 text-white rounded-lg"
          >
            Submit Diet Chart
          </button>
        </form>
      </div>
    </div>
  );
};

export default DietChartForm;
