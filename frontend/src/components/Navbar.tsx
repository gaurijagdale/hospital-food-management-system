import React from 'react';

const Navbar = () => {
  return (
    <div className='px-10 py-7 flex w-full justify-between bg-white text-black relative shadow-sm font-mono p-4'>
      <div className=''>Hospital Food Management System</div>
      <button className=''>Login</button>
    </div>
  );
};

export default Navbar;