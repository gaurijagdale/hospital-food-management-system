import React from "react";

const Dashboard = () => {
  return (
    <div className="px-16 py-7 ">
      <div className="grid grid-cols-3 w-full gap-x-10">
        <div className="col-span-1 px-10 py-2  bg-red-100 rounded-lg flex flex-col justify-center items-center space-y-5">
          <div className="flex flex-col items-center ">
            <h1 className=" font-Josef text-2xl font-semibold">200</h1>
            <p className="text-slate-600 text-sm font-medium">Patients</p>
          </div>
          <p className="text-slate-600 text-sm font-semibold">
            50 new patients admitted
          </p>
        </div>

        <div className="col-span-1 px-10 py-7 bg-red-100 rounded-lg flex flex-col justify-center items-center space-y-5">
          <div className="flex flex-col items-center ">
            <h1 className=" font-Josef text-2xl font-semibold">200</h1>
            <p className="text-slate-600 text-sm font-medium">Staff</p>
          </div>
          <p className="text-slate-600 text-sm font-semibold">
            10 Staff on vacation
          </p>
        </div>
        <div className="col-span-1 px-10 py-7 bg-red-100 rounded-lg flex flex-col justify-center items-center space-y-5">
          <div className="flex flex-col items-center ">
            <h1 className=" font-Josef text-2xl font-semibold">200</h1>
            <p className="text-slate-600 text-sm font-medium">Patients</p>
          </div>
          <p className="text-slate-600 text-sm font-semibold">
            50 new patients admitted
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 py-7 w-full gap-x-10">
        <div className="col-span-2 h-64 bg-blue-100 rounded-lg flex flex-col justify-center items-center space-y-5">
          <h1>Meals Tracking</h1>
        </div>
        <div className="col-span-1 bg-green-100 rounded-lg flex flex-col justify-center items-center space-y-5">pie chart</div>

      </div>
    </div>
  );
};

export default Dashboard;
