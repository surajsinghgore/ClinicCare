import { useState } from "react";
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

const CreatePatient3 = () => {
  const [tests, setTests] = useState([]);

  return (
    <>
      <BreadCrumbs currentPath={"Add Patient Medicine"} />
      <div className="p-8 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
        <form>
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
                // {...register("diseaseName")}
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
            <div className="mt-4 mb-10 grid grid-cols-4 gap-5">
              <div>
                <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                  <FaPills /> Medicine Name{" "}
                  <span className="text-danger text-lg">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter medicine name..."
                  // value={medicine.name}
                  // {...register(`medicines[${index}].name`, { required: "Medicine name is required" })}
                  required
                  // onChange={(e) =>
                  //   setMedicines(
                  //     medicines.map((med, i) =>
                  //       i === index ? { ...med, name: e.target.value } : med
                  //     )
                  //   )
                  // }
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
                  // value={medicine.dose}
                  // {...register(`medicines[${index}].dose`, { required: "Medicine dose is required" })}
                  required
                  // onChange={(e) =>
                  //   setMedicines(
                  //     medicines.map((med, i) =>
                  //       i === index ? { ...med, dose: e.target.value } : med
                  //     )
                  //   )
                  // }
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
                  // value={medicine.routine}
                  // {...register(`medicines[${index}].routine`, { required: "Routine is required" })}
                  required
                  // onChange={(e) =>
                  //   setMedicines(
                  //     medicines.map((med, i) =>
                  //       i === index ? { ...med, routine: e.target.value } : med
                  //     )
                  //   )
                  // }
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
                  // value={medicine.duration}
                  // {...register(`medicines[${index}].duration`, { required: "Duration is required" })}
                  required
                  // onChange={(e) =>
                  //   setMedicines(
                  //     medicines.map((med, i) =>
                  //       i === index ? { ...med, duration: e.target.value } : med
                  //     )
                  //   )
                  // }
                  className="border border-black-300 p-2 rounded w-full"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                // onClick={removeMedicine}
                className="bg-[#FF4D4D] hover:bg-red-500 duration-150 text-white px-5 font-medium py-2 rounded"
              >
                Remove Medicine
              </button>
              <button
                // onClick={addMedicine}
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
                // {...register("symptoms")}
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
                // {...register("followUpDate", {
                //   required: "Follow-up date is required",
                // })}
                className="border border-black-300 p-2 rounded w-full"
                min={new Date().toISOString().split("T")[0]}
                // onChange={(e) => {
                //   const inputDate = e.target.value;
                //   const today = new Date().toISOString().split("T")[0];

                //   if (inputDate < today) {
                //     e.target.value = today;
                //   }
                // }}
                required
              />
            </div>

            {/* Notes */}
            <div>
              <label className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3">
                <FaRegStickyNote /> Notes{" "}
              </label>
              <textarea
                // {...register("notes")}
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
              //   onChange={handleTestChange}
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
    </>
  );
};

export default CreatePatient3;
