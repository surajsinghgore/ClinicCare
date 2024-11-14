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
import { Link, useNavigate, useParams } from "react-router-dom";
import { calculateAge } from "../../../Utils/DateFormatFunction";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { processAppointmentValidation } from "../../../Utils/services/FormValidation/AppointmentValidation";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { processAppointmentByAppointmentId } from "../../../Utils/services/apis/Doctor/AppointmentApi";

const EditAppointment2 = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit, register, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(processAppointmentValidation),
  });

  const [medicines, setMedicines] = useState([{ name: "", dose: "", routine: "", duration: "" }]);
  const { DoctorAppointmentById } = useSelector((state) => state.DoctorAppointmentById);
  const [tests, setTests] = useState([]);

  const handleTestChange = (newTests) => {
    setTests(newTests);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dose: "", routine: "", duration: "" }]);
  };

  const removeMedicine = () => {
    if (medicines.length > 1) {
      setMedicines(medicines.slice(0, -1));
    }
  };

  useEffect(() => {
    if (!DoctorAppointmentById) {
      dispatch(fetchDoctorAppointmentDetailsById(id));
    }
  }, [DoctorAppointmentById, dispatch, id]);

  const onSubmit = async (formData) => {
    formData.testPrescribed = tests;
    formData.medications = medicines;
    delete formData.medicines
    dispatch(showLoader());
    try {
      const res = await processAppointmentByAppointmentId(id, formData);
      dispatch(showAlert({ message: res.message, type: "success" }));
      setTimeout(() => {
        navigate("/doctor/todays-appointment?page=1&limit=10&type=all");
      }, 2000);
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message || "Failed to create appointment", type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0].message;
      dispatch(showAlert({ message: firstError, type: "warning" }));
    }
  }, [errors]);

  useEffect(() => {
    if (id) {
      setValue('appointmentId', id);
    }
  }, [id, setValue]);

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

        <hr className="border-black-300" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-field mt-10">
            <div>
              <label htmlFor="diseaseName" className="text-lg mb-1 text-black-600 flex items-center gap-3">
                Enter Disease :<span className="text-danger text-xl">*</span>
              </label>
              <input
                type="text"
                id="diseaseName"
                name="diseaseName"
                {...register("diseaseName")}
                required
                autoFocus
                className="border border-black-300 rounded-md px-4 py-2 w-full text-black-600"
                placeholder="Enter patient disease..."
              />
            </div>
          </div>

          {/* Medicine Fields */}
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
                    {...register(`medicines[${index}].name`, { required: "Medicine name is required" })}
                    required
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

                {/* Dose Field */}
                <div>
                  <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                    <FaSyringe /> Medicine Dose{" "}
                    <span className="text-danger text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter dose..."
                    value={medicine.dose}
                    {...register(`medicines[${index}].dose`, { required: "Medicine dose is required" })}
                    required
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

                {/* Routine Field */}
                <div>
                  <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                    <FaClock /> Routine{" "}
                    <span className="text-danger text-lg">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter routine..."
                    value={medicine.routine}
                    {...register(`medicines[${index}].routine`, { required: "Routine is required" })}
                    required
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

                {/* Duration Field */}
                <div>
                  <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                    <FaCalendarAlt /> Duration (days){" "}
                    <span className="text-danger text-lg">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter duration..."
                    value={medicine.duration}
                    {...register(`medicines[${index}].duration`, { required: "Duration is required" })}
                    required
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

            <div className="flex justify-end gap-3">
              {(medicines.length > 1) && <button
                type="button"
                onClick={removeMedicine}
                className="bg-[#FF4D4D] hover:bg-red-500 duration-150 text-white px-5 font-medium py-2 rounded"
              >
                Remove  Medicine
              </button>}
              <button
                onClick={addMedicine}
                className="bg-[#034EB0] hover:bg-blue-500 duration-150 text-white px-5 font-medium py-2 rounded"
              >
                Add Medicine
              </button>


            </div>
          </div>

          {/* Symptoms */}
          <div className="mt-4 mb-6 grid grid-cols-2 gap-5">
            <div>
              <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                <FaNotesMedical /> Symptoms{" "}
                <span className="text-danger text-lg">*</span>
              </label>
              <input
                type="text"
                {...register("symptoms")}
                placeholder="Enter symptoms..."
                className="border border-black-300 p-2 rounded w-full"
                required
              />
            </div>

            {/* Follow-up Date */}
            <div>
              <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                <FaCalendarDay /> Follow-up Date{" "}
                <span className="text-danger text-lg">*</span>
              </label>
              <input
                type="date"
                {...register("followUpDate", { required: "Follow-up date is required" })}
                className="border border-black-300 p-2 rounded w-full"
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  const inputDate = e.target.value;
                  const today = new Date().toISOString().split('T')[0];

                  if (inputDate < today) {
                    e.target.value = today;
                  }
                }}
                required
              />
            </div>

            {/* Notes */}
            <div>
              <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                <FaRegStickyNote /> Notes{" "}
              </label>
              <textarea
                {...register("notes")}
                placeholder="Add notes here"
                className="border border-black-300 p-2 rounded w-full resize-none"
                rows="4"
              ></textarea>
            </div>
          </div>

          {/* Diagnostic Tests */}
          <div className="mt-16">
            <h1 className="text-3xl font-medium mb-10 flex gap-3">
              Request Patient Diagnostic Tests: <GiHypodermicTest />
            </h1>
            <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
              Enter Diagnostic Tests To Be Prescribed
            </label>
            <TagsInput
              required
              name="test"
              value={tests}
              onChange={handleTestChange}
              placeHolder="Enter your patient diagnostic tests..."
              className="border border-gray-300 p-3 rounded-md w-[50vw] focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="btn flex justify-end gap-3">
            <button className="px-5 font-medium py-2 bg-[#01962e] text-white rounded" type="submit">
              Complete Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointment2;
