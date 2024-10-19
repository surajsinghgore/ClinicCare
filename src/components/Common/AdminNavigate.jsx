import React from 'react'
import { FaHouseChimneyMedical } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

const AdminNavigate = ({currentPath}) => {
  return (
    <div className='w-full flex gap-1 pl-7 py-2 shadow-lg'>
        <div className="icon flex align-center p-2">
            <FaHouseChimneyMedical className='text-2xl text-[#116AEF]'/>
        </div>
        <div className="nav flex gap-3 items-center">
            <Link to="/" className='font-semibold text-black-400 hover:text-black-700 duration-200'>Home</Link>
            <IoIosArrowForward className='text-black-500'/>
            <p className='text-[#116AEF] font-semibold'>{currentPath}</p>
        </div>
    </div>
  )
}

export default AdminNavigate