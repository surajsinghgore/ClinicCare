import { IoPersonAdd } from "react-icons/io5";
import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { useDispatch } from "react-redux";
import { searchUserInDoctorApi } from "../../../Utils/services/apis/Doctor/PatientApi";
import { Link } from "react-router-dom";

const CreatePatient = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); // Ensure data is initialized as an empty array

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value === "") {
      setData([]);
    } else {
      try {
        dispatch(showLoader());
        let res = await searchUserInDoctorApi(e.target.value);
        if (res?.status) {
          setData(res.data || []); // Safeguard in case res.data is undefined or null
        }
      } catch (error) {
        console.log(error);
        dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
      } finally {
        dispatch(hideLoader());
      }
    }
  };

  return (
    <div>
      <BreadCrumbs currentPath={"Create Patient"} />

      <div className="mt-6 p-10">
        <h1 className="flex items-center gap-5 underline text-4xl font-medium mb-10">
          Add New Patient <IoPersonAdd className="text-3xl" />
        </h1>
        <p className="text-center font-medium p-3 text-messageWarning">Note: Search for the patient on the platform. If the patient is not registered, inform them to register on the platform.</p>
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for a patient..."
            className="w-full p-3 pl-10 border border-black-300 rounded shadow-md"
          />
          <FaSearch className="absolute top-4 left-3 text-black-400 text-lg" />
        </div>

        {/* Search Results */}
        <div className="bg-white shadow-md rounded-md">
          {Array.isArray(data) && data.length === 0 && searchTerm !== "" ? (
            <div className="px-4 py-3 text-center text-gray-500">No users found</div>
          ) : (
            data
              .filter((result) =>
                result.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((result) => (
                <Link to={`/doctor/create-patient-form2/${result.userId}`} key={result.userId}>
                  <div className="flex items-center justify-between px-4 py-3 hover:bg-black-100 cursor-pointer">
                    <div className="flex items-center">
                      <img
                        src={result.profileUrl}
                        alt={result.name}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-lg text-black-800">
                          {result.name}
                        </span>
                        <span className="text-sm text-black-800">{result.email}</span>
                      </div>
                    </div>
                    <button className="flex items-center justify-center w-10 h-10 bg-blue-700 text-white rounded-full shadow-md">
                      <FaPlus />
                    </button>
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePatient;
