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
                <div className='p-5 text-2xl flex items-center gap-3 text-[#116AEF] border-b border-black-400'>
                    <FaFileImport />
                    <h1 className='font-semibold text-2xl'>Doctor Identity and Credential Verification</h1>
                </div>

                <div className='flex p-6 flex-wrap'>
                    {/* Degree Upload */}
                    <div className='flex flex-col flex-grow md:w-1/2'>
                        <label className='text-black-400'>Degree Upload <span className='text-danger text-lg'>*</span></label>
                        <div className='flex items-center relative'>
                            <input
                                type="file"
                                className='w-96 rounded-lg p-2 border border-black-200 focus:outline-none pl-10'
                                required
                            />
                            <FaCloudUploadAlt className='ml-2 text-lg absolute left-1' />
                        </div>
                    </div>

                    {/* Licence Upload */}
                    <div className='flex flex-col flex-grow md:w-1/2'>
                        <label className='text-black-400'>Licence Upload <span className='text-danger text-lg'>*</span></label>
                        <div className='flex items-center relative'>
                            <input
                                type="file"
                                className='w-96 rounded-lg p-2 border border-black-200 focus:outline-none pl-10'
                                required
                            />
                            <FaCloudUploadAlt className='ml-2 text-lg absolute left-1' />
                        </div>
                    </div>
                </div>

                <div className='flex p-6 flex-wrap'>
                    {/* Specialization */}
                    <div className='flex flex-col flex-grow md:w-1/2'>
                        <label className='text-black-400'>Specialization <span className='text-danger text-lg'>*</span></label>
                        <div className='flex items-center relative'>
                            <textarea
                                placeholder='Add specialization...'
                                className='w-96 rounded-lg p-2 border border-black-200 focus:outline-none pl-10'
                                required
                                style={{ color: 'red', fontStyle: 'italic' }}
                            />
                            <ImBooks className='ml-2 text-lg absolute left-1' />
                        </div>
                    </div>

                    {/* Experience */}
                    <div className='flex flex-col flex-grow md:w-1/2'>
                        <label className='text-black-400'>Experience <span className='text-danger text-lg'>*</span></label>
                        <div className='flex items-center relative'>
                            <input
                                type="number"
                                placeholder='Add experience in years...'
                                className='w-96 rounded-lg p-2 border border-black-200 focus:outline-none pl-10'
                                required
                            />
                            <FaHospitalUser className='ml-2 text-lg absolute left-1' />
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}

export default DoctorVerification2