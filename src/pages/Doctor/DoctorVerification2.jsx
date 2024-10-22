import React from 'react'
import BreadCrumbs from '../../components/Common/BreadCrumbs'
import { FaUserShield, FaAddressCard } from 'react-icons/fa';
import { FaFileUpload } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineStarRate } from "react-icons/md";

const DoctorVerification2 = () => {
    return (
        <>
            <BreadCrumbs currentPath="Doctor Verification" />



            <div className='relative docDiv w-[85%] h-full m-auto mt-10 rounded-lg overflow-hidden'>
                <div className='flex p-3 border-b border-black-400 bg-white'>
                    <div className='flex gap-10 p-4 select-none'>

                        {/* Navigation Item */}
                        <div className='flex items-center gap-2 '>
                            <FaUserShield className='text-black-500 text-2xl' />
                            <span className='text-black-500 font-medium'>Personal Details</span>
                        </div>

                        {/* Active Navigation Item */}
                        <div className='flex items-center gap-2 border-b-2 border-blue-400 pb-1'>
                            <FaAddressCard className='text-blue-500 text-2xl' />
                            <div className='flex flex-col items-center'>
                                <span className='text-blue-500 font-medium'>Profile and Bio</span>
                            </div>
                        </div>

                        {/* Navigation Item */}
                        <div className='flex items-center gap-2 '>
                            <FaFileUpload className='text-black-500 text-2xl ' />
                            <span className='text-black-500 font-medium '>Upload File</span>
                        </div>
                    </div>
                </div>


                {/* Input Fields Container */}
                <div className='flex flex-wrap p-8 gap-8'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center'>
                            <span className='text-black-500 font-medium'>Degree</span>
                        </div>
                        <div className='relative'>
                            <input type="text" className='border border-black-300 p-2 rounded-md w-80 pl-10' placeholder='Enter your degree' />
                            <TbCertificate className='absolute left-3 top-3 text-black-400' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <span className='text-black-500 font-medium'>Licence</span>
                        </div>
                        <div className='relative'>
                            <input type="text" className='border border-black-300 p-2 rounded-md w-80 pl-10' placeholder='Enter your licence number' />
                            <FaAddressCard className='absolute left-3 top-3 text-black-400' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <span className='text-black-500 font-medium'>Experience</span>
                        </div>
                        <div className='relative'>
                            <input type="text" className='border border-black-300 p-2 rounded-md w-80 pl-10' placeholder='Enter your experience' />
                            <FaUserDoctor className='absolute left-3 top-3 text-black-400' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <span className='text-black-500 font-medium'>Specialization</span>
                        </div>
                        <div className='relative'>
                            <input type="text" className='border border-black-300 p-2 rounded-md w-80 pl-10' placeholder='Enter your specialization' />
                            <MdOutlineStarRate className='absolute left-3 top-3 text-black-400' />
                        </div>
                    </div>
                </div>

                <button className='ml-auto bg-blue-500 hover:bg-blue-700 duration-200 text-white m-8 shadow-lg font-bold py-2 px-3 rounded-md absolute bottom-0 right-0'>
                    Save & Next
                </button>
            </div>


        </>

    )
}

export default DoctorVerification2