import { useEffect, useState } from "react";
import { FaHospitalUser } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { FaImages } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { getLocalStorage } from "../../../Utils/LocalStorage";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { useDispatch, useSelector } from "react-redux";
import { addClinicPhase3Api } from "../../../Utils/services/apis/Doctor/ClinicDoctorApi";
import { fetchMyClinicById } from "../../../redux/Slices/GetMyClinicByIdSlice";
import MultiPhotoUploader from "../../../components/Doctor/MultiPhotoUploader";


  const AddClinic3 = () => {
    const clinicDetails = useSelector((state) => state.getMyClinicById?.clinicDetails);
    const [clinicPhotos, setClinicPhotos] = useState([]);
    const [workPhotos, setWorkPhotos] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleSubmit = async () => {
        if (clinicPhotos.length === 0 && workPhotos.length === 0) {
            dispatch(showAlert({ message: "Please select at least one image for clinic photos or work photos.", type: "warning" }));
            return;
          }
  
      const formData = new FormData();
  
      // Append clinic photos
      clinicPhotos.forEach((image) => {
        formData.append("clinicPhotos", image.file);
      });
  
      // Append work photos
      workPhotos.forEach((image) => {
        formData.append("workPhotos", image.file);
      });
  
      let id = getLocalStorage("clinicId");
      if (!id) {
        dispatch(showAlert({ message: "please don't change local storage data!", type: "error" }));
        return;
      }
  
      try {
        const response = await addClinicPhase3Api(id, formData);
        if (response.success) {
          dispatch(showAlert({ message: "Photos uploaded successfully!", type: "success" }));
        } else {
          dispatch(showAlert({ message: "Failed to upload photos.", type: "warning" }));
        }
      } catch (error) {
        dispatch(showAlert({ message: "An error occurred while uploading photos: " + error, type: "warning" }));
      }
    };
  
    useEffect(() => {
      const clinicId = getLocalStorage("clinicId");
      if (clinicId) {
        dispatch(fetchMyClinicById(clinicId));
      }
    }, [dispatch]);
  
    useEffect(() => {
      if (clinicDetails && clinicDetails.data) {
        console.log(clinicDetails);
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
              <Link to={`/doctor/add-clinic-page2/${getLocalStorage("clinicId") || ""}`}>
                <div className="flex items-center gap-2">
                  <CiCalendarDate className="text-black-500 text-2xl" />
                  <span className="text-black-500 font-medium">Availability</span>
                </div>
              </Link>
              <div className="flex items-center gap-2 border-b-2 border-blue-400 pb-1">
                <FaImages className="text-blue-500 text-2xl" />
                <div className="flex flex-col items-center">
                  <span className="text-blue-500 font-medium">Upload File</span>
                </div>
              </div>
            </div>
          </div>
  
          <div className="p-6 bg-white mt-10 text-2xl">
            <MultiPhotoUploader title="Clinic Photo" onImageSelect={setClinicPhotos} />
            <MultiPhotoUploader title="Work Photo" onImageSelect={setWorkPhotos} />
          </div>
  
          <Link to={"/doctor/add-clinic2"} className="ml-auto bg-secondary hover:bg-black-700 duration-200 text-white m-8 shadow-lg font-bold py-2 px-3 rounded-md absolute bottom-5 right-44">
            Back
          </Link>
  
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 duration-200 text-white m-8 shadow-lg font-semibold py-2 px-3 rounded-md ml-[86%]">
            Final Submit
          </button>
        </div>
      </div>
    );
  };
  
  export default AddClinic3;

