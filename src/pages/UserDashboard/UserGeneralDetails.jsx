import React from 'react'
import { GrUpdate } from "react-icons/gr";

const UserGeneralDetails = () => {
    return (
        <div>
            <div className="flex justify-center items-center py-16">
                <div className=" overflow-hidden w-[95%] flex">
                    <div className="w-full p-10">
                        <h1 className="flex gap-5 text-3xl font-bold mb-2 text-[#004AAD] text-left">Update Your Details <GrUpdate /></h1>
                        <p className="text-black-600 mb-14 text-left">Make changes to your account information here.</p>
                        <form className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label htmlFor="name" className="block text-sm text-black-700 font-medium mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="email" className="block text-sm text-black-700 font-medium mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-black-700 mb-1">Gender</label>
                                <div className="mt-1 flex space-x-4">
                                    <label htmlFor="male" className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            id="male"
                                            name="gender"
                                            className="hidden peer"
                                        />
                                        <span className="px-6 py-2 border border-black-300 rounded-lg text-black-700 peer-checked:bg-[#004AAD] peer-checked:text-white peer-checked:border-transparent hover:bg-black-100 transition-colors duration-200">
                                            Male
                                        </span>
                                    </label>

                                    <label htmlFor="female" className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            id="female"
                                            name="gender"
                                            className="hidden peer"
                                        />
                                        <span className="px-6 py-2 border border-black-300 rounded-lg text-black-700 peer-checked:bg-[#004AAD] peer-checked:text-white peer-checked:border-transparent hover:bg-black-100 transition-colors duration-200">
                                            Female
                                        </span>
                                    </label>

                                    <label htmlFor="other" className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            id="other"
                                            name="gender"
                                            className="hidden peer"
                                        />
                                        <span className="px-6 py-2 border border-black-300 rounded-lg text-black-700 peer-checked:bg-[#004AAD] peer-checked:text-white peer-checked:border-transparent hover:bg-black-100 transition-colors duration-200">
                                            Other
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="mobile" className="block text-sm text-black-700 font-medium mb-1">
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="dob" className="block text-sm text-black-700 font-medium mb-1">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="dob"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="pincode" className="block text-sm text-black-700 font-medium mb-1">
                                    Pincode
                                </label>
                                <input
                                    type="number"
                                    id="pincode"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="bloodGroup" className="block text-sm text-black-700 font-medium mb-1">
                                    Blood Group
                                </label>
                                <input
                                    type="text"
                                    id="bloodGroup"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm text-black-700 font-medium mb-1">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-sm text-black-700 font-medium mb-1">
                                    State
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-sm text-black-700 font-medium mb-1">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="address" className="block text-sm text-black-700 font-medium mb-1">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    className="mt-1 resize-none block w-full px-4 py-2 border border-black-300 rounded-md"
                                    rows="2"
                                />
                            </div>
                            <div className="col-span-2">
                                <button type="button" className="w-full py-3 px-4 bg-gradient-to-r from-[#004AAD] to-[#0fa3d1] text-white rounded-md font-medium transition duration-200 shadow-lg">
                                    Update Details
                                </button>
                            </div>
                            <div className="col-span-2 mt-6 text-center">
                                <span className="text-sm text-black-700 font-medium">Need more assistance? </span>
                                <a href="#" className="text-sm text-[#004AAD] hover:underline font-medium">
                                    Contact Support
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UserGeneralDetails