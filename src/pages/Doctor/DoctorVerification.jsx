import React from 'react'
import BreadCrumbs from '../../components/Common/BreadCrumbs'
import { FaUserEdit } from 'react-icons/fa';
import { FaPhone } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { MdVerifiedUser } from "react-icons/md";


const DoctorVerification = () => {
    return (
        <>
            <BreadCrumbs currentPath="Doctor Verification" />

            <div className='relative docDiv w-[85%] h-full m-auto mt-10 rounded-lg overflow-hidden'>
                <div className='p-5 text-2xl flex items-center gap-3 text-[#116AEF] border-b border-black-400'>
                    <MdVerifiedUser />
                    <h1 className='font-semibold text-2xl'>Doctor Identity and Credential Verification</h1>
                </div>

                <div className='flex p-6 flex-wrap'>
                    {/* Doctor Name */}
                    <div className='flex flex-col flex-grow md:w-1/3 p-2'>
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
                    <div className='flex flex-col flex-grow md:w-1/3 p-2'>
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
                    <div className='flex flex-col flex-grow md:w-1/3 p-2'>
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

                <div className='flex p-6 flex-wrap'>
                    {/* Mobile Number */}
                    <div className='flex flex-col flex-grow md:w-1/3 p-2'>
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
                </div>

                <button className='ml-auto bg-blue-500 hover:bg-blue-700 duration-200 text-white m-8 shadow-lg font-bold py-2 px-3 rounded-md absolute bottom-0 right-0'>
                    Submit
                </button>
            </div>

        </>
    )
}

export default DoctorVerification