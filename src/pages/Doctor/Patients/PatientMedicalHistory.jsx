import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { FaBookMedical } from "react-icons/fa";
import AppointmentDetails from "../../../components/Doctor/AppointmentDetails";
import { FaUser } from "react-icons/fa";
import { FaRegHospital } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { FaSyringe, FaClock, FaCalendarAlt } from "react-icons/fa";
import { FaUserDoctor, FaStethoscope } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { PiCertificate } from "react-icons/pi";
import { BiMessageRoundedError } from "react-icons/bi";
import { FaNotesMedical, FaCalendarDay } from "react-icons/fa";
import { GiHypodermicTest } from "react-icons/gi";
import { Link, useParams } from "react-router-dom";
import { rejectedAppointmentByIdApi, viewAppointmentApiByIdAllApiDoctor } from "../../../Utils/services/apis/Doctor/PatientApi";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { extractFullDate } from "../../../Utils/DateFormatFunction";

const PatientMedicalHistory = () => {
  const { id } = useParams();
  const [data, setData] = useState()
  const dispatch = useDispatch()
  const dataFetch = async () => {
    try {
      dispatch(showLoader());
      let res = await viewAppointmentApiByIdAllApiDoctor(id);

      if (res?.status) {
        setData(res)
      }
    } catch (error) {
      console.log(error);
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);
  const openGoogleMaps = (lat, lng) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div>
      <div>

        <BreadCrumbs currentPath={"Patient Medical History"} />

        {/* Container for the whole content */}
        <div className="p-8 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
          {/* Heading Section */}
          <div className="heading mb-10">
            <h1 className="flex gap-4 text-3xl font-medium underline">
              Patient Medical History
              <FaBookMedical size={35} className="text-[#034EB0]" />
            </h1>
          </div>

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
              <p className="mt-1 ml-4 text-black-500 text-lg font-medium">
                ( Patient )
              </p>
            </div>
          </div>

          {/* Read-only input fields */}
          <h1 className="text-2xl text-black-600 mb-10 font-medium flex gap-3">
            General User Details:
          </h1>
          <div className="mt-4 mb-10 grid grid-cols-4 gap-5">
            <AppointmentDetails
              field={"Appointment Number"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={data?.appointment?.number}
              icon={<FaUser />}
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
              field={"Appointment Status"}
              //   value={DoctorAppointmentById?.transactionStatus}
              value={data?.appointment?.status}
              icon={<BiMessageRoundedError />}
            />

            <AppointmentDetails
              field={"Doctor Name"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={data?.doctor?.name}
              icon={<FaUserDoctor />}
            />
            <AppointmentDetails
              field={"Doctor Specialization"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={data?.doctor?.specialization}
              icon={<FaUserDoctor />}
            />
            <AppointmentDetails
              field={"Doctors Degree"}
              value={data?.doctor?.degree}
              icon={<PiCertificate />}
            />

            <AppointmentDetails
              field={"Clinic Name"}
              value={data?.clinic?.name}
              icon={<FaRegHospital />}
            />
            <AppointmentDetails
              field={"Clinic Address"}
              value={data?.clinic?.address}
              icon={<FaRegHospital />}
            />



            <AppointmentDetails
              field={"treatmentName Name"}
              value={data?.appointment?.service?.treatmentName}
              icon={<FaStethoscope />}
            />
            <AppointmentDetails
              field={"specialty Name"}
              value={data?.appointment?.service?.specialty}
              icon={<FaStethoscope />}
            />
            <AppointmentDetails
              field={"Fees"}
              value={data?.appointment?.service?.fees}
              icon={<FaStethoscope />}
            />
          </div>

          {/* view clinic button */}
          <div className="btn flex justify-end gap-3 mb-10">
            <Link to={`/doctor-details/${data?.doctor?.id}`}>
              <button
                className="px-5 font-medium py-2 bg-blue-600 text-white rounded hover:bg-blue-500 duration-150"

              >
                View Doctor
              </button>
            </Link>
            <Link to={`/about-clinic/${data?.clinic?.id}`}>
              <button
                className="px-5 font-medium py-2 bg-blue-600 text-white rounded hover:bg-blue-500 duration-150"

              >
                View Clinic
              </button>
            </Link>
          </div>

          <hr className="border-black-300 mb-14" />

          {/* medical details of the patients */}
          <h1 className="text-2xl text-black-600 mt-20 mb-7 font-medium flex gap-3">
            Medical Details:
          </h1>
          <AppointmentDetails
            field={"Disease Name"}

            value={data?.treatmentDetails?.diseaseName}
          />
          <div className="mt-4 mb-10 grid grid-cols-4 gap-5">
            {data?.treatmentDetails?.medications.map((item) => (
              <>
                <AppointmentDetails
                  field="Medicine Name"
                  value={item.name} // Use actual data from the `item`
                  icon={<GiMedicines />}
                />
                <AppointmentDetails
                  field="Medicine Dose"
                  value={item.dose} // Use actual data from the `item`
                  icon={<FaSyringe />}
                />
                <AppointmentDetails
                  field="Routine"
                  value={item.routine} // Use actual data from the `item`
                  icon={<FaClock />}
                />
                <AppointmentDetails
                  field="Duration (Days)"
                  value={item.duration} // Use actual data from the `item`
                  icon={<FaCalendarAlt />}
                />
              </>
            ))}



          </div>

          {/* symptoms details and follow-up date */}
          <h1 className="text-2xl text-black-600 mt-20 mb-7 font-medium flex gap-3">
            Symptoms Details and Follow-up Date:
          </h1>
          <div className="mt-4 mb-10 grid grid-cols-2 gap-5">
            <AppointmentDetails
              field={"Symptoms"}

              value={
                data?.treatmentDetails?.symptoms
              }
              icon={<FaNotesMedical />}
            />
            <AppointmentDetails
              field={"Follow-up Date"}
              value={extractFullDate(data?.treatmentDetails?.followUpDate)}
              icon={<FaCalendarDay />}
            />
          </div>

          {/* symptoms details and follow-up date */}
          <h1 className="text-2xl text-black-600 mt-20 mb-7 font-medium flex gap-3">
            Patient Diagnostic Tests : <GiHypodermicTest />
          </h1>
          <div className="mt-4 mb-10 grid grid-cols-3 gap-5">
            <AppointmentDetails
              field={"Treatment Prescribe"}
              value={data?.treatmentDetails?.testPrescribed?.join(', ') || "No tests prescribed"}
              icon={<FaCalendarDay />}
            />
          </div>


        </div>
      </div>
    </div>
  );
};

export default PatientMedicalHistory;
