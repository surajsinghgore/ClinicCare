import  { useEffect } from "react";
import { FaRegHospital } from "react-icons/fa";
import LeftNavLink from "../Common/LeftNavLink";
import { BiClinic } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyDoctorDetails } from "../../redux/Slices/getMyDetailsDoctorSlice";
import { FaListAlt } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";

const DoctorNavbar = () => {
  const dispatch = useDispatch();

  const { getMyDoctorDetails } = useSelector((state) => state.getMyDetailsDoctor);
  useEffect(() => {
    dispatch(fetchMyDoctorDetails());
  }, [dispatch]);
  return (
    <div className="shadow-lg">
      <section className="bg-[#FFFFFF] pb-4 px-4 border-b-[1px] border-black-200">
        <div className="flex items-center ml-1 mt-10">
          <img src={getMyDoctorDetails?.data?.profileUrl} alt="Admin" className="h-[4.6rem] w-[4.6rem] mr-4 rounded-full object-cover object-top shadow-md" />
          <div>
            <h1 className="text-xl font-semibold">{getMyDoctorDetails?.data?.name}</h1>
            <p className="text-sm">Doctor</p>
          </div>
        </div>
      </section>
      <section className="h-screen py-5 flex-grow bg-[#FFFFFF]">
        <nav className="flex flex-col justify-between">
            <LeftNavLink 
                link="/doctor" 
                title="Clinic" 
                icons={<FaRegHospital className=" icon text-2xl text-black-800" />} 
                submenuItems={[
                    { link: "/doctor/add-clinic-page1", title: "Add Clinic", icon: <BiClinic className=" icon text-2xl text-black-800" /> },
                    { link: "/doctor/clinics-list?page=1&limit=10", title: "Clinic List", icon: <FaListAlt className=" icon text-2xl text-black-800" /> },
                ]}
            />
            <LeftNavLink 
                link="/doctor" 
                title="Sevices" 
                icons={<FaRegHospital className=" icon text-2xl text-black-800" />} 
                submenuItems={[
                    { link: "/doctor/add-services", title: "Add Services", icon: <FaHospitalUser className=" icon text-2xl text-black-800" /> },
                    { link: "/doctor/services-list?page=1&limit=10", title: "View Services", icon: <FaClipboardList className=" icon text-2xl text-black-800" /> },
                ]}
            />
        </nav>
      </section>
    </div>
  );
};

export default DoctorNavbar;
