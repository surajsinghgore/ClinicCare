import React from 'react'
import BreadCrumbs from '../../components/Common/BreadCrumbs'
import { FaFileImport } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa";
import { ImBooks } from "react-icons/im";

const DoctorVerification2 = () => {
    return (
        <>
            <BreadCrumbs currentPath="Doctor Verification" />



            <div className='relative docDiv w-[85%] h-full m-auto mt-10 rounded-lg overflow-hidden'>
                <div className='flex p-3 border-b border-black-400 bg-white'>
                    <div className='flex gap-10 p-4 select-none'>

                        {/* Navigation Item */}
                        <div className='flex items-center gap-2 cursor-pointer '>
                            <FaAddressCard className='text-black-500 text-2xl' />
                            <span className='text-black-500 font-medium'>Personal Details</span>
                        </div>

                        {/* Active Navigation Item */}
                        <div className='flex items-center gap-2 cursor-pointer border-b-2 border-blue-400 pb-1'>
                            <FaUserShield className='text-blue-500 text-2xl' />
                            <div className='flex flex-col items-center'>
                                <span className='text-blue-500 font-medium'>Profile and Bio</span>
                            </div>
                        </div>

                        {/* Navigation Item */}
                        <div className='flex items-center gap-2 cursor-pointer '>
                            <FaFileUpload className='text-black-500 text-2xl ' />
                            <span className='text-black-500 font-medium '>Upload File</span>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}

export default DoctorVerification2