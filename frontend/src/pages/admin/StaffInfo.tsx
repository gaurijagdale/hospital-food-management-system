import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StaffInfo = () => {
  const [pantryStaff, setPantryStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const VITE_BACKEND_URL=import.meta.env.VITE_BACKEND_URL


  useEffect(() => {
    const fetchPantryStaff = async () => {
      try {
        const response = await axios.get(
          `${VITE_BACKEND_URL}/api/pantrystaff/`
        );
        setPantryStaff(response.data); // Assuming the response contains the pantry staff data
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch pantry staff data.");
        setLoading(false);
      }
    };

    fetchPantryStaff();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full px-16 py-7">
      <div>Search</div>
      <div
        id="profiles"
        className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-6 mt-5"
      >
        {pantryStaff.map((staff) => (
          <div
            key={staff._id}
            className="col-span-1 h-full bg-white flex items-center justify-start rounded-md p-6 space-x-6 border"
          >
            <img
              className="w-28 h-28 rounded-full p-1 border-4 border-indigo-400"
              src={staff.img_url || "/default-image.jpg"}
              alt={`${staff.name}'s profile`}
            />
            <div className="flex flex-col space-y-2">
              <div>
                <Link to={`/pantrystaff/${staff._id}`}>
                  <h2 className="text-lg font-semibold text-blue-700 cursor-pointer hover:underline">
                    {staff.name}
                  </h2>
                </Link>
                <p className="text-s">{staff.contact_info.email}</p>
                <p className="text-s">{staff.contact_info.phone}</p>
              </div>
              <div>
                <p className="text-m">{staff.role}</p>
                <p className="text-b">{staff.assigned_tasks.join(", ")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffInfo;
