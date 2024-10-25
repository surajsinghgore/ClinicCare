import React, { useState } from 'react';
import BreadCrumbs from '../../components/Common/BreadCrumbs';
import { FaHospitalUser } from 'react-icons/fa';
import { CiCalendarDate } from 'react-icons/ci';
import { FaImages } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AddClinic2 = () => {
    const [availability, setAvailability] = useState([
        { day: 'Monday', opening: '', closing: '', status: '' },
        { day: 'Tuesday', opening: '', closing: '', status: '' },
        { day: 'Wednesday', opening: '', closing: '', status: '' },
        { day: 'Thursday', opening: '', closing: '', status: '' },
        { day: 'Friday', opening: '', closing: '', status: '' },
        { day: 'Saturday', opening: '', closing: '', status: '' },
        { day: 'Sunday', opening: '', closing: '', status: '' },
    ]);

    const handleInputChange = (index, field, value) => {
        const updatedAvailability = [...availability];
        updatedAvailability[index][field] = value;
        setAvailability(updatedAvailability);
    };

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

                {/* Doctor Availability */}
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg mt-12">
                    <h2 className="text-3xl font-bold mb-10 text-gray-800 text-left">Doctor Availability</h2>
                    <div className="grid grid-cols-4 gap-6 mb-4 border-b-2 border-gray-300 pb-4 text-gray-600">
                        <div className="font-semibold text-left">Day</div>
                        <div className="font-semibold text-center">Opening Time</div>
                        <div className="font-semibold text-center">Closing Time</div>
                        <div className="font-semibold text-right">Status</div>
                    </div>
                    {availability.map((slot, index) => (
                        <div key={index} className="grid grid-cols-4 gap-6 items-center mb-4 border-b border-gray-200 pb-3 transition-all hover:bg-blue-50">
                            <div className="text-left text-gray-700 font-medium">{slot.day}</div>
                            <input
                                type="time"
                                className="p-2 w-full border rounded-md shadow-sm text-center bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300 hover:shadow-md"
                                value={slot.opening}
                                onChange={(e) => handleInputChange(index, 'opening', e.target.value)}
                            />
                            <input
                                type="time"
                                className="p-2 w-full border rounded-md shadow-sm text-center bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300 hover:shadow-md"
                                value={slot.closing}
                                onChange={(e) => handleInputChange(index, 'closing', e.target.value)}
                            />
                            <select
                                className="p-2 ml-12 w-44 border rounded-md shadow-sm bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300 hover:shadow-md text-gray-700"
                                value={slot.status}
                                onChange={(e) => handleInputChange(index, 'status', e.target.value)}
                            >
                                <option value="">Set Status</option>
                                <option value="Open">Open</option>
                                <option value="Close">Close</option>
                            </select>
                        </div>
                    ))}
                </div>



                <Link to={"/doctor/add-clinic"}
                    className="ml-auto bg-secondary duration-200 text-white m-8 shadow-lg font-bold py-2 px-3 rounded-md absolute bottom-5 right-40"
                >
                    Back
                </Link>

                <button className="bg-blue-500 hover:bg-blue-700 duration-200 text-white m-8 shadow-lg font-semibold py-2 px-3 rounded-md ml-[87%]">
                    Save & Next
                </button>
            </div>
        </div>
    );
};

export default AddClinic2;
