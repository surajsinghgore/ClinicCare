import React from 'react'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <div className="h-20 w-full flex py-2 px-4 items-center font-medium" style={{ borderBottomColor: '#d3d3d3' }}>
      <div className="left w-[180px] flex items-center">
        <img src={logo} alt="Logo" className="w-full h-full object-cover mt-8 ml-10" />
      </div>
      <div className="center flex-grow flex justify-center space-x-12">
        <a href="#home" className="text-black">Home</a>
        <a href="#about" className="text-black">About Us</a>
        <a href="#contact" className="text-black">Contact</a>
        <a href="#doctors" className="text-black">Our Doctors</a>
      </div>
      <div className="right flex items-center">
        <button className="border text-black-500 px-4 py-2 rounded mr-16" style={{ borderColor: '#004AAD', color: '#004AAD' }}>Signup / Login</button>
      </div>
    </div>
  )
}

export default Header