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
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { useEffect, useState } from "react";
import { viewAppointmentApiByIdApiDoctor } from "../../../Utils/services/apis/Doctor/AppointmentApi";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { calculateAge, extractFullDate } from "../../../Utils/DateFormatFunction";
import { GenerateTreatmentPdf } from "../../../components/PDF/GenerateTreatmentPdf";

const ViewAppointment = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [data, setData] = useState({})
  const dataFetch = async () => {
    try {
      dispatch(showLoader());
      let res = await viewAppointmentApiByIdApiDoctor(id);
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
        <BreadCrumbs currentPath={"Detailed Appointment Details"} />
        {/* Container for the whole content */}
        <div className="p-8 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
          {/* Heading Section */}
          <div className="heading mb-10">
            <h1 className="flex gap-4 text-3xl font-medium underline">
              Appointment Details
              <FaFileMedical size={35} className="text-[#034EB0]" />
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
              value={data?.appointment?.appointmentNumber}
              icon={<FaUser />}
            />

            <AppointmentDetails
              field={"Email"}
              value={data?.user?.email}
              icon={<FaEnvelope />}
            />

            <AppointmentDetails
              field={"Gender"}
              value={data?.user?.gender}
              icon={<FaTransgender />}
            />
            <AppointmentDetails
              field={"Age"}
              value={calculateAge(data?.user?.dob)}
              icon={<GoNumber />}
            />
            <AppointmentDetails
              field={"Phone No"}
              value={data?.user?.mobile}
              icon={<FaPhoneFlip />}
            />
            <AppointmentDetails
              field={"Blood Group"}
              value={data?.user?.bloodGroup}
              icon={<FaTint />}
            />
            <AppointmentDetails
              field={"Doctor Name"}
              value={data?.doctor?.name}
              icon={<FaUserDoctor />}
            />
            <AppointmentDetails
              field={"Doctor Specialty"}
              value={data?.doctor?.specialization}
              icon={<FaUserDoctor />}
            />
            <AppointmentDetails
              field={"Appointment Date"}
              value={data?.appointment?.appointmentDate}
              icon={<MdDateRange />}
            />
            <AppointmentDetails
              field={"Appointment Time"}
              value={data?.appointment?.appointmentTime}
              icon={<FaClock />}
            />
            <AppointmentDetails
              field={"Treatment Name"}
              value={data?.appointment?.service.treatmentName}
              icon={<FaStethoscope />}
            />
            <AppointmentDetails
              field={"specialty"}
              value={data?.appointment?.service.specialty}
              icon={<FaStethoscope />}
            />
            <AppointmentDetails
              field={"Transaction ID"}
              value={data?.transactionDetails?.txnId}
              icon={<GrTransaction />}
            />
            <AppointmentDetails
              field={"Fees"}
              value={data?.transactionDetails?.totalAmount - data?.transactionDetails?.platformFee}
              icon={<FaRupeeSign />}
            />
            <AppointmentDetails
              field={"Platform Fee"}
              value={data?.transactionDetails?.platformFee}
              icon={<FaRupeeSign />}
            />
            <AppointmentDetails
              field={"Amount Received"}

              value={(data.transactionDetails.amount / 100).toFixed(2)}
              icon={<FaRupeeSign />}
            />
            <AppointmentDetails
              field={"Transaction Status"}
              value={data?.transactionDetails?.methodRes?.data?.responseCode}
              icon={<BiMessageRoundedError />}
            />
            <AppointmentDetails
              field={"Appointment  Status"}
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
              value={data?.clinic?.fullAddress?.postcode}
              icon={<BiMessageRoundedError />}
            />
            <div className="flex justify-center items-center">

              <button className="border border-primary mt-3 rounded-md px-4 py-2 w-full text-white bg-primary  truncate"
                onClick={() => openGoogleMaps(data?.clinic?.lat, data?.clinic?.long)} >Open Clinic in Map</button>
            </div>
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
                <FaRegStickyNote /> Note for Patient
              </label>
              <textarea
                id="patient-note"
                className="mt-1 block w-full px-3 py-2 border border-black-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                rows="4"
                value={data?.treatmentDetails?.notes}
                readOnly
              />
            </div>
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

          {/* Submit Button */}
          <div className="btn flex justify-end gap-3">
            {(data?.documentOwner) && <button
              className="px-5 font-medium py-2 bg-blue-600 text-white rounded hover:bg-blue-500 duration-150"
              onClick={() => GenerateTreatmentPdf(data)}
            >
              Download Report
            </button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointment;
