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
import { LuTestTubes } from "react-icons/lu";
import AppointmentDetails from "../../../components/Doctor/AppointmentDetails";
import { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const EditAppointment2 = () => {
  const [medicines, setMedicines] = useState([
    { name: "", dose: "", routine: "", duration: "" },
  ]);

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
            <div className="flex items-center gap-2">
              <IoDocuments className="text-black-500 text-2xl" />
              <span className="text-black-500 font-medium">Form 1</span>
            </div>
            <div className="flex items-center gap-2 border-b-2 border-[#034EB0] pb-1">
              <IoDocuments className="text-[#034EB0] text-2xl" />
              <span className="text-[#034EB0] font-medium">Form 2</span>
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
        <h1 className="text-3xl mb-10 font-medium flex gap-3">
          User Details <FaUserCircle />
        </h1>
        <div className="mt-4 mb-6 grid grid-cols-4 gap-5">
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
            field={"Blood Group"}
            value={"B+"}
            icon={<FaTint />}
          />
          <AppointmentDetails field={"Age"} value={"21"} icon={<GoNumber />} />
          <AppointmentDetails
            field={"Phone No"}
            value={"9087564512"}
            icon={<FaPhoneFlip />}
          />
          <AppointmentDetails
            field={"Treatment Name"}
            value={"Ortho Surgery"}
            icon={<FaStethoscope />}
          />
        </div>

        {/* input */}
        <div className="input-field">
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
              className="border border-black-300 rounded-md px-4 py-2 w-[40%] text-black-600 truncate"
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
              className="bg-[#034EB0] text-white px-5 font-medium py-2 rounded"
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
            <div>
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
          </div>
        </div>

        {/* medicine */}
        <div className="mt-16">
          <h1 className="text-3xl font-medium mb-10 flex gap-3">
            Request Patient Diagnostic Tests: <LuTestTubes />
          </h1>

          {/* Label for the diagnostic tests */}
          <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
            Enter Diagnostic Tests
          </label>

          <TagsInput
            required
            name="test"
            value={tests}
            onChange={handleTestChange}
            placeHolder="Enter your patient diagnostic tests..."
            className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          />

          <em className="text-black-400">Press enter to add new tests</em>
        </div>
      </div>
    </div>
  );
};

export default EditAppointment2;
