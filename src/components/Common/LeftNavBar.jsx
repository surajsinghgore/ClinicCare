import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { FaStethoscope } from "react-icons/fa";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { TbReportMedical } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
// import { IoIosArrowDown } from "react-icons/io";
import admin from "../../assets/admin.jpeg";
import LeftNavLink from './LeftNavLink';

const LeftNavBar = () => {
  return (
    <div className="shadow-lg">
        <section className="bg-[#FFFFFF] pb-4 px-2 border-b-[1px] border-black-200">
          <div className="flex items-center ml-1 mt-10">
            <img src={admin} alt="Admin" className="h-[4.6rem] w-[4.6rem] mr-4 rounded-full object-cover object-top shadow-md" />
            <div>
              <h1 className="text-xl font-semibold">Nick Gonzalez</h1>
              <p className="text-sm">Dept Admin</p>
            </div>
          </div>
        </section>
        <section className="h-screen py-5 flex-grow bg-[#FFFFFF]">
          <nav className="flex flex-col justify-between">
            <LeftNavLink link="/users" title="User" icons={<FaRegUserCircle className="text-2xl text-[#116AEF]" />}/>
            <LeftNavLink link="/users" title="Doctor" icons={<FaStethoscope className="text-2xl text-[#116AEF]" />}/>
            <LeftNavLink link="/users" title="Transaction" icons={<RiMoneyRupeeCircleLine className="text-2xl text-[#116AEF]" />}/>
            <LeftNavLink link="/users" title="Reports" icons={<TbReportMedical className="text-2xl text-[#116AEF]" />}/>
            <LeftNavLink link="/users" title="Appointments" icons={<SlCalender className="text-2xl text-[#116AEF]" />}/>
            <LeftNavLink link="/users" title="Platform Fees" icons={<FaMoneyCheckDollar className="text-2xl text-[#116AEF]" />}/>
          </nav>
        </section>
      </div>
  )
}

export default LeftNavBar