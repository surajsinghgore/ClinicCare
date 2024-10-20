import React from 'react'
import AdminNavigate from '../../components/Common/BreadCrumbs'
import { RiUserAddLine } from "react-icons/ri";
import { MdOutlineMail } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa'; 

const CreateDoctor = () => {
  return (
    <>
      <AdminNavigate currentPath="Add Doctor" />
      <div className='relative mainDiv w-[90%] h-[55%] m-auto mt-10 rounded-lg'>
        <div className='p-5 text-2xl flex items-center gap-3 text-[#116AEF] border-b border-black-400'>
          <RiUserAddLine />
          <h1 className='font-semibold text-2xl'>Add Doctor</h1>
        </div>

        <div className='flex p-6'>
          <div className='flex flex-col'>
            <div className='flex items-center mb-3'>
              <label className='text-black-400'>Doctor Name</label>
            </div>
            <div className='flex items-center relative'>
              <input type="text" placeholder='Add doctor name...' className='w-96 rounded-lg p-2 border border-black-200 focus:outline-none pl-10' />
              <FaUserEdit className='ml-2 text-lg absolute left-1' />
            </div>
          </div>
          <div className='flex flex-col ml-10'>
            <div className='flex items-center mb-3'>
              <label className='text-black-400'>Email</label>
            </div>
            <div className='flex items-center relative'>
              <input type="email" placeholder='Add doctor email...' className='w-96 rounded-lg p-2 border border-black-200 focus:outline-none pl-10' />
              <MdOutlineMail className='ml-2 text-lg absolute left-1' />
            </div>
          <button className='ml-auto bg-blue-500 hover:bg-blue-700 duration-200 text-white m-8 shadow-lg font-bold py-2 px-3 rounded-md absolute bottom-0 right-0'>
            Create Doctor Profile
          </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateDoctor