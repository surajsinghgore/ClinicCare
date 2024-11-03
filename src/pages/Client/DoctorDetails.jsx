import React from 'react';
import Header from '../../components/Common/Header';
import { FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';

const DoctorDetails = () => {
    return (
        <>
            <Header />
            <div className="relative p-6 font-sans flex justify-center items-center">
                <div className="relative flex items-center p-8 bg-black-100 rounded-lg shadow-lg w-[85%] mt-16">
                    {/* Profile Image */}
                    <div className="absolute w-72 h-72 rounded-full overflow-hidden border-4 border-white flex-shrink-0">
                        <img 
                            src="https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                            alt="Dr. Profile" 
                            className="w-full h-full object-cover" 
                        />
                    </div>

                    {/* Profile Information */}
                    <div className="ml-80 flex flex-col w-full">
                        {/* Name */}
                        <h2 className="text-2xl font-bold text-[#0049AC] mb-2">Doctor Jenny Doe</h2>

                        {/* Location and Qualification */}
                        <div className="flex items-center space-x-6 text-black-700 mb-4">
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="text-orange-500 mr-2" />
                                <span>Bengaluru</span>
                            </div>
                            <div className="flex items-center">
                                <FaGraduationCap className="text-orange-500 mr-2" />
                                <span>MDS (Orthodontics)</span>
                            </div>
                        </div>

                        {/* Expertise and Experience Section */}
                        <div className="flex items-center justify-around mt-4 gap-10">
                            {/* Expertise */}
                            <div className='w-[70%]'>
                                <h3 className="text-[#0049AC] font-semibold text-lg">Expertise</h3>
                                <p className="text-black-700 mt-1 text-sm leading-relaxed">
                                    Braces, Aligners, Root Canal Treatment (RCT), Teeth Whitening, Smile Design, General Dentistry, Tooth Extraction, Scaling & Polishing
                                </p>
                            </div>

                            {/* Experience */}
                            <div>
                                <h3 className="text-[#0049AC] font-semibold text-lg">Experience</h3>
                                <p className="text-black-700 mt-1 text-sm leading-relaxed">
                                    300+ Happy Patients <br />
                                    250+ Completed Ortho Cases
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorDetails;
