import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import adminpanel from "../../assets/adminpanel.png";

const DoctorHeader = () => {
  return (
    <div className="h-[80px] bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-10 flex justify-between items-center">
    <div className="flex items-center">
      <img src={adminpanel} alt="Logo" className="h-16 w-16 mr-4 rounded-full object-center" />
      <h1 className="text-2xl font-bold">ClinicCare</h1>
    </div>
    <div className="flex items-center">
      <div className="flex items-center bg-gray-700 px-4 py-2 rounded-md relative">
        <input type="text" placeholder="Search" className="bg-white text-black-900 border-none text-black p-2 w-80 rounded-lg focus:outline-none pl-10" />
        <IoIosSearch className="h-7 w-7 absolute left-6 top-1/2 transform -translate-y-1/2 text-[#116AEF]" />
      </div>
      <a href="/login" className="px-2 py-2 rounded-full border border-black shadow-md text-white relative">
        <IoMdLogOut className="w-6 h-6" />
      </a>
    </div>
  </div>
  )
}

export default DoctorHeader