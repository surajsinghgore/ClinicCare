import React, { useEffect, useState } from 'react';
import Header from '../../components/Common/Header';
import about from "../../assets/aboutDoctor2.png";
import { FaMapMarkerAlt, FaGraduationCap, FaStar } from 'react-icons/fa';
import ReviewCard from '../../components/ReviewCard';
import Footer from '../../components/Common/Footer';
import { getDoctorServicesByIdApi } from '../../Utils/services/apis/CommonApi';
import { hideLoader, showLoader } from '../../redux/Slices/LoaderState';
import { showAlert } from '../../redux/Slices/AlertToggleState';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import DoctorDetailsClinicCard from '../../components/Swiper/DoctorDetailsClinicCard';

const DoctorDetails = () => {
    const dispatch = useDispatch();
    const [doctor, setDoctor] = useState([])
    const { id } = useParams()
    const dataFetch = async () => {
        try {
            dispatch(showLoader());
            let res = await getDoctorServicesByIdApi(id);
            if (res?.success) {
                console.log(res)
                setDoctor(res.data)

            }
        } catch (error) {
            console.log(error);
            dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
        } finally {
            dispatch(hideLoader());
        }
    };


    useEffect(() => {
        dataFetch()
    }, [])

    const openGoogleMaps = (lat, lng) => {
        const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        window.open(googleMapsUrl, '_blank');
    };
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
                            src={(doctor?.doctorInfo?.profileUrl) ? doctor?.doctorInfo?.profileUrl : "https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                            alt="Dr. Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Profile Information */}
                    <div className="ml-80 flex flex-col w-full">
                        {/* Name */}
                        <h2 className="text-2xl font-bold text-[#0049AC] mb-2">Dr {(doctor?.doctorInfo?.name) ? doctor?.doctorInfo?.name : "Jenny Doe"}</h2>

                        {/* Location and Qualification */}
                        <div className="flex items-center space-x-6 text-black-700 mb-4">
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="text-orange-500 mr-2" />
                                <span>{(doctor?.clinicInfo?.city) ? doctor?.clinicInfo?.city : "Bengaluru"}</span>
                            </div>
                            <div className="flex items-center">
                                <FaGraduationCap className="text-orange-500 mr-2" />
                                <span>{(doctor?.doctorInfo?.degree) ? doctor?.doctorInfo?.degree : "MDS (Orthodontics)"}</span>
                            </div>
                        </div>

                        {/* Expertise and Experience Section */}
                        <div className="flex items-center justify-around mt-4 gap-10">
                            {/* Expertise */}
                            <div className='w-[70%]'>
                                <h3 className="text-[#0049AC] font-semibold text-lg">Expertise</h3>
                                <p className="text-black-700 mt-1 text-sm leading-relaxed">
                                    {(doctor?.doctorInfo?.specialization) ? doctor?.doctorInfo?.specialization : " Braces, Aligners, Root Canal Treatment (RCT), Teeth Whitening, Smile Design, General Dentistry, Tooth Extraction, Scaling & Polishing"}
                                </p>
                            </div>

                            {/* Experience */}
                            <div>
                                <h3 className="text-[#0049AC] font-semibold text-lg">Experience</h3>
                                <p className="text-black-700 mt-1 text-sm leading-relaxed">
                                    {(doctor?.doctorInfo?.experience) ? doctor?.doctorInfo?.experience : " specialization 300+ Happy Patients "}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* Key Highlights and Accolades Section */}
            <div className="p-6 font-sans flex gap-96 justify-center items-start mt-20">
                <div>
                    <div>
                        {/* Key Highlights */}
                        <h3 className="text-2xl font-semibold text-[#0148B1] mb-4">Key Highlights</h3>
                        <ul className="list-disc list-inside text-lg space-y-2 text-black-700">
                            {(doctor?.doctorInfo?.highlights) ? <>{doctor?.doctorInfo?.highlights.map((item, index) => <li key={index}>{item}</li>)}</> : ""}

                        </ul>
                    </div>

                    <div>

                        {/* Accolades */}
                        <h3 className="text-2xl font-semibold text-[#0148B1] mt-8 mb-4">Likes</h3>
                        <ul className="list-disc list-inside text-lg space-y-2 text-black-700">
                            {(doctor?.doctorInfo?.hobbies) ? <>{doctor?.doctorInfo?.hobbies.map((item, index) => <li key={index}>{item}</li>)}</> : ""}

                        </ul>
                    </div>


                </div>


                {/* book apointment section button */}
                <div className="flex justify-center items-center rounded-lg bg-[#0148B1] p-3">
                    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-[#0148B1] mb-4">Book An Appointment</h2>
                        <p className="text-black-700 mb-6 px-5">
                            Click the button below to schedule an appointment with us.
                        </p>
                        <button
                            className="bg-[#0148B1] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#013a8c] transition duration-200"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>





{/* Doctor Services Section */}
<div className="p-10 font-sans flex justify-center items-start mt-20 bg-black-50">
    <div className="w-full max-w-7xl">
        <h3 className="text-2xl capitalize font-semibold text-black-800 mb-8">
            {doctor?.doctorInfo?.name || "Jenny Doe"} Services
        </h3>
        <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {doctor?.services?.map((item, index) => (
                <div
                    className="flex-shrink-0 w-[320px] rounded-lg shadow-md bg-white p-6 border border-black-200 flex flex-col hover:shadow-lg transition-shadow"
                    key={index}
                >
                    <h3 className="text-lg font-semibold text-black-900 mb-2">
                        {item.treatmentName}
                    </h3>
                    <p className="text-black-500 mb-1">Specialty: <span className="text-black-700">{item.specialty}</span></p>
                    <p className="text-black-500 mb-4">Fees: <span className="text-black-700">${item.fees}</span></p>
                    <Link
                        to={`/book-appointment-form/${item.serviceId}`}
                        className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-all w-full mt-auto"
                    >
                        Book this service
                    </Link>
                </div>
            ))}
        </div>
    </div>
</div>


{/* Clinic Section */}
<div className="p-10 font-sans flex justify-center items-start mt-10">
    <div className="w-full max-w-7xl">
        <h3 className="text-2xl font-semibold text-black-800 mb-8">
            {doctor?.doctorInfo?.name || "Jenny Doe"} Clinic
        </h3>
        <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {doctor?.clinicInfo?.map((item, index) => (
                <div
                    className="flex-shrink-0 w-[320px] rounded-lg shadow-md bg-white p-6 border border-black-200 hover:shadow-lg transition-shadow"
                    key={index}
                >
                    <DoctorDetailsClinicCard ImagesArray={item[0].clinicPhotos} />
                    <h3 className="text-lg capitalize font-semibold text-black-900 mt-4">
                        {item[0].name}
                    </h3>
                    <p className="text-black-500">{item[0].address}</p>
                    <p className="text-black-500">
                        {item[0].city}, {item[0].state}, {item[0].country}
                    </p>
                    <button
                        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all w-full"
                        onClick={() => openGoogleMaps(item[0].lat, item[0].long)}
                    >
                        View clinic location
                    </button>
                </div>
            ))}
        </div>
    </div>
</div>





            <div className="px-32 mt-20 mb-10">
                <h2 className="text-lg font-semibold mb-4">What users are saying about Jane Cooper</h2>
                <div className="flex space-x-4 overflow-x-auto">
                    <ReviewCard />
                    <ReviewCard />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DoctorDetails;
