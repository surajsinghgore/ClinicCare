import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { TiEdit } from "react-icons/ti";
import { FaUser, FaEnvelope, FaTransgender, FaTint } from "react-icons/fa";
import { FaUserDoctor, FaClock, FaStethoscope, FaPhoneFlip  } from "react-icons/fa6";
import { IoDocuments } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { GoNumber } from "react-icons/go";
import { FaRupeeSign } from "react-icons/fa";
import { BiMessageRoundedError } from "react-icons/bi";
import AppointmentDetails from "../../../components/Doctor/AppointmentDetails";

const EditAppointment = () => {
  return (
    <div>
      {/* BreadCrumbs for navigation */}
      <BreadCrumbs currentPath={"Edit Appointment Form-1"} />

      {/* Container for the whole content */}
      <div className="p-8 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
        {/* Heading Section */}
        <div className="heading mb-6">
          <h1 className="flex gap-4 text-3xl font-medium underline">
            Edit Appointment
            <TiEdit size={35} className="text-[#034EB0]" />
          </h1>
        </div>

        {/* steps for form */}
        <div className="flex p-3 items-center justify-center mb-10 bg-white">
          <div className="flex gap-10 p-4 select-none">
            <div className="flex items-center gap-2 border-b-2 border-[#034EB0] pb-1">
              <IoDocuments className="text-[#034EB0] text-2xl" />
              <span className="text-[#034EB0] font-medium">Form 1</span>
            </div>
            <div className="flex items-center gap-2">
              <IoDocuments className="text-black-500 text-2xl" />
              <span className="text-black-500 font-medium">Form 2</span>
            </div>
          </div>
        </div>

        {/* Profile Image and Name Centered */}
        <div className="center flex flex-col items-center justify-center mb-14">
          <div className="img-circle w-52 h-52 rounded-full overflow-hidden border-2 border-black">
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="profile image"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-3 text-2xl font-medium">Suraj Singh</p>
        </div>

        {/* Read-only input fields */}
        <div className="mt-4 mb-10 grid grid-cols-4 gap-5">
          <AppointmentDetails
            field={"Appointment ID"}
            value={1}
            icon={<FaUser />}
          />
          <AppointmentDetails
            field={"Patient Name"}
            value={"Suraj Singh"}
            icon={<FaUser />}
          />
          <AppointmentDetails
            field={"Email"}
            value={"surajsingh69@gmail.com"}
            icon={<FaEnvelope />}
          />
          <AppointmentDetails
            field={"Gender"}
            value={"Male"}
            icon={<FaTransgender />}
          />
          <AppointmentDetails
            field={"Age"}
            value={"21"}
            icon={<GoNumber  />}
          />
          <AppointmentDetails
            field={"Phone No"}
            value={"9087564512"}
            icon={<FaPhoneFlip />}
          />
          <AppointmentDetails
            field={"Blood Group"}
            value={"B+"}
            icon={<FaTint />}
          />
          <AppointmentDetails
            field={"Doctor Specialty"}
            value={"Orthopedics"}
            icon={<FaUserDoctor />}
          />
          <AppointmentDetails
            field={"Appointment Date"}
            value={"15 Nov 2024"}
            icon={<MdDateRange />}
          />
          <AppointmentDetails
            field={"Appointment Time"}
            value={"6:00 PM"}
            icon={<FaClock />}
          />
          <AppointmentDetails
            field={"Treatment Name"}
            value={"Ortho Surgery"}
            icon={<FaStethoscope />}
          />
          <AppointmentDetails
            field={"Transaction ID"}
            value={"AQ12309FARD56"}
            icon={<GrTransaction />}
          />
          <AppointmentDetails
            field={"Fees"}
            value={"₹20,000"}
            icon={<FaRupeeSign />}
          />
          <AppointmentDetails
            field={"Amount Received"}
            value={"₹20,005"}
            icon={<FaRupeeSign />}
          />
          <AppointmentDetails
            field={"Transaction Status"}
            value={"Fulfilled"}
            icon={<BiMessageRoundedError />}
          />
        </div>

        {/* buttons */}
        <div className="btn flex justify-end gap-3">
            <button className="px-5 font-medium py-2 bg-danger text-white rounded">Reject</button>
            <button className="px-5 font-medium py-2 bg-[#034EB0] hover:bg-blue-500 duration-150 text-white rounded">Process</button>
        </div>
      </div>
    </div>
  );
};

export default EditAppointment;
