import React from 'react';
import { FaCheck, FaTrash, FaEdit } from 'react-icons/fa'; // Import icons
import BreadCrumbs from '../../../components/Common/BreadCrumbs';

const TodayAppointment = () => {
  return (
    <>
      <BreadCrumbs currentPath="Today's Appointment" />
      <div className="p-4 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-red-600 font-semibold">Today's Appointment Records</h2>
          <div className="text-right">
            <span className="text-black-500">Today's Revenue : </span>
            <span className="text-red-600 font-semibold">₹ 0</span>
          </div>
        </div>
        <div className="mt-4 mb-10 flex space-x-4">
          <input
            type="text"
            placeholder="Search Appointment Id ..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Search Patient Name..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
          />
          <select className="border border-black-300 rounded-md px-3 py-2 w-full">
            <option>Search Time Slot...</option>
          </select>
          <select className="border border-black-300 rounded-md px-3 py-2 w-full">
            <option>Select Date..</option>
          </select>
        </div>
        <div className="mt-4 mb-14 flex space-x-2">
          <div className="bg-blue-400 text-white flex items-center justify-center font-medium px-4 py-3 rounded-md text-center w-full">
            <p>Total: 10</p>
          </div>
          <div className="bg-success text-white flex items-center justify-center font-medium px-4 py-3 rounded-md text-center w-full">
            <p>Completed: 5</p>
          </div>
          <div className="bg-warning text-white flex items-center justify-center font-medium px-4 py-3 rounded-md text-center w-full">
            <p>Pending: 3</p>
          </div>
          <div className="bg-danger text-white flex items-center justify-center font-medium px-4 py-3 rounded-md text-center w-full">
            <p>Rejected: 1</p>
          </div>
          <div className="bg-cyan-400 text-white flex items-center justify-center font-medium px-4 py-3 rounded-md text-center w-full">
            <p>Delayed: 1</p>
          </div>
        </div>

        {/* Table for displaying appointment records */}
        <div className="overflow-x-auto">
          <h1 className='text-lg font-semibold'>Recent Appointments</h1>
          <table className="min-w-full bg-white border border-black-300 rounded-md">
            <thead>
              <tr className="bg-black-200">
                <th className="text-left text-black-800 px-4 py-2 border-b">ID</th>
                <th className="text-left text-black-800 px-4 py-2 border-b">Patient Name</th>
                <th className="text-left text-black-800 px-4 py-2 border-b">Age</th>
                <th className="text-left text-black-800 px-4 py-2 border-b">Treatment Name</th>
                <th className="text-left text-black-800 px-4 py-2 border-b">Speciality</th>
                <th className="text-left text-black-800 px-4 py-2 border-b">Clinic Address</th>
                <th className="text-left text-black-800 px-4 py-2 border-b">Time</th>
                <th className="text-left text-black-800 px-4 py-2 border-b">Date</th>
                <th className="text-left text-black-800 px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Row */}
              <tr className="hover:bg-black-100">
                <td className="px-4 text-sm py-2">12345</td>
                <td className="px-4 text-sm py-2 flex items-center">
                  <img
                    src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Patient"
                    className="w-16 h-16 rounded-full object-cover mr-2"
                  />
                  John Doe
                </td>
                <td className="px-4 text-center text-sm py-2">24</td>
                <td className="px-4 text-center text-sm py-2">Ortho</td>
                <td className="px-4 text-center text-sm py-2">Ortho Operator</td>
                <td className="px-4 text-center text-sm py-2">Chandigarh Sec-7</td>
                <td className="px-4 text-center text-sm py-2">9:30</td>
                <td className="px-4 text-center text-sm py-2">Dec 12, 2024</td>
                <td className="px-4 text-center text-sm">
                  <div className='flex gap-2'>
                    <button className="bg-black-200 rounded p-2  text-success hover:text-[#06402B]">
                      <FaCheck title="Accept" />
                    </button>
                    <button className="bg-black-200 rounded p-2  text-blue-500 hover:text-blue-700">
                      <FaEdit title="Edit" />
                    </button>
                    <button className="bg-black-200 rounded p-2  text-danger hover:text-[#8B0000]">
                      <FaTrash title="Delete" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TodayAppointment;
