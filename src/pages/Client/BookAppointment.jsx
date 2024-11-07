import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Common/Header';
import book from "../../assets/bookappointment2.png";
import { FaLocationDot } from "react-icons/fa6";
import Footer from '../../components/Common/Footer';

const BookAppointment = () => {

    const navigate = useNavigate();

    return (
        <>
            <Header />

            <div className='img w-75%'>
                <img src={book} alt="Book Appointment" />
            </div>

            <div className="search w-full py-6">
                {/* Heading */}
                <h2 className="text-center text-3xl font-semibold text-black-700 mb-7 mt-14">
                    Search for Doctor or Clinic
                </h2>

                {/* Select Boxes */}
                <div className="flex justify-center items-center space-x-4 mb-14 mt-10">
                    {/* City Select Box */}
                    <select className="bg-white w-1/5 rounded shadow-md px-4 py-3 outline outline-2 outline-[#0148B1]">
                        <option value="">Select City</option>
                        <option value="New York">Chandigarh</option>
                        <option value="Los Angeles">Panchkula</option>
                        <option value="Chicago">Mohali</option>
                    </select>

                    {/* Treatment Select Box */}
                    <select className="bg-white w-1/5 rounded shadow-md px-4 py-3 outline outline-2 outline-[#0148B1]">
                        <option value="">Select Treatment</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Neurology">Neurology</option>
                    </select>

                    {/* Specialty Select Box */}
                    <select className="bg-white w-1/5 rounded shadow-md px-4 py-3 outline outline-2 outline-[#0148B1]">
                        <option value="">Select Specialty</option>
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Neurologist">Neurologist</option>
                    </select>
                </div>

                {/* Search Results */}
                <div className="w-4/5 mx-auto mt-8 space-y-10">
                    {/* Doctor Card 1 */}
                    <div className="doctor-card flex items-start py-8 bg-white p-4 shadow rounded-lg hover:shadow-lg transition-shadow">
                        <img
                            src="https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Doctor Jenny Doe"
                            className="w-32 h-32 rounded-full object-cover cursor-pointer"
                            onClick={() => navigate('/doctor-details')}
                        />
                        <div className="ml-4 flex-grow">
                            <h3 className="text-xl font-semibold text-[#0148B1]">Dr. Jenny Doe</h3>
                            <p className="text-black-600 flex items-center mb-3">
                                <FaLocationDot className="mr-1" />
                                Doe Clinic, 123 Main St, City
                            </p>
                            <p className="text-black-600"><span className='text-[#0148B1] font-semibold'>Specialization:</span> Specializing in cardiovascular health and preventive care.</p>
                            <p className="text-black-600 mb-5"><span className='text-[#0148B1] font-semibold'>Languages Spoken:</span> English, Spanish</p>
                            <Link to={"#"} className="mt-4 px-4 py-2 text-white bg-[#0148B1] rounded-md shadow">Book Appointment</Link>
                        </div>
                        <div className="ml-auto text-right">
                            <p className="text-black-600"><span className='text-[#0148B1] font-semibold'>Experience:</span> 10 years</p>
                            <p className="text-black-600"><span className='text-[#0148B1] font-semibold'>Expertise:</span> Cardiologist, MD</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default BookAppointment;
