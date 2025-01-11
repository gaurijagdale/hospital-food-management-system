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

const PatientInfo = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch patient data
  useEffect(() => {
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
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(query)
    );
    setFilteredPatients(filtered);
  };

  return (
    <div className="w-full h-screen px-16 py-7 bg-slate-100">
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
                  value={searchQuery}
                  onChange={handleSearch}
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
          {/* <div>
            <button
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Dropdown hover{" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdownHover"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownHoverButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
        <Link to="/admin/patients/form">
          <InteractiveHoverButton text="Add Patients" className="w-52 hover:bg-red" />
        </Link>
      </div>
      <div className="py-12">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table className="w-full bg-white rounded-lg">
            <TableCaption>All patient data</TableCaption>
            <TableHeader>
              <TableRow className="h-16">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Contact Phone</TableHead>
                <TableHead>Contact Email</TableHead>
                <TableHead>Emergency Contact</TableHead>
                <TableHead>Room Details</TableHead>
                <TableHead>Diseases</TableHead>
                {/* <TableHead>Allergies</TableHead> */}
                {/* <TableHead>Notes</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <Link to={`/patient/${patient._id}`}>{patient.name}</Link>
                  </TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.contact_info.phone}</TableCell>
                  <TableCell>{patient.contact_info.email}</TableCell>
                  <TableCell>
                    {patient.emergency_contact.name} (
                    {patient.emergency_contact.phone})
                  </TableCell>
                  <TableCell>
                    Room: {patient.room_details.room_number}, Bed:{" "}
                    {patient.room_details.bed_number}, Floor:{" "}
                    {patient.room_details.floor_number}
                  </TableCell>
                  <TableCell>{patient.medical_info.diseases}</TableCell>
                  {/* <TableCell>{patient.medical_info.allergies}</TableCell> */}
                  {/* <TableCell>{patient.notes}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default PatientInfo;
