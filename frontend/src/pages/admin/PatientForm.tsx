import React, { useState } from "react";

interface ContactInfo {
  phone: string;
  email: string;
}

interface EmergencyContact {
  name: string;
  phone: string;
}

interface RoomDetails {
  room_number: number | string; // Use string if it's coming from an input field
  bed_number: number | string;
  floor_number: number | string;
}

interface MedicalInfo {
  diseases: string; // Comma-separated in the form
  allergies: string; // Comma-separated in the form
}

interface FormData {
  name: string;
  age: number | string; // Use string since it comes from input
  gender: "Male" | "Female" | "Other"; // Strict type for gender
  contact_info: ContactInfo;
  emergency_contact: EmergencyContact;
  room_details: RoomDetails;
  medical_info: MedicalInfo;
  notes: string;
}

const AddPatientForm = () => {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    contact_info: { phone: "", email: "" },
    emergency_contact: { name: "", phone: "" },
    room_details: { room_number: "", bed_number: "", floor_number: "" },
    medical_info: { diseases: "", allergies: "" },
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields
    const keys = name.split(".");
    if (keys.length > 1) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/api/patients/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          medical_info: {
            diseases: formData.medical_info.diseases.split(","),
            allergies: formData.medical_info.allergies.split(","),
          },
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Patient added successfully!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add patient.");
    }
  };

  return (
    <div className="bg-slate-100 w-full flex items-center justify-center p-16">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Patient</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <fieldset className="border-t border-gray-300 pt-4">
            <legend className="text-lg font-medium">Contact Info</legend>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="contact_info.phone"
                  value={formData.contact_info.phone}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="contact_info.email"
                  value={formData.contact_info.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="border-t border-gray-300 pt-4">
            <legend className="text-lg font-medium">Emergency Contact</legend>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="emergency_contact.name"
                  value={formData.emergency_contact.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="emergency_contact.phone"
                  value={formData.emergency_contact.phone}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="border-t border-gray-300 pt-4">
            <legend className="text-lg font-medium">Room Details</legend>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Room Number
                </label>
                <input
                  type="number"
                  name="room_details.room_number"
                  value={formData.room_details.room_number}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bed Number
                </label>
                <input
                  type="number"
                  name="room_details.bed_number"
                  value={formData.room_details.bed_number}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Floor Number
                </label>
                <input
                  type="number"
                  name="room_details.floor_number"
                  value={formData.room_details.floor_number}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="border-t border-gray-300 pt-4">
            <legend className="text-lg font-medium">Medical Info</legend>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Diseases (comma-separated)
              </label>
              <input
                type="text"
                name="medical_info.diseases"
                value={formData.medical_info.diseases}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Allergies (comma-separated)
              </label>
              <input
                type="text"
                name="medical_info.allergies"
                value={formData.medical_info.allergies}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
          </fieldset>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Patient
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;
