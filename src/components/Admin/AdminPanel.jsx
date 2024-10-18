import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FaStethoscope } from "react-icons/fa";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { TbReportMedical } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
// import { IoIosArrowDown } from "react-icons/io";
import adminpanel from '../../assets/adminpanel.png'
import admin from '../../assets/admin.jpeg'

const AdminPanel = () => {
  return (
    <>
      <div className="h-[80px] fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-10 flex justify-between items-center">
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
            <IoMdLogOut className='w-6 h-6' />
          </a>
        </div>
      </div>
      <div className="mt-16 flex flex-col w-[17%] shadow-lg">
        <section className="bg-[#FFFFFF] py-3 px-2 border-b-[1px] border-black-200">
          <div className="flex items-center ml-1 mt-10">
            <img src={admin} alt="Admin" className="h-[4.6rem] w-[4.6rem] mr-4 rounded-full object-cover object-top shadow-md" />
            <div>
              <h1 className="text-xl font-semibold">Nick Gonzalez</h1>
              <p className='text-sm'>Dept Admin</p>
            </div>
          </div>
        </section>
        <section className="h-screen py-5 flex-grow bg-[#FFFFFF]">
          <nav className="flex flex-col justify-between">
            <a href="/users" className="text-black hover:bg-[#E9F2FF] transition-colors duration-300 px-6 py-3 flex items-center text-lg font-normal">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-5">
                <FaRegUserCircle className="text-2xl text-[#116AEF]" />
              </div>
              Users
              <IoIosArrowForward className="ml-auto text-2xl text-black" />
            </a>
            <a href="/doctors" className="text-black hover:bg-[#E9F2FF] transition-colors duration-300 px-6 py-3 flex items-center text-lg font-normal">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-5">
                <FaStethoscope className="text-2xl text-[#116AEF]" />
              </div>
              Doctors
              <IoIosArrowForward className="ml-auto text-2xl text-black" />
            </a>
            <a href="/transactions" className="text-black hover:bg-[#E9F2FF] transition-colors duration-300 px-6 py-3 flex items-center text-lg font-normal">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-5">
                <RiMoneyRupeeCircleLine className="text-2xl text-[#116AEF]" />
              </div>
              Transactions
              <IoIosArrowForward className="ml-auto text-2xl text-black" />
            </a>
            <a href="/reports" className="text-black hover:bg-[#E9F2FF] transition-colors duration-300 px-6 py-3 flex items-center text-lg font-normal">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-5">
                <TbReportMedical className="text-2xl text-[#116AEF]" />
              </div>
              Reports
              <IoIosArrowForward className="ml-auto text-2xl text-black" />
            </a>
            <a href="/appointments" className="text-black hover:bg-[#E9F2FF] transition-colors duration-300 px-6 py-3 flex items-center text-lg font-normal">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-5">
                <SlCalender className="text-2xl text-[#116AEF]" />
              </div>
              Appointments
              <IoIosArrowForward className="ml-auto text-2xl text-black" />
            </a>
            <a href="/platform-fees" className="text-black hover:bg-[#E9F2FF] transition-colors duration-300 px-6 py-3 flex items-center text-lg font-normal">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-5">
                <FaMoneyCheckDollar className="text-2xl text-[#116AEF]" />
              </div>
              Platform Fees
              <IoIosArrowForward className="ml-auto text-2xl text-black" />
            </a>
          </nav>
        </section>
      </div>
    </>
  )
}

export default AdminPanel