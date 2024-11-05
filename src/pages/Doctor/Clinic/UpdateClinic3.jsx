import { useEffect, useState } from "react";
import { FaHospitalUser } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { FaImages } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { Link, useNavigate, useParams } from "react-router-dom";
import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { getLocalStorage, removeLocalStorage } from "../../../Utils/LocalStorage";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { useDispatch, useSelector } from "react-redux";
import { addClinicPhase3Api, deleteClinicPhotoApi } from "../../../Utils/services/apis/Doctor/ClinicDoctorApi";
import { fetchMyClinicById } from "../../../redux/Slices/GetMyClinicByIdSlice";
import MultiPhotoUploader from "../../../components/Doctor/MultiPhotoUploader";
import { CiImageOn } from "react-icons/ci";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";

const UpdateClinic3 = () => {
    const {id}=useParams();
  
  const clinicDetails = useSelector((state) => state.getMyClinicById?.clinicDetails);
  const [clinicPhotos, setClinicPhotos] = useState([]);
  const [workPhotos, setWorkPhotos] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clinicPhotosUrl, setClinicPhotosUrl] = useState([]);
  const [clinicWorkPhotoUrl, setClinicWorkPhotoUrl] = useState([]);
  const handleSubmit = async () => {
   
    const formData = new FormData();

    // Append clinic photos
    clinicPhotos.forEach((image) => {
      formData.append("clinicPhotos", image.file);
    });

    // Append work photos
    workPhotos.forEach((image) => {
      formData.append("workPhotos", image.file);
    });


    if (!id) {
      dispatch(showAlert({ message: "please don't change local storage data!", type: "error" }));
      return;
    }
    dispatch(showLoader());
    try {
      const response = await addClinicPhase3Api(id, formData);
      if (response.success) {
        dispatch(showAlert({ message: response.message, type: "success" }));
        removeLocalStorage('clinicId')
        setTimeout(() => {
          navigate(`/doctor/clinics-list`);
        }, 2000);
      } else {
        dispatch(showAlert({ message: "Failed to upload photos.", type: "warning" }));
      }
    }catch (error) {
        console.log(error);
        dispatch(showAlert({ message:  error?.response?.data?.message, type: "failed" }));
      } finally {
        dispatch(hideLoader());
      }
  };

  useEffect(() => {
    const clinicId = id;
    if (clinicId) {
      dispatch(fetchMyClinicById(clinicId));
    }
  }, [dispatch]);

  useEffect(() => {
    
    if (clinicDetails && clinicDetails.data) {
      if (clinicDetails.data.clinicPhotos.length !== 0) {
        setClinicPhotosUrl(clinicDetails.data.clinicPhotos);
      }else{
        setClinicPhotosUrl([])
      }
      if (clinicDetails.data.workPhotos.length !== 0) {
        setClinicWorkPhotoUrl(clinicDetails.data.workPhotos);
      }else{
        setClinicWorkPhotoUrl([])
      }
    }
  }, [clinicDetails, dispatch]);

  const removeImage = async (url) => {

    if (!id) {
      dispatch(showAlert({ message: "Please don't change local storage", type: "warning" }));
      return;
    }
    dispatch(showLoader());
    try {
      let payload = { photoUrl: url };
      let res = await deleteClinicPhotoApi(id, payload);
      if (res.success) {
        dispatch(showAlert({ message: res.message, type: "success" }));

        dispatch(fetchMyClinicById(id));
      }
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  const openImageInNewTab = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div>
      <BreadCrumbs currentPath="Update Clinic" />
      <div className="relative w-[97%] m-auto mt-10 mb-10 rounded-lg shadow-lg p-5">
        <div className="flex p-3 border-b border-black-400 bg-white">
          <div className="flex gap-10 p-4 select-none">
            <Link to="/doctor/update-clinic1">
              <div className="flex items-center gap-2">
                <FaHospitalUser className="text-black-500 text-2xl" />
                <span className="text-black-500 font-medium">Clinic Details</span>
              </div>
            </Link>
            <Link to={`/doctor/update-clinic2/${id}`}>
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
          <div className="prev">
            {/* clinicPhotosUrl */}
            <MultiPhotoUploader title="Clinic Photo" onImageSelect={setClinicPhotos} />

            {clinicPhotosUrl.length !== 0 && (
              <>
                <h3 className="text-xl font-semibold flex items-center gap-2 underline mb-2">
                  <CiImageOn className="text-2xl" />
                  All Clinic Photos
                </h3>
                <div className="flex flex-wrap gap-2 w-full ">
                  {" "}
                  {clinicPhotosUrl.map((image, index) => (
                    <div key={index} className="relative h-56 mb-4">
                      <img src={image} alt={`uploaded ${index}`} className="w-[320px] h-full object-cover rounded-md cursor-pointer" onClick={() => openImageInNewTab(image.url)} />
                      <MdOutlineRemoveRedEye className="absolute top-1 left-1 text-3xl text-white bg-black-800 px-2 rounded-full" onClick={() => openImageInNewTab(image)} />
                      <button onClick={() => removeImage(image)} className="absolute top-1 right-1 text-white bg-black-800 px-2 rounded-full " title="Delete this image">
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="work">
            <MultiPhotoUploader title="Work Photo" onImageSelect={setWorkPhotos} />
            {clinicWorkPhotoUrl.length !== 0 && (
              <>
                <h3 className="text-xl font-semibold flex items-center gap-2 underline mb-2">
                  <CiImageOn className="text-2xl" />
                  All Clinic Work Photos
                </h3>
                <div className="flex flex-wrap gap-2 w-full ">
                  {" "}
                  {clinicWorkPhotoUrl.map((image, index) => (
                    <div key={index} className="relative h-56 mb-4">
                      <img src={image} alt={`uploaded ${index}`} className="w-[320px] h-full object-cover rounded-md cursor-pointer" onClick={() => openImageInNewTab(image.url)} />
                      <MdOutlineRemoveRedEye className="absolute top-1 left-1 text-3xl text-white bg-black-800 px-2 rounded-full cursor-pointer" onClick={() => openImageInNewTab(image)} />
                      <button onClick={() => removeImage(image)} className="absolute top-1 right-1 text-white bg-black-800 px-2 rounded-full cursor-pointer " title="Delete this image">
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end gap-2 my-4 items-center">
          <div>
            <Link to={`/doctor/update-clinic2/${id}`}>
              <button className="bg-black-300 px-4 py-2 rounded-md hover:bg-black-400">Back</button>
            </Link>
          </div>
          <div>
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Final Submit
            </button>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default UpdateClinic3;
