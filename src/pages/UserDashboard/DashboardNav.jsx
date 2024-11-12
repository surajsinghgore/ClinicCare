import { useEffect } from "react";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { MdPassword, MdEventNote } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyDoctorDetails } from "../../redux/Slices/getMyDetailsDoctorSlice";
import UserNav from "./UserNav";


const DashboardNav = () => {
  const dispatch = useDispatch();
  const { getMyDoctorDetails } = useSelector((state) => state.getMyDetailsDoctor);

  useEffect(() => {
    dispatch(fetchMyDoctorDetails());
  }, [dispatch]);

  return (
    <div className="shadow-lg">
      {/* Profile Section */}
      <section className="bg-[#FFFFFF] pb-4 px-4 border-b-[1px] border-black-200">
        <div className="flex items-center ml-1 mt-10">
          <img 
            src={getMyDoctorDetails?.data?.profileUrl} 
            alt="User Profile" 
            className="h-[4.6rem] w-[4.6rem] mr-4 rounded-full object-cover shadow-md" 
          />
          <div>
            <h1 className="text-xl font-semibold">{getMyDoctorDetails?.data?.name}</h1>
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
            link="/user/appointment" 
            title="Appointment" 
            icons={<MdEventNote className="text-2xl text-black-800" />} 
          />
          <UserNav 
            link="/logout" 
            title="Logout" 
            icons={<FaSignOutAlt className="text-2xl text-black-800" />} 
          />
        </nav>
      </section>
    </div>
  );
};

export default DashboardNav;
