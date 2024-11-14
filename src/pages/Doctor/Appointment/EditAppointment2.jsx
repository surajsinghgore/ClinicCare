import { IoDocuments } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { FaUser, FaEnvelope, FaTransgender, FaTint } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { FaStethoscope, FaPhoneFlip } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { RiMedicineBottleLine } from "react-icons/ri";
import { FaPills, FaSyringe, FaClock, FaCalendarAlt } from "react-icons/fa";
import { FaNotesMedical, FaCalendarDay, FaRegStickyNote } from "react-icons/fa";
import { GiHypodermicTest } from "react-icons/gi";
import AppointmentDetails from "../../../components/Doctor/AppointmentDetails";
import { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorAppointmentDetailsById } from "../../../redux/Slices/FetchDoctorAppointmentById";
import { Link, useParams } from "react-router-dom";
import { calculateAge } from "../../../Utils/DateFormatFunction";

const EditAppointment2 = () => {
  const { id } = useParams()
  const dispatch = useDispatch();

  const [medicines, setMedicines] = useState([
    { name: "", dose: "", routine: "", duration: "" },
  ]);
  const { DoctorAppointmentById } = useSelector(
    (state) => state.DoctorAppointmentById
  );
  const [tests, setTests] = useState([]);

  const handleTestChange = (newTests) => {
    setTests(newTests);
  };

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      { name: "", dose: "", routine: "", duration: "" },
    ]);
  };




  useEffect(() => {
    if (!DoctorAppointmentById) {
      dispatch(fetchDoctorAppointmentDetailsById(id));
    }
  }, [])

  return (
    <div>
      {/* BreadCrumbs for navigation */}
      <BreadCrumbs currentPath={"Edit Appointment Form-2"} />

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
            <Link to={`/doctor/edit-appointment-form1/${id}`}>
              <div className="flex items-center gap-2">
                <IoDocuments className="text-black-500 text-2xl" />
                <span className="text-black-500 font-medium">Form 1</span>
              </div>
            </Link>
            <div className="flex items-center gap-2 border-b-2 border-[#034EB0] pb-1">
              <IoDocuments className="text-[#034EB0] text-2xl" />
              <span className="text-[#034EB0] font-medium">Form 2</span>
            </div>
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
        <h1 className="text-3xl mb-10 font-medium flex gap-3">
          User Details <FaUserCircle />
        </h1>
        <div className="mt-4 mb-6 grid grid-cols-4 gap-5">
          <AppointmentDetails
            field={"Appointment ID"}
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
            field={"Blood Group"}
            value={DoctorAppointmentById?.patientBloodGroup}
            icon={<FaTint />}
          />
          <AppointmentDetails field={"Age"} value={calculateAge(DoctorAppointmentById?.patientDob)} icon={<GoNumber />} />
          <AppointmentDetails
            field={"Phone No"}
            value={DoctorAppointmentById?.patientMobile}
            icon={<FaPhoneFlip />}
          />
          <AppointmentDetails
            field={"Treatment Name"}
            value={DoctorAppointmentById?.treatmentName}
            icon={<FaStethoscope />}
          />
        </div>

        <hr className=" border-black-300" />

        {/* input */}
        <div className="input-field mt-10">
          <div>
            <label
              htmlFor="Disease"
              className="text-lg mb-1 text-black-600 flex items-center gap-3"
            >
              Enter Disease :<span className="text-danger text-xl">*</span>
            </label>
            <input
              type="text"
              id="Disease"
              name="Disease"
              required
              autoComplete="off"
              placeholder="Enter patient disease..."
              className="border border-black-300 rounded-md px-4 py-2 w-full text-black-600 truncate"
            />
          </div>
        </div>
        {/* medicine */}
        <div className="mt-16">
          <h1 className="text-3xl font-medium mb-10 flex gap-3">
            Medicine <RiMedicineBottleLine />
          </h1>
          {medicines.map((medicine, index) => (
            <div key={index} className="mt-4 mb-10 grid grid-cols-4 gap-5">
              <div>
                <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                  <FaPills /> Medicine Name{" "}
                  <span className="text-danger text-lg">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter medicine name..."
                  value={medicine.name}
                  required
                  autoComplete="off"
                  onChange={(e) =>
                    setMedicines(
                      medicines.map((med, i) =>
                        i === index ? { ...med, name: e.target.value } : med
                      )
                    )
                  }
                  className="border border-black-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                  <FaSyringe /> Medicine Dose{" "}
                  <span className="text-danger text-lg">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter dose..."
                  value={medicine.dose}
                  required
                  autoComplete="off"
                  onChange={(e) =>
                    setMedicines(
                      medicines.map((med, i) =>
                        i === index ? { ...med, dose: e.target.value } : med
                      )
                    )
                  }
                  className="border border-black-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                  <FaClock /> Routine{" "}
                  <span className="text-danger text-lg">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter routine..."
                  value={medicine.routine}
                  required
                  autoComplete="off"
                  onChange={(e) =>
                    setMedicines(
                      medicines.map((med, i) =>
                        i === index ? { ...med, routine: e.target.value } : med
                      )
                    )
                  }
                  className="border border-black-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                  <FaCalendarAlt /> Duration (days){" "}
                  <span className="text-danger text-lg">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter duration..."
                  value={medicine.duration}
                  required
                  autoComplete="off"
                  onChange={(e) =>
                    setMedicines(
                      medicines.map((med, i) =>
                        i === index ? { ...med, duration: e.target.value } : med
                      )
                    )
                  }
                  className="border border-black-300 p-2 rounded w-full"
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <button
              onClick={addMedicine}
              required
              autoComplete="off"
              className="bg-[#034EB0] hover:bg-blue-500 duration-150 text-white px-5 font-medium py-2 rounded"
            >
              Add Medicine
            </button>
          </div>
        </div>

        {/* symptoms */}
        <div>
          <div className="mt-4 mb-6 grid grid-cols-2 gap-5">
            {/* Symptoms Input */}
            <div>
              <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                <FaNotesMedical /> Symptoms{" "}
                <span className="text-danger text-lg">*</span>
              </label>
              <input
                type="text"
                required
                autoComplete="off"
                placeholder="Enter symptoms..."
                className="border border-black-300 p-2 rounded w-full"
              />
            </div>

            {/* Follow-up Date Input */}
            <div>
              <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                <FaCalendarDay /> Follow-up Date{" "}
                <span className="text-danger text-lg">*</span>
              </label>
              <input
                type="date"
                required
                autoComplete="off"
                className="border border-black-300 p-2 rounded w-full"
              />
            </div>

            {/* Notes Textarea */}
            <div className=" flex-1">
              <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                <FaRegStickyNote /> Notes{" "}
                <span className="text-danger text-lg">*</span>
              </label>
              <textarea
                placeholder="Add notes here"
                required
                autoComplete="off"
                className="border border-black-300 p-2 rounded w-full resize-none"
                rows="4" // Optional: controls the height of the textarea
              ></textarea>
            </div>

            <div className=" flex-1">
              <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                <FaRegStickyNote /> Treatment outcomes{" "}

              </label>
              <textarea
                placeholder="Treatment outcomes"
                required
                autoComplete="off"
                className="border border-black-300 p-2 rounded w-full resize-none"
                rows="4" // Optional: controls the height of the textarea
              ></textarea>
            </div>
          </div>
        </div>

        {/* medicine */}
        <div className="mt-16">
          <h1 className="text-3xl font-medium mb-10 flex gap-3">
            Request Patient Diagnostic Tests: <GiHypodermicTest />
          </h1>

          {/* Label for the diagnostic tests */}
          <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
            Enter Diagnostic Tests To Be Prescribed    <span className="text-danger text-lg">*</span>
          </label>

          <TagsInput
            required
            name="test"
            value={tests}
            onChange={handleTestChange}
            placeHolder="Enter your patient diagnostic tests..."
            className="border border-gray-300 p-3 rounded-md w-[50vw] focus:ring-2 focus:ring-blue-500"
          />

          <em className="text-black-400">Press enter to add new tests</em>
        </div>
        <div className="btn flex justify-end gap-3">
          <button className="px-5 font-medium py-2 bg-[#01962e] text-white rounded" >Complete Appointment</button>
        </div>
      </div>

    </div>
  );
};

export default EditAppointment2;
