import React from 'react';
import { IoMdLogOut } from "react-icons/io";
import adminpanel from "../../assets/adminpanel.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { getLocalStorage } from '../../Utils/LocalStorage';

export default DoctorHeader = () => {
  const dispatch = useDispatch();
  const role = getLocalStorage('role')

  const navigate = useNavigate()
  const logout = () => {
    navigate("/auth/login")
    localStorage.clear();
    dispatch(showAlert({ message: `${role} has logged out successfully`, type: "blue" }));
  }

  return (
    <div className="h-[80px] bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-10 flex justify-between items-center">
      <div className="flex items-center">
        <img src={adminpanel} alt="Logo" className="h-16 w-16 mr-4 rounded-full object-center" />
        <h1 className="text-2xl font-bold">ClinicCare</h1>
      </div>
      <div className="flex items-center">
        <div className="relative w-80"> {/* Added width here */}
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
        <button onClick={() => logout()} className="ml-4 px-2 py-2 rounded-full border border-black shadow-md text-white relative">
          <IoMdLogOut className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

