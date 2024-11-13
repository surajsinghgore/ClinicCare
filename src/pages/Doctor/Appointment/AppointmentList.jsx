import React from 'react'
import BreadCrumbs from '../../../components/Common/BreadCrumbs';
import { FaCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { MdEditSquare } from "react-icons/md";

const AppointmentList = () => {
  return (
    <>
      <BreadCrumbs currentPath="Today's Appointment" />
      <div className="p-4 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
        <h1 className='text-2xl font-semibold'>Appointment List</h1>
        <div className="flex justify-between items-center mb-8 mt-7">
          <h2>All Appointment Records</h2>
        </div>
        <div className="mt-4 mb-10 flex space-x-3">
          <input
            type="text"
            placeholder="Search Appointment Id ..."
            className="border border-black-300 rounded-md px-3 py-1 w-[23%]"
            name="searchAppointmentNumber"
          />
          <input
            type="text"
            placeholder="Search Patient Name..."
            className="border border-black-300 rounded-md px-3 py-1 w-[23%]"
            name="searchPatientName"
          />
          <input
            type="date"
            placeholder="Select Date of Birth"
            className="border border-black-300 rounded-md px-3 py-1 w-[23%]"
            name="dob"
          />

          <div className="status-picker">
            <select
              id="status"
              name="status"
              className="border border-black-300 rounded-md px-10 py-2 w-full"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="btn">
            <button className='rounded bg-[#116AEF] px-7 py-2 text-white'>Search</button>
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
                  <div className='flex gap-1'>
                    <button className="rounded p-1 text-xl text-success hover:text-[#2f8a38]">
                      <FaCircleCheck title="Accept" />
                    </button>
                    <button className="rounded p-1 text-xl text-danger hover:text-[#8B0000]">
                      <RxCrossCircled title="Delete" />
                    </button>
                    <button className="rounded p-1 text-xl text-blue-500 hover:text-blue-700">
                      <MdEditSquare title="Edit" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default AppointmentList