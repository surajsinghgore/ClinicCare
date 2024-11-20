import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCalendarDay,
  FaClock,
  FaNotesMedical,
  FaPills,
  FaRegStickyNote,
  FaSyringe,
} from "react-icons/fa";
import { GiHypodermicTest } from "react-icons/gi";
import { RiMedicineBottleLine } from "react-icons/ri";
import { TagsInput } from "react-tag-input-component";
import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPatientAppointmentTempValidation } from "../../../Utils/services/FormValidation/AppointmentValidation";
import { useForm } from "react-hook-form";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { processAppointmentByAppointmentId } from "../../../Utils/services/apis/Doctor/AppointmentApi";
import { getLocalStorage } from "../../../Utils/LocalStorage";
import { bookPatientAppointmentTempApi } from "../../../Utils/services/apis/Doctor/PatientApi";

const CreatePatient3 = () => {
  const [medicines, setMedicines] = useState([{ name: "", dose: "", routine: "", duration: "" }]);
  const [tests, setTests] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit, register, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(createPatientAppointmentTempValidation),
  });

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dose: "", routine: "", duration: "" }]);
  };

  const removeMedicine = () => {
    if (medicines.length > 1) {
      setMedicines(medicines.slice(0, -1));

    }
  };
  const handleTestChange = (newTests) => {
    setTests(newTests);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0].message;
      dispatch(showAlert({ message: firstError, type: "warning" }));
    }
  }, [errors]);



  const onSubmit = async (formData) => {

    formData.testPrescribed = tests;
    formData.medications = medicines;
    delete formData.medicines


    dispatch(showLoader());
    try {
      const res = await bookPatientAppointmentTempApi(formData);
      dispatch(showAlert({ message: res.message, type: "success" }));
      // setTimeout(() => {
      //   navigate(`/doctor/view-appointment/${res.id}`);
      // }, 2000);
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message || "Failed to create appointment", type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };



  useEffect(() => {
    if (getLocalStorage('tempAppointmentData')) {
      let appointmentData = JSON.parse(getLocalStorage('tempAppointmentData'))
      setValue('clinicId', appointmentData.clinicId)
      setValue('serviceId', appointmentData.serviceId)
      setValue('userId', appointmentData.userId)
      setValue('appointmentData', appointmentData.date)
      setValue('appointmentTime', appointmentData.appointmentTime)
    }
  }, [])
  return (
    <>
      <BreadCrumbs currentPath={"Add Patient Medicine"} />
      <div className="p-8 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>

          <h1 className="font-medium text-3xl">Add Patient Medicine</h1>
          <div className="input-field mt-10">
            <div>
              <label
                htmlFor="diseaseName"
                className="text-lg mb-1 text-black-600 flex items-center gap-3"
              >
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
                {...register("followUpDate", {
                  required: "Follow-up date is required",
                })}
                className="border border-black-300 p-2 rounded w-full"
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  const inputDate = e.target.value;
                  const today = new Date().toISOString().split("T")[0];

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
            <button
              className="px-5 font-medium py-2 bg-blue-700 text-white rounded"
              type="submit"
            >
              Send Payment Link
            </button>
          </div>
        </form>
      </div>


      {/* payment conformation page
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Payment Confirmation Email Sent
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        &ldquo;An email for payment has been sent to patient&apos;s registered email. Please wait for the confirmation.&ldquo;
      </p>
      <div className="flex items-center space-x-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700">
          Refresh
        </button>
      </div>
    </div> */}
    </>
  );
};

export default CreatePatient3;
