import React from 'react';
import Header from '../../components/Common/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import sliderImg1 from '../../assets/sliderImg1.png';
import sliderImg2 from '../../assets/sliderImg2.png';
import sliderImg3 from '../../assets/sliderImg3.png';
import sliderImg4 from '../../assets/sliderImg4.png';
import { FaUserMd, FaClinicMedical, FaRegStar, FaTooth } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ClientDashboard = () => {
  return (
    <div className='overflow-x-hidden'>
      <Header />
      
      {/* Swiper Section */}
      <div className="w-screen bg-black-100">
      <div className="max-w-full relative">
        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#004AAD] text-white rounded-full p-2 cursor-pointer z-10">
          <FaChevronLeft size={20} />
        </div>
        <div className="swiper-button-next-custom absolute right-8 top-1/2 transform -translate-y-1/2 bg-[#004AAD] text-white rounded-full p-2 cursor-pointer z-10">
          <FaChevronRight size={20} />
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          className="shadow-lg overflow-hidden"
        >
          <SwiperSlide>
            <img src={sliderImg1} alt="Slide 1" className="w-full h-auto object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={sliderImg2} alt="Slide 2" className="w-full h-auto object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={sliderImg3} alt="Slide 3" className="w-full h-auto object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={sliderImg4} alt="Slide 4" className="w-full h-auto object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
      
      {/* Metrics Section */}
      <div className="bg-[#004AAD] text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-row flex-wrap justify-between items-center">
            
            {/* Metric Card */}
            <div className="flex flex-col items-center bg-white text-black-900 rounded-lg shadow-md p-6 w-48">
              <FaUserMd size={50} className="mb-2" />
              <p className="text-xl font-bold">1200 +</p>
              <p className="text-sm font-semibold">Doctors</p>
            </div>
            
            <div className="flex flex-col items-center bg-white text-black-900 rounded-lg shadow-md p-6 w-48">
              <FaClinicMedical size={50} className="mb-2" />
              <p className="text-xl font-bold">500 +</p>
              <p className="text-sm font-semibold">Clinics</p>
            </div>
            
            <div className="flex flex-col items-center bg-white text-black-900 rounded-lg shadow-md p-6 w-48">
              <FaRegStar size={50} className="mb-2" />
              <p className="text-xl font-bold">2 Lakhs +</p>
              <p className="text-sm font-semibold">Google Reviews</p>
            </div>
            
            <div className="flex flex-col items-center bg-white text-black-900 rounded-lg shadow-md p-6 w-48">
              <FaTooth size={50} className="mb-2" />
              <p className="text-xl font-bold">35,000 +</p>
              <p className="text-sm font-semibold">Cases</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
