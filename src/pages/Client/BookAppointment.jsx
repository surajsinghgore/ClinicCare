import React from 'react'
import Header from '../../components/Common/Header'
import book from "../../assets/bookappointment2.png";
import { FiSearch } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";

const BookAppointment = () => {
    return (
        <>
            <Header />

            <div className='img w-75% m-auto p-6'>
                <img src={book} alt="Book Appointment" className='rounded-xl' />
            </div>

            <div className="search w-full py-6">
                {/* Search Bar */}
                <div className="flex justify-center items-center">
                    <div className="flex items-center bg-white w-3/5 rounded-full shadow-md px-4 py-3 outline outline-2 outline-black-300">
                        <FiSearch className="text-black-600 mr-2 text-2xl" />
                        <input
                            type="text"
                            placeholder="Search for Doctor, Clinic, or Disease"
                            className="w-full outline-none text-black-700"
                        />
                    </div>
                </div>

                {/* Search Results */}
                <div className="w-4/5 mx-auto mt-8 space-y-6">
                    {/* Doctor Card 1 */}
                    <a href="/doctor/jenny-doe" className="doctor-card flex items-start bg-white p-4 shadow rounded-lg hover:shadow-lg transition-shadow">
                        <img
                            src="https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Doctor Jenny Doe"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <div className="ml-4 flex-grow">
                            <h3 className="text-xl font-semibold">Dr. Jenny Doe</h3>
                            <p className="text-black-600 flex items-center">
                                <FaLocationDot className="mr-1" />
                                Doe Clinic, 123 Main St, City
                            </p>
                            <p className="text-black-600">Specializing in cardiovascular health and preventive care.</p>
                            <p className="text-black-600"><span className='text-[#0148B1] font-semibold'>Languages Spoken:</span> English, Spanish</p>
                            <button className="mt-4 px-4 py-1 text-white bg-[#0148B1] rounded-md shadow">Book Appointment</button>
                        </div>
                        <div className="ml-auto text-right">
                            <p className="text-black-600 mr-[3.1rem]"><span className='text-[#0148B1] font-semibold'>Experience:</span> 10 years</p>
                            <p className="text-black-600"><span className='text-[#0148B1] font-semibold'>Expertise:</span> Cardiologist, MD</p>
                        </div>
                    </a>

                    {/* Doctor Card 2 */}
                    <a href="/doctor/jane-smith" className="doctor-card flex items-start bg-white p-4 shadow rounded-lg hover:shadow-lg transition-shadow">
                        <img
                            src="https://images.pexels.com/photos/8376263/pexels-photo-8376263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Doctor Jane Smith"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <div className="ml-4 flex-grow">
                            <h3 className="text-xl font-semibold text-[#0148B1]">Dr. Jane Smith</h3>
                            <p className="text-black-600 flex items-center">
                                <FaLocationDot className="mr-1" />
                                Smith Health Center, 456 Elm St, City
                            </p>
                            <p className="text-black-600">Expert in skin conditions, cosmetic dermatology, and patient education.</p>
                            <p className="text-black-600"><span className='text-[#0148B1] font-semibold'>Languages Spoken:</span> English, French</p>
                            <button className="mt-4 px-4 py-1 text-white bg-[#0148B1] rounded-md shadow">Book Appointment</button>
                        </div>
                        <div className="ml-auto text-right">
                            <p className="text-black-600 mr-[5.6rem]"><span className='text-[#0148B1] font-semibold'>Experience:</span> 8 years</p>
                            <p className="text-black-600"><span className='text-[#0148B1] font-semibold'>Expertise:</span> Dermatologist, MBBS</p>
                        </div>
                    </a>

                    {/* Doctor Card 3 */}
                    <a href="/doctor/alex-turner" className="doctor-card flex items-start bg-white p-4 shadow rounded-lg hover:shadow-lg transition-shadow">
                        <img
                            src="https://images.pexels.com/photos/8376284/pexels-photo-8376284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Doctor Alex Turner"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <div className="ml-4 flex-grow">
                            <h3 className="text-xl font-semibold text-[#0148B1]">Dr. Alex Turner</h3>
                            <p className="text-black-600 flex items-center">
                                <FaLocationDot className="mr-1" />
                                Turner Clinic, 789 Oak St, City
                            </p>
                            <p className="text-black-600">Specializes in neurological disorders, brain health, and patient care.</p>
                            <p className="text-black-600"><span className='text-[#0148B1] font-semibold'>Languages Spoken:</span> English, German</p>
                            <button className="mt-4 px-4 py-1 text-white bg-[#0148B1] rounded-md shadow">Book Appointment</button>
                        </div>
                        <div className="ml-auto text-right">
                            <p className="text-black-600 mr-[3.1rem]"><span className='text-[#0148B1] font-semibold'>Experience:</span> 15 years</p>
                            <p className="text-black-600"><span className='text-[#0148B1] font-semibold'>Expertise:</span> Neurologist, PhD</p>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default BookAppointment