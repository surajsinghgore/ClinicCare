import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import otpverify from '../assets/otpverify.png'

const OtpVerify = () => {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [reEnterPasswordVisible, setReEnterPasswordVisible] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(''));

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  const toggleReEnterPasswordVisibility = () => {
    setReEnterPasswordVisible(!reEnterPasswordVisible);
  }

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  }

  return (
    <div className="flex justify-center items-center mt-7 gap-32">
      <div className="w-[37%] flex justify-center items-center">
        <img src={otpverify} alt="OTP Verification" className="w-full object-cover ml-56" />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="border rounded-lg p-8 mr-56" style={{ borderColor: '#d3d3d3' }}>
          <h2 className="text-2xl font-bold mb-6 text-black-700 border-b-2 border-black-200 pb-4">OTP Verification</h2>
          <p className="mb-4">Please enter the 6-digit OTP sent to your registered email.</p>
          <div className="mb-10 flex space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                maxLength="1"
                className="w-12 h-12 text-center border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
              />
            ))}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="new-password" className="block text-sm text-gray-700 font-medium">Enter New Password:</label>
            <input type={passwordVisible ? "text" : "password"} id="new-password" className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]" />
            <div className="absolute inset-y-0 right-0 top-[35%] pr-3 flex items-center text-sm leading-5">
              {passwordVisible ? (
                <FaRegEyeSlash onClick={togglePasswordVisibility} className="cursor-pointer text-lg" />
              ) : (
                <FaRegEye onClick={togglePasswordVisibility} className="cursor-pointer text-lg" />
              )}
            </div>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="re-enter-password" className="block text-sm text-gray-700 font-medium">Re-enter Password:</label>
            <input type={reEnterPasswordVisible ? "text" : "password"} id="re-enter-password" className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]" />
            <div className="absolute inset-y-0 right-0 top-[35%] pr-3 flex items-center text-sm leading-5">
              {reEnterPasswordVisible ? (
                <FaRegEyeSlash onClick={toggleReEnterPasswordVisibility} className="cursor-pointer text-lg" />
              ) : (
                <FaRegEye onClick={toggleReEnterPasswordVisibility} className="cursor-pointer text-lg" />
              )}
            </div>
          </div>
          <button type="button" className="w-full py-2 px-4 bg-[#004AAD] text-white rounded-md hover:bg-[#0fa3d1] font-medium">Change Password</button>
        </div>
      </div>
    </div>
  )
}

export default OtpVerify