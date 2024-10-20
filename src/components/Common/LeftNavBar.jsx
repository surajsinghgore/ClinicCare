import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { FaStethoscope } from "react-icons/fa";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { TbReportMedical } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoIosPersonAdd } from "react-icons/io";
import { FaPersonCircleCheck } from "react-icons/fa6";
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
            <LeftNavLink 
                link="/users" 
                title="User" 
                icons={<FaRegUserCircle className=" icon text-2xl text-black-800" />} 
                submenuItems={[
                    { link: "/users/profile", title: "Profile" },
                    { link: "/users/settings", title: "Settings" }
                ]}
            />
            <LeftNavLink 
                link="/doctors" 
                title="Doctor" 
                icons={<FaStethoscope className=" icon text-2xl text-black-800" />} 
                submenuItems={[
                    { link: "/admin/add-doctor", title: "Add Doctor", icon: <IoIosPersonAdd className=" icon text-2xl text-black-800" /> },

                    { link: "/admin/", title: "Verify Doctor", icon: <FaPersonCircleCheck className=" icon text-2xl text-black-800" /> }
                ]}
            />
            <LeftNavLink 
                link="/transactions" 
                title="Transaction" 
                icons={<RiMoneyRupeeCircleLine className=" icon text-2xl text-black-800" />}
            />
            <LeftNavLink 
                link="/reports" 
                title="Reports" 
                icons={<TbReportMedical className=" icon text-2xl text-black-800" />} 
            />
            <LeftNavLink 
                link="/appointments" 
                title="Appointments" 
                icons={<SlCalender className=" icon text-2xl text-black-800" />} 
                submenuItems={[
                    { link: "/appointments/upcoming", title: "Upcoming" },
                    { link: "/appointments/past", title: "Past" }
                ]}
            />
            <LeftNavLink 
                link="/platform-fees" 
                title="Platform Fees" 
                icons={<FaMoneyCheckDollar className=" icon text-2xl text-black-800" />} 
            />
        </nav>
        </section>
      </div>
  )
}

export default LeftNavBar