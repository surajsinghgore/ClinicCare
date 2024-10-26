import { FaHospitalUser } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { FaImages } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { useState, useEffect } from "react";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { useDispatch, useSelector } from "react-redux";
import { addClinicPhase2Api } from "../../../Utils/services/apis/Doctor/ClinicDoctorApi";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { getLocalStorage } from "../../../Utils/LocalStorage";
import { fetchMyClinicById } from "../../../redux/Slices/GetMyClinicByIdSlice";

const AddClinic2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const clinicDetails = useSelector((state) => state.getMyClinicById?.clinicDetails);

  const initialData = [
    { name: "Monday", openingTime: "", closingTime: "", status: "" },
    { name: "Tuesday", openingTime: "", closingTime: "", status: "" },
    { name: "Wednesday", openingTime: "", closingTime: "", status: "" },
    { name: "Thursday", openingTime: "", closingTime: "", status: "" },
    { name: "Friday", openingTime: "", closingTime: "", status: "" },
    { name: "Saturday", openingTime: "", closingTime: "", status: "" },
    { name: "Sunday", openingTime: "", closingTime: "", status: "" },
  ];

  const [availability, setAvailability] = useState(
    initialData.map((day) => ({
      day: day.name,
      opening: day.openingTime,
      closing: day.closingTime,
      status: day.status,
    }))
  );

  const handleInputChange = (index, field, value) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index][field] = value;

    if (field === "status" && value === "closed") {
      updatedAvailability[index].opening = "";
      updatedAvailability[index].closing = "";
    }

    if (field === "closing" && updatedAvailability[index].opening) {
      const openingTime = new Date(`1970-01-01T${updatedAvailability[index].opening}:00`);
      const closingTime = new Date(`1970-01-01T${value}:00`);

      if (closingTime <= openingTime) {
        dispatch(
          showAlert({
            message: `Closing time should be later than opening time for ${updatedAvailability[index].day}.`,
            type: "warning",
          })
        );
        updatedAvailability[index].closing = "";
      }
    }

    setAvailability(updatedAvailability);
  };

  const handleWorkingTime = async () => {
    let hasError = false;
    let errorMessage = "";

    for (let i = 0; i < availability.length; i++) {
      const slot = availability[i];

      if (!slot.status) {
        hasError = true;
        errorMessage = `Please set the status for ${slot.day}.`;
        break;
      } else if (slot.status === "open" && (!slot.opening || !slot.closing)) {
        hasError = true;
        errorMessage = `Please enter both opening and closing times for ${slot.day}.`;
        break;
      }
    }

    if (hasError) {
      dispatch(showAlert({ message: errorMessage, type: "warning" }));
      return;
    }
    let id=getLocalStorage("clinicId");
    if (!id) {
      dispatch(showAlert({ message: "Please don't change local storage", type: "warning" }));
      return;
    }
  
    const payload = {
      day: availability.map((slot) => ({
        name: slot.day,
        ...(slot.status === "open"
          ? {
              openingTime: slot.opening,
              closingTime: slot.closing,
              status: slot.status,
            }
          : { status: slot.status }),
      })),
    };
    dispatch(showLoader());

    try {
      let res = await addClinicPhase2Api(id, payload);
      if (res.success) {
        dispatch(showAlert({ message: res.message, type: "success" }));
        setTimeout(() => {
          navigate(`/doctor/add-clinic-page3/${res.clinicId}`);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      dispatch(showAlert({ message: errorMessage, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    const clinicId = getLocalStorage("clinicId");
    if (clinicId) {
      dispatch(fetchMyClinicById(clinicId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (clinicDetails && clinicDetails.data.day) {
      setAvailability(
        clinicDetails.data.day.map((day) => ({
          day: day.name,
          opening: day.openingTime || "",
          closing: day.closingTime || "",
          status: day.status || "",
        }))
      );
    }
  }, [clinicDetails, dispatch]);

  return (
    <div>
      <BreadCrumbs currentPath="Add Clinic" />
      <div className="relative w-[97%] m-auto mt-10 mb-10 rounded-lg shadow-lg p-5">
        <div className="flex p-3 border-b border-black-400 bg-white">
          <div className="flex gap-10 p-4 select-none">
            <Link to="/doctor/add-clinic-page1">
              <div className="flex items-center gap-2">
                <FaHospitalUser className="text-black-500 text-2xl" />
                <span className="text-black-500 font-medium">Clinic Details</span>
              </div>
            </Link>
            <div className="flex items-center gap-2 border-b-2 border-blue-400 pb-1">
              <CiCalendarDate className="text-blue-500 text-2xl" />
              <span className="text-blue-500 font-medium">Availability</span>
            </div>
            <div className="flex items-center gap-2">
              <FaImages className="text-black-500 text-2xl" />
              <span className="text-black-500 font-medium">Upload File</span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg mt-12">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 text-left">Doctor Availability</h2>
          <div className="grid grid-cols-4 gap-6 mb-4 border-b-2 border-gray-300 pb-4 text-gray-600">
            <div className="font-semibold text-left">Day</div>
            <div className="font-semibold text-center">Opening Time</div>
            <div className="font-semibold text-center">Closing Time</div>
            <div className="font-semibold text-right">Status</div>
          </div>
          {availability.map((slot, index) => (
            <div key={index} className="grid grid-cols-4 gap-6 items-center mb-4 border-b border-gray-200 pb-3 transition-all hover:bg-blue-50">
              <div className="text-left text-gray-700 font-medium">{slot.day}</div>
              <input
                type="time"
                className="p-2 w-full border rounded-md shadow-sm text-center bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300 hover:shadow-md"
                value={slot.opening}
                onChange={(e) => handleInputChange(index, "opening", e.target.value)}
                disabled={slot.status === "closed"}
              />
              <input
                type="time"
                className="p-2 w-full border rounded-md shadow-sm text-center bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300 hover:shadow-md"
                value={slot.closing}
                onChange={(e) => handleInputChange(index, "closing", e.target.value)}
                disabled={slot.status === "closed"}
              />
              <select
                className="p-2 ml-12 w-44 border rounded-md shadow-sm bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300 hover:shadow-md text-gray-700"
                value={slot.status}
                onChange={(e) => handleInputChange(index, "status", e.target.value)}
              >
                <option value="">Set Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-end gap-2 my-4 items-center">
          <div>
            <Link to={"/doctor/add-clinic-page1"}>
              <button className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">Back</button>
            </Link>
          </div>
          <div>
            <button onClick={handleWorkingTime} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClinic2;
