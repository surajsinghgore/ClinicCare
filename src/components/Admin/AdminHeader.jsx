import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import adminpanel from "../../assets/adminpanel.png";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../../Utils/LocalStorage';
import { showAlert } from '../../redux/Slices/AlertToggleState';
import { FiSearch } from "react-icons/fi";

const AdminHeader = () => {

  const dispatch = useDispatch();
  const role = getLocalStorage('role')

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    dispatch(showAlert({ message: `${role} has logged out successfully`, type: "blue" }));
    navigate("/auth/login");
  }

  return (
    <div className="h-[80px] bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-10 flex justify-between items-center">
    <div className="flex items-center">
      <img src={adminpanel} alt="Logo" className="h-16 w-16 mr-4 rounded-full object-center" />
      <h1 className="text-2xl font-bold">ClinicCare</h1>
    </div>
    <div className="flex items-center">
      <div className="relative w-80">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <FiSearch className="w-5 h-5 text-black-500 dark:text-black-400"/>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </div>
      <button
          onClick={logout}
          className="flex items-center justify-center ml-4 px-4 py-2 rounded-full bg-red-500 border border-red-600 shadow-lg text-white hover:bg-red-600 hover:shadow-xl transition duration-300 ease-in-out"
        >
          <IoMdLogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
    </div>
  </div>
  )
}

export default AdminHeader
