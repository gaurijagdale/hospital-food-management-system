import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AdminNav from './components/AdminNav';
import Navbar from './components/Navbar';
import Dashboard from './pages/admin/Dashboard';
import DietChart from './pages/admin/DietChart';
import StaffInfo from './pages/admin/StaffInfo';
import PatientInfo from './pages/admin/PatientInfo';
import MealTrack from './pages/admin/MealTrack';
import Footer from './components/Footer';
import PatientForm from './pages/admin/PatientForm';
import PatientDetails from './pages/admin/PatientDetails';
import DietChartDetails from './pages/admin/DietChartDetails';
import PantryStaffDetails from './pages/admin/PantryStaffDetails';

const App = () => {

  const location = useLocation(); // Get the current route

  return (
    <>
        {location.pathname !== '/login' && <Navbar />}
      <div className='flex'>
      <AdminNav/>
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/dietcharts" element={<DietChart />} />
          <Route path="/admin/pantrystaff" element={<StaffInfo />} />
          <Route path="/admin/patients" element={<PatientInfo />} />
          <Route path="/admin/mealtrack" element={<MealTrack />} />
          <Route path="/admin/patients/form" element={<PatientForm />} />
          <Route path="/patient/:id" element={<PatientDetails />} />
          <Route path="/dietChart/:id" element={<DietChartDetails />} />
          <Route path="/pantryStaff/:id" element={<PantryStaffDetails />} />

        </Routes>
      </div>
      {location.pathname !== '/login' && <Footer />}
    </>
  )
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper
