import { FaUser, FaEnvelope, FaTransgender, FaTint } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaUserDoctor, FaStethoscope, FaPhoneFlip } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { GoNumber } from "react-icons/go";
import { FaRupeeSign } from "react-icons/fa";
import { FaOrcid } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { BiMessageRoundedError } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import { FaFileMedical } from "react-icons/fa";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  calculateAge,
} from "../../../Utils/DateFormatFunction";
import { rejectedAppointmentByIdApi } from "../../../Utils/services/apis/Doctor/PatientApi";
import AppointmentDetails from "../../components/Doctor/AppointmentDetails";

const UserRejectDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState({});
  const dataFetch = async () => {
    try {
      dispatch(showLoader());
      let res = await rejectedAppointmentByIdApi(id);
      if (res?.status) {
        setData(res);
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showAlert({ message: error?.response?.data?.message, type: "failed" })
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <div>
      <div>
        {/* Container for the whole content */}
        <div className="p-8 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
          {/* Heading Section */}
          <div className="heading mb-10">
            <h1 className="flex gap-4 text-3xl font-medium underline">
              Patient Details
              <FaFileMedical size={35} className="text-[#034EB0]" />
            </h1>
          </div>
          {console.log(data)}
          {/* Profile Image and Name Centered */}
          <div className="center flex items-center gap-6 mb-14">
            <div className="img-circle w-52 h-52 rounded-full overflow-hidden border-2 border-black">
              <img
                src={data?.user?.profileUrl}
                alt="profile image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <p className="mt-3 text-2xl font-medium">{data?.user?.name}</p>
              <p className="mt-1 text-black-500 text-lg font-medium">
                ( Patient )
              </p>
            </div>
          </div>

          {/* Read-only input fields */}
          <h1 className="text-2xl text-black-600 mb-10 font-medium items-center flex gap-3">
            General User Details <FaUserCircle />
          </h1>
          <div className="mt-4 mb-10 grid grid-cols-4 gap-5">
            <AppointmentDetails
              field={"Appointment Number"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={data?.appointment?.number}
              icon={<FaUser />}
            />

            <AppointmentDetails
              field={"Email"}
              //   value={DoctorAppointmentById?.patientEmail}
              value={data?.user?.email}
              icon={<FaEnvelope />}
            />

            <AppointmentDetails
              field={"Gender"}
              //   value={DoctorAppointmentById?.patientGender}
              value={data?.user?.gender}
              icon={<FaTransgender />}
            />
            <AppointmentDetails
              field={"Age"}
              //   value={calculateAge(DoctorAppointmentById?.patientDob)}
              value={calculateAge(data?.user?.dob)}
              icon={<GoNumber />}
            />
            <AppointmentDetails
              field={"Phone No"}
              //   value={DoctorAppointmentById?.patientMobile}
              value={data?.user?.mobile}
              icon={<FaPhoneFlip />}
            />
            <AppointmentDetails
              field={"Blood Group"}
              //   value={DoctorAppointmentById?.patientBloodGroup}
              value={data?.user?.bloodGroup}
              icon={<FaTint />}
            />
            <AppointmentDetails
              field={"Doctor Name"}
              //   value={DoctorAppointmentById?.doctorSpecialization}
              value={data?.doctor?.name}
              icon={<FaUserDoctor />}
            />
            <AppointmentDetails
              field={"Doctor Specialty"}
              //   value={DoctorAppointmentById?.doctorSpecialization}
              value={data?.doctor?.specialization}
              icon={<FaUserDoctor />}
            />
            <AppointmentDetails
              field={"Appointment Date"}
              //   value={DoctorAppointmentById?.appointmentDate}
              value={data?.appointment?.date}
              icon={<MdDateRange />}
            />
            <AppointmentDetails
              field={"Appointment Time"}
              //   value={DoctorAppointmentById?.appointmentTime}
              value={data?.appointment?.time}
              icon={<FaClock />}
            />
            <AppointmentDetails
              field={"Treatment Name"}
              //   value={DoctorAppointmentById?.treatmentName}
              value={data?.appointment?.service.treatmentName}
              icon={<FaStethoscope />}
            />
            <AppointmentDetails
              field={"specialty"}
              //   value={DoctorAppointmentById?.treatmentName}
              value={data?.appointment?.service.specialty}
              icon={<FaStethoscope />}
            />
            <AppointmentDetails
              field={"Appointment Status"}
              //   value={DoctorAppointmentById?.transactionStatus}
              value={data?.appointment?.status}
              icon={<BiMessageRoundedError />}
            />
            <AppointmentDetails
              field={"Clinic Name"}
              value={data?.clinic?.name}
              icon={<BiMessageRoundedError />}
            />
            <AppointmentDetails
              field={"Clinic Address"}
              value={data?.clinic?.address}
              icon={<BiMessageRoundedError />}
            />
            <AppointmentDetails
              field={"Clinic Pincode"}
              value={data?.clinic?.postcode}
              icon={<BiMessageRoundedError />}
            />
          </div>

          {/* transaction details */}
          <h1 className="text-2xl text-black-600 mb-10 mt-10 font-medium flex items-center gap-3">
            Transaction Details: <GrTransaction />
          </h1>
          <div className="mt-4 mb-10 grid grid-cols-4 gap-5">
            <AppointmentDetails
              field={"TXN ID"}
              value={data?.transaction
                ?.txnId}
              icon={<GrTransaction />}
            />
            <AppointmentDetails
              field={"Fees"}
              value={data?.transaction
                ?.totalAmount}
              icon={<FaRupeeSign />}
            />
            <AppointmentDetails
              field={"Platform Fee"}
              value={data?.transaction
                ?.platformFee}
              icon={<FaRupeeSign />}
            />
            <AppointmentDetails
              field={"Amount Received"}
              value={(data?.transaction
                ?.amount / 100).toFixed(2)}
              icon={<FaRupeeSign />}
            />
            <AppointmentDetails
              field={"Transaction Status"}
              value={data?.transaction
                ?.responseCode}
              icon={<BiMessageRoundedError />}
            />
            <AppointmentDetails
              field={"Payment Type"}
              value={data?.transaction?.paymentInstrumentType}
              icon={<MdOutlinePayment />}
            />
            <AppointmentDetails
              field={"Payment Method"}
              value={data?.transaction?.paymentMethod}
              icon={<MdOutlinePayment />}
            />
            <AppointmentDetails
              field={"Merchant ID"}
              value={data?.transaction?.merchantId}
              icon={<FaOrcid />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRejectDetails;
