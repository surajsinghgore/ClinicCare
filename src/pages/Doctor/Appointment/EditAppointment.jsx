import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { FaWpforms } from "react-icons/fa6";
import { FaUser, FaEnvelope, FaTransgender, FaTint } from "react-icons/fa";
import { FaUserDoctor, FaClock, FaStethoscope, FaPhoneFlip } from "react-icons/fa6";
import { IoDocuments } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { GoNumber } from "react-icons/go";
import { FaRupeeSign } from "react-icons/fa";
import { BiMessageRoundedError } from "react-icons/bi";
import AppointmentDetails from "../../../components/Doctor/AppointmentDetails";
import { Link, useNavigate, useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { deleteAdminApi } from "../../../Utils/services/apis/Admin/AdminApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDoctorAppointmentDetailsById } from "../../../redux/Slices/FetchDoctorAppointmentById";
import { calculateAge } from "../../../Utils/DateFormatFunction";
import { processRejectAppointmentByAppointmentId } from "../../../Utils/services/apis/Doctor/AppointmentApi";

const EditAppointment = () => {
  const { id } = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { DoctorAppointmentById } = useSelector(
    (state) => state.DoctorAppointmentById
  );

  useEffect(() => {
    dispatch(fetchDoctorAppointmentDetailsById(id));
  }, [])

  const cancelledAppointment = async (id) => {
    try {
      dispatch(showLoader());
      let res = await processRejectAppointmentByAppointmentId(id);
      if (res.success) {
        dispatch(showAlert({ message: res.message, type: "success" }));
        navigate("/doctor/todays-appointment?page=1&limit=10&type=rejected")
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showAlert({ message: error?.response?.data?.message, type: "failed" })
      );
    } finally {
      dispatch(hideLoader());
    }
  }


  // Function to show confirmation alert
  const confirmDelete = (appointmentId) => {

    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to rejected this appointment?",
      buttons: [
        {
          label: "Yes",
          onClick: () => cancelledAppointment(appointmentId),
        },
        {
          label: "No",

        },
      ],
    });
  };

  useEffect(() => {
    if (!id) {
      navigate('/doctor/todays-appointment?limit=10&page=1&type=all')
    }
  }, [])
  return (
    <div>
      {/* BreadCrumbs for navigation */}
      <BreadCrumbs currentPath={"Edit Appointment Form-1"} />

      {/* Container for the whole content */}
      <div className="p-8 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
        {/* Heading Section */}
        <div className="heading mb-6">
          <h1 className="flex gap-4 text-3xl font-medium underline">
            Patient Appointment Details
            <FaWpforms size={35} className="text-[#034EB0]" />
          </h1>
        </div>

        {/* steps for form */}
        <div className="flex p-3 items-center justify-center mb-10 bg-white">
          <div className="flex gap-10 p-4 select-none">


            <div className="flex items-center gap-2 border-b-2 border-[#034EB0] pb-1">
              <IoDocuments className="text-[#034EB0] text-2xl" />
              <span className="text-[#034EB0] font-medium">Form 1</span>
            </div>
            <Link to={`/doctor/edit-appointment-form2/${id}`}>
              <div className="flex items-center gap-2">
                <IoDocuments className="text-black-500 text-2xl" />
                <span className="text-black-500 font-medium">Form 2</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Profile Image and Name Centered */}
        <div className="center flex flex-col items-center justify-center mb-14">
          <Link to={DoctorAppointmentById?.patientUserId}>

            <div className="img-circle w-52 h-52 rounded-full overflow-hidden border-2 border-black">
              <img
                src={DoctorAppointmentById?.patientProfileUrl}
                alt={DoctorAppointmentById?.patientProfileUrl}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <Link to={DoctorAppointmentById?.patientUserId}>
            <p className="mt-3 text-2xl font-medium">{DoctorAppointmentById?.patientName}</p>
          </Link>

        </div>

        {/* Read-only input fields */}
        <div className="mt-4 mb-10 grid grid-cols-4 gap-5">
          <AppointmentDetails
            field={"Appointment Number"}
            value={DoctorAppointmentById?.appointmentNumber}
            icon={<FaUser />}
          />
          <AppointmentDetails
            field={"Patient Name"}
            value={DoctorAppointmentById?.patientName}
            icon={<FaUser />}
          />
          <AppointmentDetails
            field={"Email"}
            value={DoctorAppointmentById?.patientEmail}
            icon={<FaEnvelope />}
          />
          <AppointmentDetails
            field={"Gender"}
            value={DoctorAppointmentById?.patientGender}
            icon={<FaTransgender />}
          />
          <AppointmentDetails
            field={"Age"}
            value={calculateAge(DoctorAppointmentById?.patientDob)}
            icon={<GoNumber />}
          />
          <AppointmentDetails
            field={"Phone No"}
            value={DoctorAppointmentById?.patientMobile}
            icon={<FaPhoneFlip />}
          />
          <AppointmentDetails
            field={"Blood Group"}
            value={DoctorAppointmentById?.patientBloodGroup}
            icon={<FaTint />}
          />
          <AppointmentDetails
            field={"Doctor Specialty"}
            value={DoctorAppointmentById?.doctorSpecialization}
            icon={<FaUserDoctor />}
          />
          <AppointmentDetails
            field={"Appointment Date"}
            value={DoctorAppointmentById?.appointmentDate}
            icon={<MdDateRange />}
          />
          <AppointmentDetails
            field={"Appointment Time"}
            value={DoctorAppointmentById?.appointmentTime}
            icon={<FaClock />}
          />
          <AppointmentDetails
            field={"Treatment Name"}
            value={DoctorAppointmentById?.treatmentName}
            icon={<FaStethoscope />}
          />
          <AppointmentDetails
            field={"Transaction ID"}
            value={DoctorAppointmentById?.transactionId}
            icon={<GrTransaction />}
          />
          <AppointmentDetails
            field={"Fees"}
            value={DoctorAppointmentById?.appointmentFees}
            icon={<FaRupeeSign />}
          />
          <AppointmentDetails
            field={"Platform Fee"}
            value={DoctorAppointmentById?.transactionPaymentFeeAmount}
            icon={<FaRupeeSign />}
          />
          <AppointmentDetails
            field={"Amount Received"}
            value={DoctorAppointmentById?.transactionAmount.toString().endsWith("00") ? Number(DoctorAppointmentById?.transactionAmount.toString().slice(0, -2)) : DoctorAppointmentById?.transactionAmount}
            icon={<FaRupeeSign />}
          />
          <AppointmentDetails
            field={"Transaction Status"}
            value={DoctorAppointmentById?.transactionStatus}
            icon={<BiMessageRoundedError />}
          />
        </div>

        {/* buttons */}
        <div className="btn flex justify-end gap-3">
          <button className="px-5 font-medium py-2 bg-danger text-white rounded" onClick={() => confirmDelete(id)}>Reject</button>
          <Link to={`/doctor/edit-appointment-form2/${id}`}>
            <button className="px-5 font-medium py-2 bg-[#034EB0] text-white rounded">Process</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditAppointment;
