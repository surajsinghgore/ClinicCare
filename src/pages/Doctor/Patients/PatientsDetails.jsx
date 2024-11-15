import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import {
  FaUserCircle,
  FaEnvelope,
  FaTransgender,
  FaTint,
} from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { FaPhoneFlip } from "react-icons/fa6";

const PatientsDetails = () => {
  const tableData = [
    {
      id: 1,
      disease: "Chronic obstructive pulmonary disease",
      date: "2023-11-01",
      time: "10:00 AM",
    },
    {
      id: 2,
      disease: "Diabetes mellitus",
      date: "2023-11-05",
      time: "11:00 AM",
    },
    { id: 3, disease: "Hypertension", date: "2023-11-07", time: "09:30 AM" },
    {
      id: 4,
      disease: "Ischemic heart disease",
      date: "2023-11-10",
      time: "02:00 PM",
    },
    {
      id: 5,
      disease: "Chronic kidney disease",
      date: "2023-11-12",
      time: "03:15 PM",
    },
  ];

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div>
      <BreadCrumbs currentPath={"Edit Patient Details"} />

      {/* Container for the whole content */}
      <div className="p-8 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
        {/* Heading Section */}
        <div className="heading mb-10">
          <h1 className="flex gap-4 text-3xl font-medium underline">
            Patient Details
            <FaUserCircle size={35} className="text-[#034EB0]" />
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

        {/* Details Section */}
        <h1 className="text-2xl text-black-600 mb-10 font-medium flex gap-3">
          General User Details:
        </h1>
        <div className="details mt-4 mb-6 grid grid-cols-4 gap-5">
          {/* Age */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-lg font-medium text-black-600">
              <GoNumber /> Age <span className="text-danger text-xl">*</span>
            </label>
            <input
              type="number"
              className="bg-black-100 border border-black-300 rounded-md p-2"
              readOnly
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-lg font-medium text-black-600">
              <FaTransgender /> Gender{" "}
              <span className="text-danger text-xl">*</span>
            </label>
            <input
              type="text"
              className="bg-black-100 border border-black-300 rounded-md p-2"
              readOnly
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-lg font-medium text-black-600">
              <FaEnvelope /> Email{" "}
              <span className="text-danger text-xl">*</span>
            </label>
            <input
              type="email"
              className="bg-black-100 border border-black-300 rounded-md p-2"
              readOnly
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-lg font-medium text-black-600">
              <FaPhoneFlip /> Phone{" "}
              <span className="text-danger text-xl">*</span>
            </label>
            <input
              type="tel"
              className="bg-black-100 border border-black-300 rounded-md p-2"
              readOnly
            />
          </div>

          {/* Blood Group */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-lg font-medium text-black-600">
              <FaTint /> Blood Group{" "}
              <span className="text-danger text-xl">*</span>
            </label>
            <input
              type="text"
              className="bg-black-100 border border-black-300 rounded-md p-2"
              readOnly
            />
          </div>
        </div>

        {/* Table Section */}
        <h1 className="text-2xl flex items-center gap-3 text-black-600 mt-24 mb-6 font-medium">
          Medical History <FaHistory />
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#034EB0] text-white uppercase text-base leading-normal">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Disease</th>
                <th className="p-4 text-left">Appointment Date</th>
                <th className="p-4 text-left">Appointment Time</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-black-600 text-sm font-medium">
              {tableData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-black-100" : "bg-white"
                  } hover:bg-black-100 transition-colors duration-150`}
                >
                  <td className="p-4 text-left border-b border-black-200">
                    {item.id}
                  </td>
                  <td className="p-4 text-left border-b border-black-200">
                    {truncateText(item.disease, 20)}
                  </td>
                  <td className="p-4 text-left border-b border-black-200">
                    {item.date}
                  </td>
                  <td className="p-4 text-left border-b border-black-200">
                    {item.time}
                  </td>
                  <td className="p-4 text-center border-b border-black-200">
                    <button className="text-white rounded px-3 py-1 bg-blue-600 font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-center mt-4">
          <button className="text-white px-5 py-1 bg-[#034EB0] rounded-lg">Load More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsDetails;
