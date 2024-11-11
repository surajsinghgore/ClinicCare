import React from 'react';
import clinicImg1 from "../../../src/assets/clinic.jpg";
import clinicImg2 from "../../../src/assets/clinic.jpg";
import aboutclinic from "../../../src/assets/About-Clinic.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";  // Corrected import for Navigation module
import "swiper/css";
import "swiper/css/navigation";
import { FaStethoscope, FaHome, FaCity, FaMapMarkedAlt } from "react-icons/fa";
import { TbMapPinCode } from "react-icons/tb";

const AboutClinic = () => {
  return (
    <>
      <div className="banner mb-10">
        <img src={aboutclinic} alt="Clinic Banner" className="w-full object-cover rounded-md shadow-lg" />
      </div>

      <div className="container mx-auto p-8 lg:p-16 rounded-lg flex lg:flex-row items-center lg:items-start">
        {/* Left Div with Swiper */}
        <div className="w-[50%] lg:w-1/2 flex justify-center items-center mb-10 lg:mb-0">
          <div className="w-3/4 h-[600px] p-4 bg-black-50 rounded-lg shadow-md">
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
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <FaStethoscope />
            </div>
            <p className="font-semibold">About Clinic</p>
          </div>

          <h2 className="text-4xl font-extrabold text-[#0148B1] shadow-sm">Serenity Health Center</h2>

          <p className="text-black-700 text-lg leading-relaxed pl-5">
            Our clinic is dedicated to providing excellent medical services and a comfortable experience to all our patients. We are equipped with state-of-the-art facilities and a team of experienced professionals who are committed to offering compassionate, personalized care. Our focus is on maintaining the highest standards of medical excellence and hygiene, ensuring that each patient feels safe and valued during every visit.
          </p>

          {/* Address Section */}
          <div className="space-y-1">
            <div className="flex items-center text-black-800">
              <span className="bg-blue-100 p-3 rounded-full text-blue-600 flex items-center justify-center mr-4"><FaHome /></span>
              <div className='flex items-center gap-3'>
                <p className="font-semibold">Address:</p>
                <p className="text-black-600">123 Main Street</p>
              </div>
            </div>

            <div className="flex items-center text-black-800">
              <span className="bg-blue-100 p-3 rounded-full text-blue-600 flex items-center justify-center mr-4"><FaCity /></span>
              <div className='flex items-center gap-3'>
                <p className="font-semibold">City:</p>
                <p className="text-black-600">City Name</p>
              </div>
            </div>

            <div className="flex items-center text-black-800">
              <span className="bg-blue-100 p-3 rounded-full text-blue-600 flex items-center justify-center mr-4"><FaMapMarkedAlt /></span>
              <div className='flex items-center gap-3'>
                <p className="font-semibold">State:</p>
                <p className="text-black-600">State Name</p>
              </div>
            </div>

            <div className="flex items-center text-black-800">
              <span className="bg-blue-100 p-3 rounded-full text-blue-600 flex items-center justify-center mr-4"><TbMapPinCode /></span>
              <div className='flex items-center gap-3'>
                <p className="font-semibold">Pincode:</p>
                <p className="text-black-600">123456</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutClinic;
