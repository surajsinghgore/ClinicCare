import React from 'react';
import Header from '../../components/Common/Header';
import about from "../../assets/aboutDoctor2.png";
import { FaMapMarkerAlt, FaGraduationCap, FaStar } from 'react-icons/fa';
import ReviewCard from '../../components/ReviewCard';

const DoctorDetails = () => {
    return (
        <>
            <Header />

            {/* top img */}
            <div className="top-img">
                <img src={about} alt="" />
            </div>

            {/* profile */}
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

            {/* Clinic Section */}
            <div className="p-6 font-sans flex justify-center items-start mt-20">
                <div className="w-[85%]">
                    <h3 className="text-xl font-semibold mb-4">Jenny Doe Clinic</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {/* Clinic Card */}
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="rounded-lg overflow-hidden shadow-md">
                                <img
                                    src="https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=600"
                                    alt="clinic"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-32 mt-20 min-h-screen">
                <h2 className="text-lg font-semibold mb-4">What users are saying about Jane Cooper</h2>
                <div className="flex space-x-4 overflow-x-auto">
                    <ReviewCard />
                    <ReviewCard />
                </div>
            </div>
        </>
    );
};

export default DoctorDetails;
