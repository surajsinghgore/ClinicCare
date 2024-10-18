import React, { useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { AiOutlineTransaction } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { IoCalendarNumber } from "react-icons/io5";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";
import { FaFileCircleCheck } from "react-icons/fa6";
import logo from '../../assets/logo.png'
import adminprofile from '../../assets/admin.png'

const AdminPanel = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex">
      <div className="w-1/4 shadow">
          <img src={logo} alt="Logo" className="w-56 ml-10"/>
        <div>
          <nav>
            <ul className='pl-7 pr-7 pb-7 pt-0'>
              <li className="mb-10 border-b border-black-300">
                <a href="/user" className="flex items-center text-xl font-semibold text-[#004AAD] mb-4">
                  <FaRegUserCircle className="mr-6 text-3xl" />
                  User
                </a>
              </li>
              <li className="mb-10 border-b border-black-300">
                <a href="/" className="flex items-center text-xl font-semibold text-[#004AAD] mb-4" onClick={(e) => {e.preventDefault(); setToggle(!toggle)}}>
                  <FaUserDoctor className="mr-6 text-3xl text-[#004AAD]" />
                  Doctor
                  {toggle ? <IoIosArrowDown className="ml-auto text-[#004AAD]" /> : <IoIosArrowForward className="ml-auto text-[#004AAD]" />}
                </a>
                {toggle && (
                  <div className="pl-7">
                    <ul>
                      <li className="mb-9 mt-10 text-[#4BC6DC] font-semibold flex items-center">
                        <a href="/" className="flex items-center text-[#4BC6DC] text-lg font-semibold mb-4">
                          <IoIosAddCircle className=" text-3xl mr-3" />
                          Add Doctor
                        </a>
                      </li>
                      <li className="mb-9 text-[#4BC6DC] font-semibold flex items-center">
                        <a href="/" className="flex items-center text-[#4BC6DC] text-lg font-semibold mb-4">
                          <GrUpdate className=" text-3xl mr-3" />
                          Update Doctor
                        </a>
                      </li>
                      <li className="mb-9 text-[#4BC6DC] font-semibold flex items-center">
                        <a href="/" className="flex items-center text-[#4BC6DC] text-lg font-semibold mb-4">
                          <FaFileCircleCheck className=" text-3xl mr-3" />
                          Verify Doctor
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li className="mb-10 border-b border-black-300">
                <a href="/transaction" className="flex items-center text-xl font-semibold text-[#004AAD] mb-4">
                  <AiOutlineTransaction className="mr-6 text-3xl" />
                  Transaction
                </a>
              </li>
              <li className="mb-10 border-b border-black-300">
                <a href="/report" className="flex items-center text-xl font-semibold text-[#004AAD] mb-4">
                  <TbReportAnalytics className="mr-6 text-3xl" />
                  Report
                </a>
              </li>
              <li className="mb-10 border-b border-black-300">
                <a href="/appointment" className="flex items-center text-xl font-semibold text-[#004AAD] mb-4">
                  <IoCalendarNumber className="mr-6 text-3xl" />
                  Appointment
                </a>
              </li>
              <li className="mb-10 border-b border-black-300">
                <a href="/platform-fees" className="flex items-center text-xl font-semibold text-[#004AAD] mb-4">
                  <RiMoneyRupeeCircleLine className="mr-6 text-3xl" />
                  Platform Fees
                </a>
              </li>
              <li className="mb-10 border-b border-black-300">
                <a href="/login" className="flex items-center text-xl font-semibold text-[#004AAD] mb-4">
                  <FiLogOut className="mr-6 text-3xl" />
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="w-full h-screen bg-gray-100">
        <div className="flex h-[100px] justify-between items-center p-4 bg-white shadow sticky top-0">
          <div className="flex items-center">
            <IoSearchSharp className="ml-2 mr-4 text-3xl text-black-400" />
            <input type="text" placeholder="Find something..." className="p-2 border-2 border-blue-700 rounded-md w-[30rem]" />
          </div>
          <div className="flex items-center">
            <span className='mr-2 text-lg font-semibold'>admin@gmail.com</span>
            <img src={adminprofile} alt="Profile" className="w-24 rounded-full" />
          </div>
        </div>
        <div className="p-4">
        </div>
      </div>
    </div>
  )
}

export default AdminPanel