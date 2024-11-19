import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { FaUser, FaEnvelope, FaPhone, FaTint } from "react-icons/fa";

const CreatePatient2 = () => {
  return (
    <>
      <BreadCrumbs currentPath={"Create Patient"} />
      <div className="p-6">
        {/* Section 1: Patient General Details */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">
            Patient General Details
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative">
              <label className="text-sm font-medium text-black-600 mb-1 block">
                Patient Name
              </label>
              <input
                type="text"
                value="John Doe"
                readOnly
                className="w-full p-3 pl-10 border border-black-300 rounded-md bg-black-100 focus:outline-none"
              />
              <FaUser className="absolute top-11 left-3 text-black-400" />
            </div>
            <div className="relative">
              <label className="text-sm font-medium text-black-600 mb-1 block">
                Email
              </label>
              <input
                type="email"
                value="johndoe@example.com"
                readOnly
                className="w-full p-3 pl-10 border border-black-300 rounded-md bg-black-100 focus:outline-none"
              />
              <FaEnvelope className="absolute top-11 left-3 text-black-400" />
            </div>
            <div className="relative">
              <label className="text-sm font-medium text-black-600 mb-1 block">
                Phone
              </label>
              <input
                type="text"
                value="+1234567890"
                readOnly
                className="w-full p-3 pl-10 border border-black-300 rounded-md bg-black-100 focus:outline-none"
              />
              <FaPhone className="absolute top-11 left-3 text-black-400" />
            </div>
            <div className="relative">
              <label className="text-sm font-medium text-black-600 mb-1 block">
                Blood Group
              </label>
              <input
                type="text"
                value="O+"
                readOnly
                className="w-full p-3 pl-10 border border-black-300 rounded-md bg-black-100 focus:outline-none"
              />
              <FaTint className="absolute top-11 left-3 text-black-400" />
            </div>
          </div>
        </div>

        {/* Section 2: Select Clinic Details */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Select Clinic Details</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-black-600 mb-1 block">
                Select Clinic
              </label>
              <select className="w-full p-3 border border-black-300 rounded-md bg-white focus:outline-none">
                <option>Select a clinic</option>
                <option>Clinic A</option>
                <option>Clinic B</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-black-600 mb-1 block">
                Select Service
              </label>
              <select className="w-full p-3 border border-black-300 rounded-md bg-white focus:outline-none">
                <option>Select a service</option>
                <option>Service A</option>
                <option>Service B</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-black-600 mb-1 block">
                Date
              </label>
              <input
                type="date"
                className="w-full p-3 border border-black-300 rounded-md bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-black-600 mb-1 block">
                Time
              </label>
              <input
                type="time"
                className="w-full p-3 border border-black-300 rounded-md bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Doctor / Platform Fees */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Doctor / Platform Fees</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-black-600 mb-1 block">
                Fees
              </label>
              <input
                type="text"
                value="$100"
                readOnly
                className="w-full p-3 border border-black-300 rounded-md bg-black-100 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-black-600 mb-1 block">
                Platform Fees
              </label>
              <input
                type="text"
                value="$10"
                readOnly
                className="w-full p-3 border border-black-300 rounded-md bg-black-100 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end mt-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500 transition">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePatient2;
