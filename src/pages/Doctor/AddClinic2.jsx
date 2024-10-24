import React from 'react'
import BreadCrumbs from '../../components/Common/BreadCrumbs'
import { FaHospitalUser } from 'react-icons/fa';
import { CiCalendarDate } from 'react-icons/ci';
import { FaImages } from 'react-icons/fa';

const AddClinic2 = () => {
    return (
        <div>
            <BreadCrumbs currentPath="Add Clinic" />
            <div className="relative w-[97%] m-auto mt-10 mb-10 rounded-lg shadow-lg p-5">
                {/* form list */}
                <div className="flex p-3 border-b border-black-400 bg-white">
                    <div className="flex gap-10 p-4 select-none">


                        <div className="flex items-center gap-2">
                            <FaHospitalUser className="text-black-500 text-2xl" />
                            <span className="text-black-500 font-medium">Clinic Details</span>
                        </div>

                        <div className="flex items-center gap-2 border-b-2 border-blue-400 pb-1">
                            <CiCalendarDate className="text-blue-500 text-2xl" />
                            <div className="flex flex-col items-center">
                                <span className="text-blue-500 font-medium">Availability</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <FaImages className="text-black-500 text-2xl" />
                            <span className="text-black-500 font-medium">Upload File</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddClinic2