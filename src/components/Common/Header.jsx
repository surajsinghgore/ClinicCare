import { useState } from "react";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsCalendarDate } from "react-icons/bs";
import { FaTimes, FaTwitter, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="head h-20 w-full flex py-2 px-4 items-center font-semibold relative bg-white">
      <div className="left w-[180px] flex items-center">
        <img src={logo} alt="Logo" className="w-40 mt-4 ml-2" />
      </div>
      <GiHamburgerMenu 
        onClick={toggleSidebar} 
        className="text-[#004BAA] ml-8 text-2xl cursor-pointer transition-transform hover:scale-110" 
      />
      
      {/* Center Navigation */}
      <div className="center flex-grow flex justify-center space-x-10">
        <NavLink to="/doctors" className="text-black transition-colors duration-300 hover:text-[#004AAD] border-r-2 border-black-400 pr-8" >
          Our Doctors
        </NavLink>
        <NavLink to="/home" className="text-black transition-colors duration-300 hover:text-[#004AAD] border-r-2 border-black-400 pr-8" >
          Find A Clinic
        </NavLink>
        <NavLink to="/about" className="text-black transition-colors duration-300 hover:text-[#004AAD] border-r-2 border-black-400 pr-8" >
          Membership Plan
        </NavLink>
        <NavLink to="/contact" className="text-black transition-colors duration-300 hover:text-[#004AAD] border-r-2 border-black-400 pr-8" >
          Contact
        </NavLink>
        <NavLink to="/bookappointment" className="text-black transition-colors duration-300 hover:text-[#004AAD]" >
          Patient Safety
        </NavLink>
      </div>
      
      {/* Right Button */}
      <div className="right flex items-center">
        <button className="flex items-center rounded overflow-hidden mr-16">
          <span className="bg-[#4CC6DD] p-3 flex items-center justify-center">
            <BsCalendarDate className="text-white text-2xl" />
          </span>
          <span className="bg-[#0148B1] text-white px-2 py-1 flex flex-col items-start text-sm">
            Book An
            <span>Appointment</span>
          </span>
        </button>
      </div>
      
      {/* Sidebar Menu */}
      <div className={`fixed top-0 left-0 h-full bg-white w-72 p-6 shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
        <FaTimes onClick={toggleSidebar} className="text-black text-2xl cursor-pointer absolute top-4 right-4 hover:text-red-600 transition-colors" />
        <div className="flex flex-col items-start">
          <img src={logo} alt="Logo" className="w-56" />
          <h2 className="text-2xl font-semibold mb-7 border-b pb-2 w-full">Contact</h2>
          <p className="text-sm mb-1">+1 234 567 890</p>
          <p className="text-sm mb-10 border-b pb-6 w-full">+1 098 765 432</p>

          <NavLink to="/about" className="text-[#004AAD] text-xl transition-colors duration-300 hover:text-[#4CC6DD] mb-4">
            About Us
          </NavLink>
          <NavLink to="/doctors" className="text-[#004AAD] text-xl transition-colors duration-300 hover:text-[#4CC6DD] mb-4">
            Our Doctors
          </NavLink>
          <NavLink to="/bookappointment" className="text-[#004AAD] text-xl transition-colors duration-300 hover:text-[#4CC6DD] mb-12">
            Book Appointment
          </NavLink>

          <div className="flex space-x-4 mt-auto">
            <FaTwitter className="text-[#1DA1F2] text-3xl cursor-pointer hover:scale-110 transition-transform" />
            <FaInstagram className="text-[#C13584] text-3xl cursor-pointer hover:scale-110 transition-transform" />
            <FaYoutube className="text-[#FF0000] text-3xl cursor-pointer hover:scale-110 transition-transform" />
            <FaFacebook className="text-[#1877F2] text-3xl cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Header;
