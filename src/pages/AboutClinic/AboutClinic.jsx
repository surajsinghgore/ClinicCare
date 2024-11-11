import React from 'react';
import clinicImg1 from "../../../src/assets/clinic.jpg";
import clinicImg2 from "../../../src/assets/clinic.jpg";
import clinic1 from "../../../src/assets/1.jpg";
import clinic2 from "../../../src/assets/2.jpg";
import clinic3 from "../../../src/assets/3.jpg";
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

const AboutClinic = () => {
  return (
    <>
      <div className="banner mb-10">
        <img src={aboutclinic} alt="Clinic Banner" className="w-full object-cover rounded-md shadow-lg" />
      </div>

      <div className="container mx-auto p-8 lg:p-16 rounded-lg flex lg:flex-row items-center lg:items-start">
        {/* Left Div with Swiper */}
        <div className="w-[50%] lg:w-1/2 flex justify-center items-center mb-10 lg:mb-0">
          <div className="w-3/4 h-[550px] p-4 bg-black-50 rounded-lg shadow-md">
            <Swiper navigation autoplay={{ delay: 1000, disableOnInteraction: false }}
              loop={true} modules={[Navigation]} className="w-full h-full">
              <SwiperSlide>
                <img src={clinicImg1} alt="Clinic 1" className="w-full h-full object-cover rounded-lg shadow-sm" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={clinicImg2} alt="Clinic 2" className="w-full h-full object-cover rounded-lg shadow-sm" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        {/* Right Div */}
        <div className="w-full lg:w-1/2 space-y-8 lg:pl-12">
          {/* Header Section */}
          <div className="flex items-center space-x-4 text-lg text-black-700">
            <div className="p-3 rounded-full text-blue-600">
              <FaStethoscope />
            </div>
            <p className="font-semibold">About Clinic</p>
          </div>

          <h2 className="text-4xl font-extrabold text-[#0148B1] shadow-sm">Serenity Health Center</h2>

          {/* Address Section */}
          <div className="space-y-14">
            <div className='flex gap-5'>
              <div className='flex flex-col'>
                <div className="flex items-center text-lg text-black-800">
                  <span className="bg-blue-100 p-3 rounded-full text-blue-600 flex items-center justify-center "><FaHome /></span>
                  <div className='flex items-center gap-3'>
                    <p className="font-semibold">Address:</p>
                    <p className="text-black-600">123 Main Street</p>
                  </div>
                </div>

                <div className="flex items-center text-lg text-black-800">
                  <span className="bg-blue-100 p-3 rounded-full text-blue-600 flex items-center justify-center "><FaCity /></span>
                  <div className='flex items-center gap-3'>
                    <p className="font-semibold">City:</p>
                    <p className="text-black-600">City Name</p>
                  </div>
                </div>

                <div className="flex items-center text-lg text-black-800">
                  <span className="bg-blue-100 p-3 rounded-full text-blue-600 flex items-center justify-center "><FaMapMarkedAlt /></span>
                  <div className='flex items-center gap-3'>
                    <p className="font-semibold">State:</p>
                    <p className="text-black-600">State Name</p>
                  </div>
                </div>

                <div className="flex items-center text-lg text-black-800">
                  <span className="bg-blue-100 p-3 rounded-full text-blue-600 flex items-center justify-center "><TbMapPinCode /></span>
                  <div className='flex items-center gap-3'>
                    <p className="font-semibold">Pincode:</p>
                    <p className="text-black-600">123456</p>
                  </div>
                </div>
              </div>


              <div className='flex flex-col'>
                <div className="flex items-center text-lg text-black-800">
                  <span className="bg-blue-100 p-3 rounded-full text-blue-600 flex items-center justify-center"><FaPhoneAlt /></span>
                  <div className='flex items-center gap-3'>
                    <p className="font-semibold">Phone:</p>
                    <p className="text-black-600">7623456780</p>
                  </div>
                </div>
              </div>
            </div>


            <button className='rounded bg-[#0148B1] text-white px-6 py-3 font-semibold flex items-center gap-3'><FaSearchLocation className='text' /> View in Map</button>
          </div>
        </div>
      </div>

      {/* profile */}
      <div className="relative p-6 font-sans flex justify-center items-center">
        <div className="relative flex items-center p-8 bg-black-100 rounded-lg shadow-lg w-[85%] mt-12">
          {/* Profile Image */}
          <div className="absolute w-72 h-72 rounded-full overflow-hidden border-4 border-white flex-shrink-0">
            <img
              src="https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              // {(doctor?.doctorInfo?.profileUrl) ? doctor?.doctorInfo?.profileUrl : "https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
              alt="Dr. Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Information */}
          <div className="ml-80 flex flex-col w-full">
            {/* Name */}
            <h2 className="text-3xl font-bold text-[#0049AC] mb-5">Dr Jenny Doe { /* {(doctor?.doctorInfo?.name) ? doctor?.doctorInfo?.name : "Jenny Doe"} */}</h2>

            {/* Location and Qualification */}
            <div className="flex items-center space-x-8 text-black-700 mb-4">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-700 mr-2 text-xl " />

                <span className='text-lg text-black-500'>
                  {/* {(doctor?.clinicInfo?.[0][0]?.city) ? doctor?.clinicInfo?.[0][0].city : "Bengaluru"} */}
                  Bengaluru
                </span>
              </div>
              <div className="flex items-center">
                <FaGraduationCap className="text-blue-700 mr-2 text-xl " />
                <span className='text-lg text-black-500'>
                  {/* {(doctor?.doctorInfo?.degree) ? doctor?.doctorInfo?.degree : "MDS (Orthodontics)"} */}
                  MDS (Orthodontics)
                </span>
              </div>
            </div>

            {/* Expertise and Experience Section */}
            <div className="flex items-center justify-between mt-4 gap-10">
              {/* Expertise */}
              <div className='flex gap-3'>
                <h3 className="text-[#0049AC] font-semibold text-lg">Expertise: </h3>
                <p className="text-black-500 mt-1 text-base leading-relaxed">
                  {/* {(doctor?.doctorInfo?.specialization) ? doctor?.doctorInfo?.specialization : " Braces, Aligners, Root Canal Treatment (RCT), Teeth Whitening, Smile Design, General Dentistry, Tooth Extraction, Scaling & Polishing"} */}
                  Braces, Aligners, Root Canal Treatment (RCT), Teeth Whitening, Smile Design, General Dentistry, Tooth Extraction, Scaling & Polishing
                </p>
              </div>

              {/* Experience */}
              <div className='flex items-center gap-3'>
                <h3 className="text-[#0049AC] font-semibold text-lg">Experience: </h3>
                <p className="text-black-500 mt-1 text-base leading-relaxed">
                  {/* {(doctor?.doctorInfo?.experience) ? doctor?.doctorInfo?.experience : " specialization 300+ Happy Patients "} */}
                  16
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* map marker */}
      <div className="flex justify-center items-center py-10 mt-8">
        <div className="w-full max-w-4xl h-[500px] rounded-lg shadow-lg overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=chandigarh&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>


      {/* clinic work photos */}
      <div className='clinic-img mt-40'>
        <p></p>
        <h1 className='pl-28 text-4xl'>Clinic Work Photos</h1>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img src={clinic1} alt="" /></SwiperSlide>
        <SwiperSlide><img src={clinic2} alt="" /></SwiperSlide>
        <SwiperSlide><img src={clinic3} alt="" /></SwiperSlide>
        <SwiperSlide><img src={clinic1} alt="" /></SwiperSlide>
        <SwiperSlide><img src={clinic2} alt="" /></SwiperSlide>
        <SwiperSlide><img src={clinic3} alt="" /></SwiperSlide>
        <SwiperSlide><img src={clinic1} alt="" /></SwiperSlide>
        <SwiperSlide><img src={clinic2} alt="" /></SwiperSlide>
        <SwiperSlide><img src={clinic3} alt="" /></SwiperSlide>
        
      </Swiper>
      </div>


    </>
  );
};

export default AboutClinic;
