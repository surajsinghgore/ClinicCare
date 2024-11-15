import { useEffect, useState } from 'react';
import aboutclinic from "../../../src/assets/About-Clinic.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";  // Corrected import for Navigation module
import "swiper/css";
import "../../../src/index.css"
import "swiper/css/navigation";
import { Pagination } from 'swiper/modules';
import { FaStethoscope, FaHome, FaCity, FaMapMarkedAlt } from "react-icons/fa";
import { TbMapPinCode } from "react-icons/tb";
import { FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';
import { FaPhoneAlt } from "react-icons/fa";
import { FaSearchLocation } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import CountUp from 'react-countup';
import { SlCalender } from "react-icons/sl";
import { getClinicDetailsByIdApi } from '../../Utils/services/apis/CommonApi';
import { hideLoader, showLoader } from '../../redux/Slices/LoaderState';
import { showAlert } from '../../redux/Slices/AlertToggleState';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import "swiper/css";
const AboutClinic = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState([])
  const [clinic, setClinic] = useState([])
  const [service, setService] = useState([])
  const [stat, setState] = useState({})

  // Fetch data when limit or page changes
  const dataFetch = async () => {
    try {
      dispatch(showLoader());
      let res = await getClinicDetailsByIdApi(id);

      if (res?.status) {
        setService(res.services)
        setClinic(res.clinic)
        setDoctor(res.doctor)
        setState(res.stats)
      }
    } catch (error) {
      console.log(error);
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  function convertTo12HourFormat(time24) {
    // Split the time into hours and minutes
    const [hours, minutes] = time24.split(':');

    // Convert the string to an integer for hours
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';

    // Adjust the hour for 12-hour format
    hour = hour % 12;
    hour = hour ? hour : 12; // If hour is 0, set it to 12 (for 12:00 AM)

    // Format the hour and minutes
    const formattedTime = `${hour < 10 ? '0' : ''}${hour}:${minutes} ${ampm}`;

    return formattedTime;
  }

  const openGoogleMaps = (lat, lng) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <>
      <div className="banner mb-10">
        <img src={aboutclinic} alt="Clinic Banner" className="w-full object-cover shadow-lg" />
      </div>

      <div className="container mx-auto p-8 lg:p-16 rounded-lg flex lg:flex-row items-center lg:items-start">
        {/* Left Div with Swiper */}
        <div className="w-[50%] lg:w-1/2 flex justify-center items-center mb-10 lg:mb-0">
          <div className="w-3/4 h-[550px] p-4 bg-black-50 rounded-lg shadow-md">
            <Swiper
              navigation
              loop={true}
              autoplay={{
                delay: 2000, // Time delay in ms for autoplay (2 seconds here)
                disableOnInteraction: false, // Keep autoplay after interacting
              }}
              modules={[Autoplay, Navigation]} // Make sure to include both modules
              className="w-full h-full"
            >
              {clinic?.clinicPhotos?.length > 0 ? (
                clinic.clinicPhotos.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={url}
                      alt={`Clinic ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg shadow-sm"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <p>No clinic photos available.</p>
              )}
            </Swiper>
          </div>
        </div>

        {/* Right Div (About Clinic Section) */}
        <div className="w-full lg:w-1/2 space-y-8 lg:pl-12">
          {/* Header Section */}
          <div className="flex items-center text-lg text-black-700">
            <div className="p-3 rounded-full text-blue-600">
              <FaStethoscope />
            </div>
            <p className="font-semibold">About Clinic</p>
          </div>

          <h2 className="text-4xl font-extrabold text-[#0148B1]">{clinic?.name}</h2>

          {/* Address Section */}
          <div className="space-y-14">
            <div className='flex gap-5'>
              <div className='flex flex-col'>
                <div className="flex items-center text-lg text-black-800">
                  <span className="p-3 rounded-full text-blue-600 flex items-center justify-center "><FaHome /></span>
                  <div className='flex items-center gap-3'>
                    <p className="font-semibold">Address:</p>
                    <p className="text-black-600">{clinic?.address}</p>
                  </div>
                </div>

                <div className="flex items-center text-lg text-black-800">
                  <span className="p-3 rounded-full text-blue-600 flex items-center justify-center "><FaCity /></span>
                  <div className='flex items-center gap-3'>
                    <p className="font-semibold">City:</p>
                    <p className="text-black-600">{clinic?.city}</p>
                  </div>
                </div>

                <div className="flex items-center text-lg text-black-800">
                  <span className="p-3 rounded-full text-blue-600 flex items-center justify-center "><FaMapMarkedAlt /></span>
                  <div className='flex items-center gap-3'>
                    <p className="font-semibold">State:</p>
                    <p className="text-black-600">{clinic?.state}</p>
                  </div>
                </div>

                <div className="flex items-center text-lg text-black-800">
                  <span className="p-3 rounded-full text-blue-600 flex items-center justify-center "><TbMapPinCode /></span>
                  <div className='flex items-center gap-3'>
                    <p className="font-semibold">Pincode:</p>
                    <p className="text-black-600">{clinic?.pincode}</p>
                  </div>
                </div>
              </div>

              <div className='flex flex-col'>
                <div className="flex items-center text-lg text-black-800">
                  <span className="p-3 rounded-full text-blue-600 flex items-center justify-center"><FaPhoneAlt /></span>
                  <div className='flex items-center gap-3'>
                    <p className="font-semibold">Phone:</p>
                    <p className="text-black-600">{clinic?.contactNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            <button className='rounded bg-[#0148B1] text-white px-6 py-3 font-semibold flex items-center gap-3' onClick={() => openGoogleMaps(clinic?.lat, clinic?.long)}>
              <FaSearchLocation className='text' /> View in Map
            </button>
          </div>
        </div>
      </div>



      {/* Counter Section */}
      <div className="flex justify-around items-center mt-20 mb-20 px-3" >
        {/* Total Appointments Card */}
        <div className="w-1/5 bg-[#005BCA] p-6 rounded-lg shadow-lg flex flex-col items-center transform transition-transform duration-300 hover:scale-105" >
          <h3 className="text-xl mb-4 font-semibold text-white capitalized tracking-wide">Total Appointments</h3>
          <hr className="border-t-2 w-full border-white opacity-50 mb-4" />
          <CountUp end={stat?.totalAppointments} duration={2.5} className="text-3xl font-bold text-white" />
        </div>

        {/* Total Services Card */}
        <div className="w-1/5 bg-[#005BCA] p-6 rounded-lg shadow-lg flex flex-col items-center transform transition-transform duration-300 hover:scale-105" >
          <h3 className="text-xl mb-4 font-semibold text-white capitalized tracking-wide">Total Services</h3>
          <hr className="border-t-2 w-full border-white opacity-50 mb-4" />
          <CountUp end={stat?.totalServices} duration={2.5} className="text-3xl font-bold text-white" />
        </div>

        {/* Today's Appointments Card */}
        <div className="w-1/5 bg-[#005BCA] px-4 py-6 rounded-lg shadow-lg flex flex-col items-center transform transition-transform duration-300 hover:scale-105" >
          <h3 className="text-xl mb-4 font-semibold text-white capitalized tracking-wide">Today's Appointments</h3>
          <hr className="border-t-2 w-full border-white opacity-50 mb-4" />
          <CountUp end={stat?.
            todayAppointments
          } duration={2.5} className="text-3xl font-bold text-white" />
        </div >

        {/* Upcoming Appointments Card */}
        <div className="w-1/5 bg-[#005BCA] px-3 py-6 rounded-lg shadow-lg flex flex-col items-center transform transition-transform duration-300 hover:scale-105" >
          <h3 className="text-xl mb-4 font-semibold text-white capitalized tracking-wide">Upcoming Appointment</h3>
          <hr className="border-t-2 w-full border-white opacity-50 mb-4" />
          <CountUp end={stat?.upcomingAppointments} duration={2.5} className="text-3xl font-bold text-white" />
        </div >
      </div >








      {/* profile */}
      <div className="relative p-6 font-sans flex justify-center items-center" >
        <div className="relative flex items-center p-8 bg-black-100 rounded-lg shadow-lg w-[85%] mt-12">
          {/* Profile Image */}
          <div className="absolute w-72 h-72 rounded-full overflow-hidden border-4 border-white flex-shrink-0">
            <img
              src={(doctor.profileUrl) ? doctor.profileUrl : "https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
              // {(doctor?.doctorInfo?.profileUrl) ? doctor?.doctorInfo?.profileUrl : "https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
              alt="Dr. Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Information */}
          <div className="ml-80 flex flex-col w-full">
            {/* Name */}
            <h2 className="text-3xl font-bold text-[#0049AC] mb-5">{doctor?.name} { /* {(doctor?.doctorInfo?.name) ? doctor?.doctorInfo?.name : "Jenny Doe"} */}</h2>

            {/* Location and Qualification */}
            <div className="flex items-center space-x-8 text-black-700 mb-4">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-700 mr-2 text-xl " />

                <span className='text-lg text-black-500'>
                  {/* {(doctor?.clinicInfo?.[0][0]?.city) ? doctor?.clinicInfo?.[0][0].city : "Bengaluru"} */}
                  {clinic?.city}
                </span>
              </div>
              <div className="flex items-center">
                <FaGraduationCap className="text-blue-700 mr-2 text-xl " />
                <span className='text-lg text-black-500'>
                  {/* {(doctor?.doctorInfo?.degree) ? doctor?.doctorInfo?.degree : "MDS (Orthodontics)"} */}
                  {doctor?.degree}
                </span>
              </div>
            </div>

            {/* Expertise and Experience Section */}
            <div className="flex items-center justify-between mt-4 gap-10">
              {/* Expertise */}
              <div className='flex gap-3'>
                <h3 className="text-[#0049AC] font-semibold text-lg">Highlights: </h3>
                <p className="text-black-500 mt-1 text-base leading-relaxed">
                  {doctor?.highlights && doctor?.highlights.length > 0
                    ? doctor.highlights.map((item, index) => (
                      <span key={index}>
                        {item}{index < doctor.highlights.length - 1 && ", "}
                      </span>
                    ))
                    : ""}

                </p>

              </div>

              {/* Experience */}
              <div className='flex items-center gap-3'>
                <h3 className="text-[#0049AC] font-semibold text-lg">Experience: </h3>
                <p className="text-black-500 mt-1 text-base leading-relaxed">
                  {/* {(doctor?.doctorInfo?.experience) ? doctor?.doctorInfo?.experience : " specialization 300+ Happy Patients "} */}
                  {doctor?.experience}
                </p>
              </div>

            </div>

          </div>
        </div>
      </div >



      {/* map marker */}
      <div className="flex justify-center items-center py-10 mt-8">
        <div className="w-full max-w-[78rem] h-[500px] rounded-lg shadow-lg overflow-hidden">
          <iframe
            src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${clinic.lat},${clinic.long}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>





      {/* clinic working days */}
      <div className="container mx-auto py-12 px-36 lg:px-10 mt-16">
        <p className='flex items-center text-lg gap-3 text-black-600 font-semibold mb-5'>
          <SlCalender className='text-[#005BCA]' /> Working Days
        </p>
        <h2 className="text-3xl font-extrabold text-left text-blue-700 mb-10">Clinic Weekly Schedule</h2>
        <div className="overflow-hidden rounded-lg shadow-md">
          <table className="min-w-full bg-black-50">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <th className="py-4 px-6 font-semibold text-center text-lg">Day</th>
                <th className="py-4 px-6 font-semibold text-center text-lg">Opening Time</th>
                <th className="py-4 px-6 font-semibold text-center text-lg">Closing Time</th>
              </tr>
            </thead>
            <tbody>
              {/* Ensure clinic.day exists and is an array */}
              {clinic?.day && Array.isArray(clinic.day) && clinic.day.length > 0 ? (
                clinic.day.map((entry, index) => (
                  <tr
                    key={index}
                    className={`transition-colors duration-200 ${entry.status === 'closed'
                      ? 'bg-red-50 text-red-500'
                      : 'bg-white hover:bg-blue-50'
                      }`}
                  >
                    <td className="py-5 px-6 text-black-800 font-medium text-center">{entry.name}</td>
                    <td
                      className={`py-5 px-6 text-center font-semibold ${entry.status === 'closed' ? 'text-danger' : 'text-blue-700'}`}
                    >
                      {entry.status === 'closed' ? 'Closed' : convertTo12HourFormat(entry.openingTime)}
                    </td>
                    <td
                      className={`py-5 px-6 text-center font-semibold ${entry.status === 'closed' ? 'text-danger' : 'text-blue-700'}`}
                    >
                      {entry.status === 'closed' ? 'Closed' : convertTo12HourFormat(entry.closingTime)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">No schedule available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>





      {/* services */}

      <div className="w-[90%] mx-auto p-8 mt-14 shadow-lg rounded-xl ">
        <h2 className="text-3xl font-bold text-center mb-4 text-black-800">Choose Your Service from <Link to={`/doctor-details/${service?.doctor?._id}`} className='hover:text-danger'>

          {service?.doctor?.name} </Link></h2>
        <p className="text-center text-black-500 mb-10 text-lg">
          Choose the service that suits your needs best.
        </p>

        <div className="flex items-start justify-start gap-8 flex-wrap">
          {/* Basic Plan */}
          {service.length !== 0 && (
            <>
              {service?.map((details) => (
                <div
                  key={details?.serviceId}
                  className="w-[31.5%] p-6 bg-white border border-black-200 rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-300 ease-out"
                >
                  <h3 className="text-2xl font-semibold mb-2 text-black-800">{details?.treatmentName}</h3>
                  <p className="text-black-500 mb-6">{details?.description}</p>
                  <p className="text-3xl font-bold mb-8 text-blue-600">
                    ${details?.fees} <span className="text-lg font-medium text-black-500">/ {details?.duration} min</span>
                  </p>
                  <ul className="mb-8 space-y-3 text-black-600">
                    <li>specialty: {details?.specialty}</li>
                    <li>clinic name: {clinic?.name}</li>
                    <li onClick={() => openGoogleMaps(clinic?.lat, clinic?.long)} className='cursor-pointer'>address: {clinic?.address}</li>
                  </ul>
                  <Link to={`/user/book-appointment-form/${details?.serviceId}`} className="px-4 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200">
                    Book Appointment
                  </Link>
                </div>
              ))}
            </>
          )}


        </div>
      </div>







      {/* clinic work photos */}
      <div className='clinic-img mt-28 w-[90%] m-auto'>
        <p className='pl-32 flex items-center text-lg gap-3 mb-5 font-semibold text-black-600'>
          <FaCamera className='text-[#0049AC]' /> Clinic Images
        </p>
        <h1 className='pl-32 text-4xl font-bold text-[#0049AC]'>Clinic Work Photos</h1>
        <Swiper
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={10}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}


          modules={[Pagination]}
          className="mySwiper"
        >
          {clinic.workPhotos && clinic.workPhotos.length > 0 ? (
            clinic.workPhotos.map((photo, index) => (
              <SwiperSlide key={index}>
                <div className='h-80'>
                  <img src={photo} alt={`clinic work photo ${index + 1}`} className='h-full w-full object-cover' />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <p>No work photos available</p>
            </SwiperSlide>
          )}
        </Swiper>
      </div>










    </>
  );
};

export default AboutClinic;
