import React from 'react'
import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <div className='w-64 h-screen flex flex-col items-center space-y-7 p-8 text-black border-r shadow-md fixed '>
        {/* <div>Heading</div> */}
        <div className='flex flex-col space-y-4 items-center'>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/patients">Patients</Link>
            <Link to="/admin/dietcharts">Dietcharts</Link>
            <Link to="/admin/pantrystaff">Pantry Staff</Link>
            <Link to="/admin/mealtrack">Meal Track</Link>
        </div>
    </div>
  )
}

export default AdminNav
