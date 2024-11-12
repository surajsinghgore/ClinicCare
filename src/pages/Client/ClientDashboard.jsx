import React, { useEffect, useState } from 'react';
import Header from '../../components/Common/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import sliderImg1 from '../../assets/sliderImg1.png';
import sliderImg2 from '../../assets/sliderImg2.png';
import sliderImg3 from '../../assets/sliderImg3.png';
import sliderImg4 from '../../assets/sliderImg4.png';
import banner from '../../assets/banner.webp';
import { FaUserMd, FaClinicMedical, FaRegStar, FaTooth } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsCalendarDate } from "react-icons/bs";
import Footer from '../../components/Common/Footer';
import { useNavigate } from 'react-router-dom';
import { getTotalPlatformStatsApi } from '../../Utils/services/apis/CommonApi';
import { hideLoader, showLoader } from '../../redux/Slices/LoaderState';
import { showAlert } from '../../redux/Slices/AlertToggleState';
import { useDispatch } from 'react-redux';

const ClientDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [stats, setStats] = useState({})
  const safetyData = [
    {
      image: "https://clovedental.in/wp-content/themes/clove-child/images/safety1-min.webp",
      title: "10x Safety",
      description:
        "Enhanced Safety: Protocols combating various health concerns under WHO guidelines to ensure 100% sterile clinic for staff, patients, and attendants.",
    },
    {
      image: "https://clovedental.in/wp-content/themes/clove-child/images/clove-promise-img.webp",
      title: "Quality",
      description:
        "Quality being the core value of the organization, the dedicated Quality Team at ClinicCare ensures the clinics provide the highest standards.",
    },
    {
      image: "https://clovedental.in/wp-content/themes/clove-child/images/sterilization-img.webp",
      title: "4 Step Sterilization",
      description:
        "Our 4-step sterilization process differentiates ClinicCare from all other healthcare facilities by ensuring the highest levels of safety.",
    },
    {
      image: "https://clovedental.in/wp-content/themes/clove-child/images/PPE-desktop-1.webp",
      title: "Safety Equipment",
      description:
        "ClinicCare now has extensive PPE (Personal Protective Equipment) for all healthcare providers, ensuring safety for both staff and patients.",
    },
    {
      image: "https://clovedental.in/wp-content/themes/clove-child/images/equipment-technology-img.webp",
      title: "Equipment & Technology",
      description:
        "Our modern facilities offer the latest in medical technology and equipment, with continually trained staff for the highest quality care.",
    },
  ];

  const dataFetch = async () => {
    try {
      dispatch(showLoader());
      let res = await getTotalPlatformStatsApi();

      if (res?.status) {
        setStats(res)
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

  return (
    <>
      <Header />

      {/* banner */}
      <div className="banner w-full">
        <img src={banner} alt="banner img" />
      </div>


      {/* cards */}
      <div className="cards">
        <div className="bg-[#e6f7fb] py-24 px-4 h-[38rem]">
          <h2 className="text-center text-2xl font-semibold text-blue-800 mb-2">Why Choose</h2>
          <h1 className="text-center text-5xl font-bold  mb-8">Clinic Care</h1>
          <p className="text-center max-w-4xl mx-auto text-black-600 mb-12">
            ClinicCare is a trusted platform designed to make healthcare accessible and convenient for everyone. With our seamless and fast doctor booking system, patients from any region can effortlessly book appointments with top-rated doctors specializing in various fields. ClinicCare allows users to explore detailed profiles of our doctors, including their specializations, experience, and successful case histories, ensuring you find the right care provider for your needs. Choose ClinicCare for a streamlined healthcare experience that puts quality care and patient convenience first.
          </p>

          <div className="flex justify-center gap-16">
            {/* Doctor Card */}
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xs text-center">
              <img src="https://img.icons8.com/ios-filled/100/4a90e2/doctor-male.png" alt="Doctor" className="mx-auto mb-4" />
              <h3 className="text-2xl font-semibold ">Qualified Doctors</h3>
              <p className="text-black-700 mt-2">
                Our doctors are highly qualified and specialize in various medical fields, ensuring precise diagnoses and optimal treatments.
              </p>
            </div>

            {/* Clinic Card */}
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xs text-center">
              <img src="https://img.icons8.com/ios-filled/100/4a90e2/hospital-room.png" alt="Clinic" className="mx-auto mb-4" />
              <h3 className="text-2xl font-semibold ">Modern Clinics</h3>
              <p className="text-black-700 mt-2">
                Our clinics are equipped with advanced medical technology and amenities for the best patient care experience.
              </p>
            </div>

            {/* Cases Card */}
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xs text-center">
              <img src="https://img.icons8.com/ios-filled/100/4a90e2/health-checkup.png" alt="Cases" className="mx-auto mb-4" />
              <h3 className="text-2xl font-semibold ">Successful Cases</h3>
              <p className="text-black-700 mt-2">
                Our expertise in handling complex cases has led to numerous success stories, providing hope and healing to patients.
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* book appointment */}
      <div className="booking bg-gradient-to-r from-blue-500 to-blue-600 w-full h-56 mt-56 flex items-center justify-around">
        <h1 className='text-white text-4xl max-w-64'>Opt for the
          Healthcare you
          deserve!</h1>

        <button className='bg-messageWarning p-3 rounded-full text-xl' onClick={() => navigate('/book-appointment')}>Book Appointment Now</button>
      </div>




      {/* patient safety */}
      <div className="patient-safety-container">
        <h1 className='mb-10 underline'>Patient Safety</h1>
        <div className="safety-columns">
          {/* Left Column - Full Column for the first item */}
          <div className="safety-column full-column">
            <div className="safety-card">
              <img src={safetyData[0].image} alt={safetyData[0].title} />
              <h2>{safetyData[0].title}</h2>
              <p>{safetyData[0].description}</p>
            </div>
          </div>

          {/* Center Column - Two rows */}
          <div className="safety-column half-column">
            {safetyData.slice(1, 3).map((item, index) => (
              <div className="safety-card" key={index}>
                <img src={item.image} alt={item.title} />
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          {/* Right Column - Two rows */}
          <div className="safety-column half-column">
            {safetyData.slice(3, 5).map((item, index) => (
              <div className="safety-card" key={index}>
                <img src={item.image} alt={item.title} />
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>




      {/* footer */}
      <Footer />
    </>

  );
};

export default ClientDashboard;
