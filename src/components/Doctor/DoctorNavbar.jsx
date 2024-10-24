import React from 'react'
import { FaRegHospital } from "react-icons/fa";
import LeftNavLink from '../Common/LeftNavLink';
import { BiClinic } from "react-icons/bi";

const DoctorNavbar = () => {
  return (
    <div className="shadow-lg">
        <section className="bg-[#FFFFFF] pb-4 px-4 border-b-[1px] border-black-200">
          <div className="flex items-center ml-1 mt-10">
            <img src='https://images.pexels.com/photos/3873193/pexels-photo-3873193.jpeg?auto=compress&cs=tinysrgb&w=600' alt="Admin" className="h-[4.6rem] w-[4.6rem] mr-4 rounded-full object-cover object-top shadow-md" />
            <div>
              <h1 className="text-xl font-semibold">Smith White</h1>
              <p className="text-sm">Doctor</p>
            </div>
          </div>
        </section>
        <section className="h-screen py-5 flex-grow bg-[#FFFFFF]">
        <nav className="flex flex-col justify-between">
            <LeftNavLink 
                link="/doctor" 
                title="Clinic" 
                icons={<FaRegHospital className=" icon text-2xl text-black-800" />} 
                submenuItems={[
                    { link: "/doctor/add-clinic", title: "Add Clinic", icon: <BiClinic className=" icon text-2xl text-black-800" /> },
                ]}
            />
        </nav>
        </section>
      </div>
  )
}

export default DoctorNavbar