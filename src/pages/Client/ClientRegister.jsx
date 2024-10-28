import React, { useState } from 'react';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import { FaRegEye, FaRegEyeSlash, FaTrashAlt } from "react-icons/fa";
import clientRegister from "../../assets/clientRegister.jpg";
import { Link } from 'react-router-dom';

const ClientRegister = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setProfileImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setProfileImage(null);
        setProfileImagePreview(null);
        document.getElementById('profileImage').value = "";
    };

    return (
        <div>
            <Header />
            <div className="flex justify-center items-center py-16">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden w-3/4 flex">
                    <div className="w-1/2 hidden md:flex items-center justify-center bg-gradient-to-b from-[#004AAD] to-[#0fa3d1]">
                        <img src={clientRegister} alt="Register" className="w-[80%] object-cover rounded-lg shadow-md" />
                    </div>
                    <div className="w-full md:w-1/2 p-10">
                        <h1 className='text-3xl font-bold mb-2 text-[#004AAD] text-center'>Create Your Account</h1>
                        <p className='text-black-600 mb-8 text-center'>Get started with us in a few easy steps.</p>
                        <form className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label htmlFor="name" className="block text-sm text-black-700 font-medium mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004AAD] focus:border-transparent transition duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="dob" className="block text-sm text-black-700 font-medium mb-1">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="dob"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004AAD] focus:border-transparent transition duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm text-black-700 font-medium mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004AAD] focus:border-transparent transition duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="bloodGroup" className="block text-sm text-black-700 font-medium mb-1">
                                    Blood Group
                                </label>
                                <select
                                    id="bloodGroup"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004AAD] focus:border-transparent transition duration-200"
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="address" className="block text-sm text-black-700 font-medium mb-1">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004AAD] focus:border-transparent transition duration-200"
                                    rows="2"
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="profileImage" className="block text-sm text-black-700 font-medium mb-1">
                                    Profile Image
                                </label>
                                <input
                                    type="file"
                                    id="profileImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 block w-full text-sm text-black-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-[#004AAD] file:text-white hover:file:bg-[#0fa3d1] rounded-md cursor-pointer"
                                />
                                {profileImagePreview && (
                                    <div className="mt-4 relative w-32 h-32">
                                        <img src={profileImagePreview} alt="Profile Preview" className="w-full h-full object-cover rounded-md shadow-md border border-black-300" />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="email" className="block text-sm text-black-700 font-medium mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004AAD] focus:border-transparent transition duration-200"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-span-2 relative">
                                <label htmlFor="password" className="block text-sm text-black-700 font-medium mb-1">
                                    Password
                                </label>
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004AAD] focus:border-transparent transition duration-200"
                                />
                                <div className="absolute inset-y-0 right-4 top-[45%] flex items-center text-sm leading-5">
                                    {passwordVisible ? (
                                        <FaRegEyeSlash onClick={togglePasswordVisibility} className="cursor-pointer text-lg text-black-500" />
                                    ) : (
                                        <FaRegEye onClick={togglePasswordVisibility} className="cursor-pointer text-lg text-black-500" />
                                    )}
                                </div>
                            </div>
                            <div className="col-span-2">
                                <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-[#004AAD] to-[#0fa3d1] text-white rounded-md hover:opacity-90 font-medium transition duration-200 shadow-lg">
                                    Create Account
                                </button>
                            </div>
                            <div className="col-span-2 mt-6 text-center">
                                <span className="text-sm text-black-700 font-medium">Already have an account? </span>
                                <Link to="/auth/login" className="text-sm text-[#004AAD] hover:underline font-medium">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ClientRegister;
