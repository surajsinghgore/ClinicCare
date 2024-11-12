import { useEffect } from "react";
import { FaUserAlt, FaSignOutAlt, FaEdit } from "react-icons/fa";
import { MdPassword, MdEventNote } from "react-icons/md";
import { Link } from "react-router-dom";
import UserNav from "./UserNav";

const DashboardNav = () => {
  return (
    <div className="shadow-lg">
      {/* Profile Section */}
      <section className="bg-[#FFFFFF] pb-4 px-4 border-b-[1px] border-black-200">
        <div className="flex items-center ml-1 mt-10 relative">
          <div className="relative group">
            <img 
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="User Profile" 
              className="h-[4.8rem] w-[4.8rem] mr-4 rounded-full object-cover shadow-md" 
            />
            <Link to={"/user-profile-chnage"}>
            <FaEdit 
              className="absolute right-3 inset-0 m-auto p-1 bg-white rounded-full text-black-800 text-3xl cursor-pointer shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              title="Edit Profile"
            />
            </Link>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Tushar Negi</h1>
            <p className="text-sm">User</p>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="h-full w-[16rem] py-5 flex-grow bg-[#FFFFFF]">
        <nav className="flex flex-col justify-between space-y-2">
          <UserNav 
            link="/user-general-details" 
            title="General" 
            icons={<FaUserAlt className="text-2xl text-black-800" />} 
          />
          <UserNav 
            link="/user-password-change" 
            title="Password" 
            icons={<MdPassword className="text-2xl text-black-800" />} 
          />
          <UserNav 
            link="/user-appointment" 
            title="Appointment" 
            icons={<MdEventNote className="text-2xl text-black-800" />} 
          />
          <UserNav 
            link="/auth/login" 
            title="Logout" 
            icons={<FaSignOutAlt className="text-2xl text-black-800" />} 
          />
        </nav>
      </section>
    </div>
  );
};

export default DashboardNav;
