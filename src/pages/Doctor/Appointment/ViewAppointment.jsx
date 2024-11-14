import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import AppointmentDetails from "../../../components/Doctor/AppointmentDetails";
import { FaUser, FaEnvelope, FaTransgender, FaTint } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { FaSyringe, FaClock, FaCalendarAlt } from "react-icons/fa";
import { FaUserDoctor, FaStethoscope, FaPhoneFlip } from "react-icons/fa6";
import { FaRegStickyNote } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { GoNumber } from "react-icons/go";
import { FaRupeeSign } from "react-icons/fa";
import { BiMessageRoundedError } from "react-icons/bi";
import { FaNotesMedical, FaCalendarDay } from "react-icons/fa";
import { GiHypodermicTest } from "react-icons/gi";
import { FaFileMedical } from "react-icons/fa";

const ViewAppointment = () => {
  return (
    <div>
      <div>
        <BreadCrumbs currentPath={"Detailed Appointment Details"} />
        {/* Container for the whole content */}
        <div className="p-8 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
          {/* Heading Section */}
          <div className="heading mb-10">
            <h1 className="flex gap-4 text-3xl font-medium underline">
              Detailed Appointment Details
              <FaFileMedical size={35} className="text-[#034EB0]" />
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
              field={"Patient Name"}
              //   value={DoctorAppointmentById?.patientName}
              value={"John Doe"}
              icon={<FaUser />}
            />
            <AppointmentDetails
              field={"Email"}
              //   value={DoctorAppointmentById?.patientEmail}
              value={"johndoe@example.com"}
              icon={<FaEnvelope />}
            />
            <AppointmentDetails
              field={"Gender"}
              //   value={DoctorAppointmentById?.patientGender}
              value={"Male"}
              icon={<FaTransgender />}
            />
            <AppointmentDetails
              field={"Age"}
              //   value={calculateAge(DoctorAppointmentById?.patientDob)}
              value={30}
              icon={<GoNumber />}
            />
            <AppointmentDetails
              field={"Phone No"}
              //   value={DoctorAppointmentById?.patientMobile}
              value={"123-456-7890"}
              icon={<FaPhoneFlip />}
            />
            <AppointmentDetails
              field={"Blood Group"}
              //   value={DoctorAppointmentById?.patientBloodGroup}
              value={"O+"}
              icon={<FaTint />}
            />
            <AppointmentDetails
              field={"Doctor Specialty"}
              //   value={DoctorAppointmentById?.doctorSpecialization}
              value={"Cardiology"}
              icon={<FaUserDoctor />}
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
              field={"Treatment Name"}
              //   value={DoctorAppointmentById?.treatmentName}
              value={"Heart Checkup"}
              icon={<FaStethoscope />}
            />
            <AppointmentDetails
              field={"Transaction ID"}
              //   value={DoctorAppointmentById?.transactionId}
              value={"TXN987654321"}
              icon={<GrTransaction />}
            />
            <AppointmentDetails
              field={"Fees"}
              //   value={DoctorAppointmentById?.appointmentFees}
              value={"500"}
              icon={<FaRupeeSign />}
            />
            <AppointmentDetails
              field={"Platform Fee"}
              //   value={DoctorAppointmentById?.transactionPaymentFeeAmount}
              value={"50"}
              icon={<FaRupeeSign />}
            />
            <AppointmentDetails
              field={"Amount Received"}
              //   value={
              //     DoctorAppointmentById?.transactionAmount
              //       .toString()
              //       .endsWith("00")
              //       ? Number(
              //           DoctorAppointmentById?.transactionAmount
              //             .toString()
              //             .slice(0, -2)
              //         )
              //       : DoctorAppointmentById?.transactionAmount
              //   }
              value={"450"}
              icon={<FaRupeeSign />}
            />
            <AppointmentDetails
              field={"Transaction Status"}
              //   value={DoctorAppointmentById?.transactionStatus}
              value={"Completed"}
              icon={<BiMessageRoundedError />}
            />
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

          {/* notes */}
          <h1 className="text-2xl text-black-600 mt-20 mb-7 font-medium flex gap-3">
            Note :
          </h1>
          <div className="mt-4 mb-10 grid grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="patient-note"
                className="flex items-center gap-3 text-md font-base text-black-700"
              >
                <FaRegStickyNote/> Note for Patient
              </label>
              <textarea
                id="patient-note"
                className="mt-1 block w-full px-3 py-2 border border-black-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                rows="4"
                readOnly
                value="This is a sample note for the patient."
              />
            </div>
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
          {/* <div className="btn flex justify-end gap-3">
            <button
              className="px-5 font-medium py-2 bg-blue-600 text-white rounded hover:bg-blue-500 duration-150"
              type="submit"
            >
              Download Full Report
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ViewAppointment;
