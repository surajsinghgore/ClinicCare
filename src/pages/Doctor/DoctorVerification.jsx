import BreadCrumbs from "../../components/Common/BreadCrumbs";
import { FaUserEdit } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { FaUserShield, FaAddressCard } from 'react-icons/fa';
import { FaFileUpload } from "react-icons/fa";
import { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const DoctorVerification = () => {

  const [selected, setSelected] = useState([]);


  return (
    <>
      <BreadCrumbs currentPath="Doctor Verification" />

      <div className='heading relative docDiv w-[85%] h-full m-auto mt-10 rounded-lg overflow-hidden'>

        <div className='flex p-3 border-b border-black-400 bg-white'>
          <div className='flex gap-10 p-4 select-none'>
            {/* Active Navigation Item */}
            <div className='flex items-center gap-2 cursor-pointer border-b-2 border-blue-400 pb-1'>
              <FaUserShield className='text-blue-500 text-2xl' />
              <div className='flex flex-col items-center'>
                <span className='text-blue-500 font-medium'>Personal Details</span>
              </div>
            </div>

            {/* Navigation Item */}
            <div className='flex items-center gap-2 cursor-pointer '>
              <FaAddressCard className='text-black-500 text-2xl' />
              <span className='text-black-500 font-medium'>Profile and Bio</span>
            </div>

            {/* Navigation Item */}
            <div className='flex items-center gap-2 cursor-pointer '>
              <FaFileUpload className='text-black-500 text-2xl ' />
              <span className='text-black-500 font-medium '>Upload File</span>
            </div>
          </div>
        </div>


        <div className='flex p-6 flex-wrap'>
          {/* Doctor Name */}
          <div className='flex flex-col mr-16 md:w-1/3 p-2'>
            <label className='text-black-400'>Doctor Name <span className='text-danger text-lg'>*</span></label>
            <div className='flex items-center relative'>
              <input
                type="text"
                placeholder='Add doctor name...'
                className='w-96 rounded-lg p-2 border border-black-200 focus:outline-none pl-10'
                required
              />
              <FaUserEdit className='ml-2 text-lg absolute left-1' />
            </div>
          </div>

          {/* Date of Birth */}
          <div className='flex flex-col mr-16 md:w-1/3 p-2'>
            <label className='text-black-400'>Date of Birth <span className='text-danger text-lg'>*</span></label>
            <div className='flex items-center relative'>
              <input
                type="date"
                className='w-96 rounded-lg p-2 border border-black-200 focus:outline-none pl-10'
                required
              />
              <MdOutlineDateRange className='ml-2 text-lg absolute left-1' />
            </div>
          </div>

          {/* Gender */}
          <div className='flex flex-col mr-16 md:w-1/3 p-2'>
            <label className='text-black-400'>Gender <span className='text-danger text-lg'>*</span></label>
            <div className='flex items-center'>
              <label className='flex items-center gap-2'>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
                  required
                />
                <span className='text-gray-700'>Male</span>
              </label>
              <label className='flex items-center gap-2 ml-4'>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
                  required
                />
                <span className='text-gray-700'>Female</span>
              </label>
            </div>
          </div>
        </div>

        <div className='flex p-6 mr-10'>
          {/* Mobile Number */}
          <div className='flex flex-col p-2 mr-16'>
            <label className='text-black-400'>Mobile Number <span className='text-danger text-lg'>*</span></label>
            <div className='flex items-center relative'>
              <input
                type="text"
                placeholder='Add mobile number...'
                className='w-96 rounded-lg p-2 border border-black-200 focus:outline-none pl-10'
                required
              />
              <FaPhone className='ml-2 text-lg absolute left-1' />
            </div>
          </div>

          <div className='flex pt-2 flex-wrap flex-col w-96'>

            <h1 className="text-black-400">Add Hobbies</h1>
            {/* <pre>{JSON.stringify(selected)}</pre> */}
            <TagsInput
              value={selected}
              onChange={setSelected}
              name="fruits"
              placeHolder="Enter your hobbies..."
            />
            <em className="text-black-400">press enter to add new tag</em>
          </div>
        </div>






        <button className='ml-auto bg-blue-500 hover:bg-blue-700 duration-200 text-white m-8 shadow-lg font-bold py-2 px-3 rounded-md absolute bottom-0 right-0'>
          Save & Next
        </button>
      </div>


    </>
  )
}

export default DoctorVerification;
