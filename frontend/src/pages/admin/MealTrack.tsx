import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import InteractiveHoverButton from "@/components/magicui/interactive-hover-button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MealTrack = () => {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [patients, setPatients] = useState([]);
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch meal delivery data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealTrackResponse = await axios.get(
          `${VITE_BACKEND_URL}/api/mealdelivery/`
        );
        const patientResponse = await axios.get(
          `${VITE_BACKEND_URL}/api/patients/`
        );
        const deliveryPersonnelResponse = await axios.get(
          `${VITE_BACKEND_URL}/api/deliverypersonnel/`
        );

        setDeliveries(mealTrackResponse.data);
        setPatients(patientResponse.data);
        setDeliveryPersonnel(deliveryPersonnelResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full px-16 py-7 bg-slate-100 ">
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <div>
            <form
              className="flex items-center max-w-sm mx-auto"
              onSubmit={(e) => e.preventDefault()} // Prevent page refresh
            >
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full flex justify-center items-start">
                <input
                  type="text"
                  id="simple-search"
                  className="bg-white w-96 border border-gray-300 text-gray-900 text-sm  focus:outline-none outline-none rounded-lg block  ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search here..."
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-Dblue rounded-lg border border-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>
        </div>
        {/* <Link to="/admin/dietcharts/form">
          <InteractiveHoverButton
            text="Add Diet Charts"
            className="w-64 hover:bg-red"
          />
        </Link> */}
      </div>
      <div className="py-12">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table className="bg-white rounded-lg shadow-md">
            <TableCaption>All meal delivery data</TableCaption>
            <TableHeader className="h-20">
              <TableRow>
                <TableHead className="w-[100px]">Delivery ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Meal Type</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Delivery Status</TableHead>
                <TableHead>Delivery Timestamp</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.map((mealTrack, index) => {
                // Extract patient name based on patient_id
                const patientName = patients
                  .map((patient) =>
                    patient._id === mealTrack.patient_id ? patient.name : null
                  )
                  .filter((name) => name !== null)[0]; // Extract the first match

                // Extract delivery personnel name based on assigned personnel ID
                const deliveryPersonName = deliveryPersonnel
                  .map((person) =>
                    person._id === mealTrack.assigned_to ? person.name : null
                  )
                  .filter((name) => name !== null)[0]; // Extract the first match

                return (
                  <TableRow key={index}>
                    <TableCell>{mealTrack._id}</TableCell>
                    <TableCell>
                      <Link to={`/mealTrack/${mealTrack._id}`}>
                        {patientName || "Unknown"}
                      </Link>
                    </TableCell>
                    <TableCell>{mealTrack.meal_type}</TableCell>
                    <TableCell>
                      {deliveryPersonName || "Not Assigned"}
                    </TableCell>
                    <TableCell>{mealTrack.delivery_status}</TableCell>
                    <TableCell>{mealTrack.delivery_timestamp}</TableCell>
                    <TableCell>{mealTrack.notes}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default MealTrack;
