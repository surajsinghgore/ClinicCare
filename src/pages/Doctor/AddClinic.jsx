import React, { useState } from 'react';
import BreadCrumbs from '../../components/Common/BreadCrumbs';
import { FaHospitalUser } from 'react-icons/fa';
import { CiCalendarDate } from 'react-icons/ci';
import { FaImages } from 'react-icons/fa';
import { BiSolidClinic } from "react-icons/bi";
import { FaAddressBook } from "react-icons/fa";
import { FaPhoneSquare } from "react-icons/fa";
import { IoMdLocate } from "react-icons/io";

const AddClinic = () => {

  return (
    <div>
      <BreadCrumbs currentPath="Add Clinic" />
      <div className="relative w-[97%] m-auto mt-10 mb-10 rounded-lg shadow-lg p-5">
        {/* form list */}
        <div className="flex p-3 border-b border-black-400 bg-white">
          <div className="flex gap-10 p-4 select-none">
            <div className="flex items-center gap-2 border-b-2 border-blue-400 pb-1">
              <FaHospitalUser className="text-blue-500 text-2xl" />
              <div className="flex flex-col items-center">
                <span className="text-blue-500 font-medium">Clinic Details</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CiCalendarDate className="text-black-500 text-2xl" />
              <span className="text-black-500 font-medium">Availability</span>
            </div>
            <div className="flex items-center gap-2">
              <FaImages className="text-black-500 text-2xl" />
              <span className="text-black-500 font-medium">Upload File</span>
            </div>
          </div>
        </div>



        <form>
          {/* Input Fields Container */}
          <div className="flex flex-wrap p-8 gap-8">
            <div className="flex flex-col gap-2 mr-8">
              <div className="flex items-center">
                <label className="text-black-500 font-medium" htmlFor="degree">
                  Clinic Name <span className="text-danger text-lg">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="degree"
                  id="degree"
                  required
                  autoComplete='off'
                  className="border border-black-300 p-2 rounded-md w-80 pl-10"
                  placeholder="Enter your degree"
                />
                <BiSolidClinic className="absolute left-3 top-3 text-black-400" />
              </div>
            </div>

            <div className="flex flex-col gap-2 mr-8">
              <div className="flex items-center gap-2">
                <label className="text-black-500 font-medium" htmlFor="licenseNumber">
                  Address <span className="text-danger text-lg">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="licenseNumber"
                  id="licenseNumber"
                  required
                  autoComplete='off'
                  className="border border-black-300 p-2 rounded-md w-80 pl-10"
                  placeholder="Enter your license number"
                />
                <FaAddressBook className="absolute left-3 top-3 text-black-400" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="text-black-500 font-medium" htmlFor="experience">
                  Contact <span className="text-danger text-lg">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="experience"
                  id="experience"
                  required
                  autoComplete='off'
                  className="border border-black-300 p-2 rounded-md w-80 pl-10"
                  placeholder="Enter your experience"
                />
                <FaPhoneSquare className="absolute left-3 top-3 text-black-400" />
              </div>
            </div>
          </div>


          <div className='mt-5'>
            <h3 className='ml-8 text-black-500 font-medium mb-2'>Location <span className="text-danger text-lg">*</span></h3>
            <button className="location w-[26.6%] p-3 rounded-lg border border-black-300 ml-8">
              <div className="icon&text flex items-center gap-3">
                <IoMdLocate className='text-[#EF4F5F] text-md' />
                <h3 className='text-lg text-[#EF4F5F]'>Detect current location</h3>
              </div>
              <div className='text-left pl-7'>
                <p className='text-sm text-black-300'>Using GPS</p>
              </div>
            </button>
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 duration-200 text-white m-8 shadow-lg font-semibold py-2 px-3 rounded-md ml-[87%]">
            Save & Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClinic;
