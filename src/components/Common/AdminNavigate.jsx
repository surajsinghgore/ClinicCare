import React from 'react'
import { FaHouseChimneyMedical } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

const AdminNavigate = () => {
  return (
    <div className='w-full flex gap-1 pl-7 py-2 shadow-lg'>
        <div className="icon flex align-center p-2">
            <FaHouseChimneyMedical className='text-2xl text-[#116AEF]'/>
        </div>
        <div className="nav flex gap-3 items-center">
            <a href="" className='font-semibold text-black-400 hover:text-black-700 duration-200'>Home</a>
            <IoIosArrowForward className='text-black-500'/>
            <p className='text-[#116AEF] font-semibold'>Current Tab</p>
        </div>
    </div>
  )
}

export default AdminNavigate