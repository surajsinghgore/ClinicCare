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

const PatientMedicalHistory = () => {
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
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="profile image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <p className="mt-3 text-2xl font-medium">Suraj Singh</p>
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
              value={"AP123456"}
              icon={<FaUser />}
            />
            <AppointmentDetails
              field={"Treatment Name"}
              //   value={DoctorAppointmentById?.treatmentName}
              value={"Heart Checkup"}
              icon={<FaStethoscope />}
            />
            <AppointmentDetails
              field={"Doctor Name"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"Dr. Joe"}
              icon={<FaUserDoctor />}
            />
            <AppointmentDetails
              field={"Doctor Specialization"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"Heart Surgeon"}
              icon={<FaUserDoctor />}
            />
            <AppointmentDetails
              field={"Doctors Degree"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"MBBS"}
              icon={<PiCertificate />}
            />
            <AppointmentDetails
              field={"Doctor Specialty"}
              //   value={DoctorAppointmentById?.doctorSpecialization}
              value={"Cardiology"}
              icon={<FaUserDoctor />}
            />
            <AppointmentDetails
              field={"Clinic Name"}
              //   value={calculateAge(DoctorAppointmentById?.patientDob)}
              //   value={Medicare Clinic}
              icon={<FaRegHospital />}
            />
            <AppointmentDetails
              field={"Clinic Address"}
              //   value={calculateAge(DoctorAppointmentById?.patientDob)}
              value={30}
              icon={<FaRegHospital />}
            />
            <AppointmentDetails
              field={"Appointment Date"}
              //   value={DoctorAppointmentById?.appointmentDate}
              value={"2024-11-15"}
              icon={<MdDateRange />}
            />
            <AppointmentDetails
              field={"Appointment Time"}
              //   value={DoctorAppointmentById?.appointmentTime}
              value={"14:00"}
              icon={<FaClock />}
            />
            <AppointmentDetails
              field={"Appointment Status"}
              //   value={DoctorAppointmentById?.transactionStatus}
              value={"Completed"}
              icon={<BiMessageRoundedError />}
            />
          </div>

          {/* view clinic button */}
          <div className="btn flex justify-end gap-3 mb-10">
            <button
              className="px-5 font-medium py-2 bg-blue-600 text-white rounded hover:bg-blue-500 duration-150"
              type="submit"
            >
              View Clinic in Map
            </button>
          </div>

          <hr className="border-black-300 mb-14" />

          {/* medical details of the patients */}
          <h1 className="text-2xl text-black-600 mt-20 mb-7 font-medium flex gap-3">
            Medical Details:
          </h1>
          <AppointmentDetails
            field={"Disease Name"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            value={"Fever and Cold"}
          />
          <div className="mt-4 mb-10 grid grid-cols-4 gap-5">
            <AppointmentDetails
              field={"Medicine Name"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"Fever and Cold"}
              icon={<GiMedicines />}
            />
            <AppointmentDetails
              field={"Medicine Dose"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"45mg"}
              icon={<FaSyringe />}
            />
            <AppointmentDetails
              field={"Routine"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"Twice a day"}
              icon={<FaClock />}
            />
            <AppointmentDetails
              field={"Duration (Days)"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"10"}
              icon={<FaCalendarAlt />}
            />
            <AppointmentDetails
              field={"Medicine Name"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"Fever and Cold"}
              icon={<GiMedicines />}
            />
            <AppointmentDetails
              field={"Medicine Dose"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"45mg"}
              icon={<FaSyringe />}
            />
            <AppointmentDetails
              field={"Routine"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"Twice a day"}
              icon={<FaClock />}
            />
            <AppointmentDetails
              field={"Duration (Days)"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"10"}
              icon={<FaCalendarAlt />}
            />
            <AppointmentDetails
              field={"Medicine Name"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"Fever and Cold"}
              icon={<GiMedicines />}
            />
            <AppointmentDetails
              field={"Medicine Dose"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"45mg"}
              icon={<FaSyringe />}
            />
            <AppointmentDetails
              field={"Routine"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"Twice a day"}
              icon={<FaClock />}
            />
            <AppointmentDetails
              field={"Duration (Days)"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"10"}
              icon={<FaCalendarAlt />}
            />
            <AppointmentDetails
              field={"Medicine Name"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"Fever and Cold"}
              icon={<GiMedicines />}
            />
            <AppointmentDetails
              field={"Medicine Dose"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"45mg"}
              icon={<FaSyringe />}
            />
            <AppointmentDetails
              field={"Routine"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"Twice a day"}
              icon={<FaClock />}
            />
            <AppointmentDetails
              field={"Duration (Days)"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"10"}
              icon={<FaCalendarAlt />}
            />
          </div>

          {/* symptoms details and follow-up date */}
          <h1 className="text-2xl text-black-600 mt-20 mb-7 font-medium flex gap-3">
            Symptoms Details and Follow-up Date:
          </h1>
          <div className="mt-4 mb-10 grid grid-cols-2 gap-5">
            <AppointmentDetails
              field={"Symptoms"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={
                "Chills, feeling cold, shivering and shaking. Body aches and headaches"
              }
              icon={<FaNotesMedical />}
            />
            <AppointmentDetails
              field={"Follow-up Date"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"28-11-24"}
              icon={<FaCalendarDay />}
            />
          </div>

          {/* symptoms details and follow-up date */}
          <h1 className="text-2xl text-black-600 mt-20 mb-7 font-medium flex gap-3">
            Patient Diagnostic Tests Images: <GiHypodermicTest />
          </h1>
          <div className="mt-4 mb-10 grid grid-cols-3 gap-5">
            <AppointmentDetails
              field={"Treatment Prescribe"}
              //   value={DoctorAppointmentById?.appointmentNumber}
              value={"blood test, sugar, bp"}
              icon={<FaCalendarDay />}
            />
          </div>

          {/* Submit Button */}
          <div className="btn flex justify-end gap-3">
            <button
              className="px-5 font-medium py-2 bg-blue-600 text-white rounded hover:bg-blue-500 duration-150"
              type="submit"
            >
              Download Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientMedicalHistory;
