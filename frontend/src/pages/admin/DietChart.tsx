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

const DietChartsInfo = () => {
  const [dietCharts, setDietCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [patients, setPatients] = useState([]);

  const VITE_BACKEND_URL=import.meta.env.VITE_BACKEND_URL
  console.log(VITE_BACKEND_URL)
  // Fetch diet chart data
  useEffect(() => {
    const fetchDietCharts = async () => {
      try {
        const response = await axios.get(
          `${VITE_BACKEND_URL}/api/dietcharts/`
        ); // Update the endpoint URL
        setDietCharts(response.data); // Assuming the response contains the diet charts data
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch diet charts data.");
        setLoading(false);
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/api/patients/`);
        setPatients(response.data); // Assuming the response contains the patients data
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch patients data.");
        setLoading(false);
      }
    };

    fetchPatients();

    fetchDietCharts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full px-16 py-7 h-screen bg-slate-100">
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
        <Link to="/admin/dietcharts/form">
          <InteractiveHoverButton text="Add Diet Charts" className="w-64 hover:bg-red" />
        </Link>
      </div>
      <div className="py-12">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table className="bg-white rounded-lg shadow-md">
            <TableCaption>Diet Charts</TableCaption>
            <TableHeader className="h-12">
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Created by</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>pid</TableHead>
                {/* <TableHead>Allergies</TableHead> */}
                {/* <TableHead>Notes</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {dietCharts.map((dietChart, index) => {
                const patientName = patients
                  .map((patient) =>
                    patient._id === dietChart.patient_id ? patient.name : null
                  )
                  .filter((name) => name !== null)[0]; // Extract the first match

                return (
                  <TableRow key={index}>
                    <TableCell>{dietChart._id}</TableCell>
                    <TableCell><Link to={`/dietChart/${dietChart._id}`}>{patientName || "Unknown"}</Link></TableCell>
                    <TableCell>{dietChart.created_by}</TableCell>
                    <TableCell>{dietChart.created_at}</TableCell>
                    <TableCell>{dietChart.patient_id}</TableCell>
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

export default DietChartsInfo;
