import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/Common/BreadCrumbs";
import { FaRegEye } from "react-icons/fa";
import { FaUserShield, FaAddressCard, FaFileUpload } from "react-icons/fa";
import { uploadDocumentsDoctorVerificationApi } from "../../Utils/services/apis/Doctor/DoctorVerificationApi";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { fetchMyDoctorDetails } from "../../redux/Slices/getMyDetailsDoctorSlice";

const DoctorVerification3 = () => {
  const { getMyDoctorDetails } = useSelector((state) => state.getMyDetailsDoctor);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyDoctorDetails());
  }, [dispatch]);

  const [files, setFiles] = useState({
    profile: null,
    sign: null,
    degree: null,
    license: null,
  });

  // Handle file changes with image validation
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      dispatch(showAlert({ message: "Only image files are allowed", type: "warning" }));
      return;
    }
    setFiles((prev) => ({ ...prev, [type]: file }));
    e.target.value = null; // Reset input to allow same file re-selection
  };

  // Remove file from the state
  const handleRemoveFile = (type) => {
    setFiles((prev) => ({ ...prev, [type]: null }));
  };

  // File names for display
  const fileNames = {
    profile: "Upload Profile",
    sign: "Upload Sign/Stamp",
    degree: "Upload Degree",
    license: "Upload License",
  };

  // Render file upload row
  const renderFileRow = (type, index) => {
    const isUploadedFile = typeof files[type] === "string"; // Check if the file is a URL (uploaded file from DB)
    const fileName = isUploadedFile ? "Uploaded File" : files[type]?.name || "No file chosen";

    return (
      <div key={index} className="flex items-center justify-between mb-3 p-4 bg-white hover:bg-black-50">
        <span className="w-10 text-sm text-center">{index + 1}</span>
        <span className="w-32 text-sm">{fileNames[type]}</span>
        <span className="w-40 text-sm truncate">{fileName}</span>
        <button
          className="w-12 text-black-600 hover:text-blue-500"
          onClick={() => {
            if (isUploadedFile) {
              window.open(files[type], "_blank"); // Open the URL directly from DB
            } else if (files[type]) {
              window.open(URL.createObjectURL(files[type]), "_blank"); // Preview local file
            }
          }}
        >
          <FaRegEye className="text-xl" />
        </button>
        <button className="w-24 bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600" onClick={() => document.getElementById(`${type}-file`).click()}>
          {files[type] ? "Change" : "Upload"}
        </button>
        <input id={`${type}-file`} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, type)} />
        <button className="w-24 bg-danger text-white text-sm px-3 py-1 rounded ml-2" onClick={() => handleRemoveFile(type)}>
          Delete
        </button>
      </div>
    );
  };

  // Handle final file upload
  const uploadVerificationDocuments = async () => {
    const { profile, sign, degree, license } = files;

    // Validate all files
    if (!profile || !sign || !degree || !license) {
      dispatch(showAlert({ message: "All four documents (Profile, Sign/Stamp, Degree, License) are required", type: "warning" }));
      return;
    }

    const formData = new FormData();
    formData.append("profileUrl", profile instanceof File ? profile : null);
    formData.append("signatureUrl", sign instanceof File ? sign : null);
    formData.append("degreeUrl", degree instanceof File ? degree : null);
    formData.append("licenseUrl", license instanceof File ? license : null);

    dispatch(showLoader());

    try {
      let res = await uploadDocumentsDoctorVerificationApi(formData);
      if (res.success) {
        dispatch(showAlert({ message: res.message, type: "success" }));
        setTimeout(() => {
          navigate("/doctor/verification-page1");
        }, 2000);
      }
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  // Populate files from DB when component mounts
  useEffect(() => {
    if (getMyDoctorDetails) {
      if (getMyDoctorDetails.data.applicationStatus === "submitted" || getMyDoctorDetails.data.applicationStatus === "banned" || getMyDoctorDetails.data.applicationStatus === "completed") {
        navigate("/doctor/verification-page1");
      }

      setFiles({
        profile: getMyDoctorDetails?.data?.profileUrl || null,
        sign: getMyDoctorDetails?.data?.signatureUrl || null,
        degree: getMyDoctorDetails?.data?.degreeUrl || null,
        license: getMyDoctorDetails?.data?.licenseUrl || null,
      });
    }
  }, [getMyDoctorDetails]);

  return (
    <>
      <BreadCrumbs currentPath="Doctor Verification" />
      {getMyDoctorDetails?.data?.applicationStatus === "rejected" && (
        <>
          <p className="w-full p-3 text-messageWarning text-center pt-10 font-semibold ">{getMyDoctorDetails?.data?.adminMessage}</p>
        </>
      )}
      <div className="relative docDiv w-[85%] h-full m-auto mt-10 rounded-lg overflow-hidden">
        <div className="flex p-3 border-b border-black-400 bg-white">
          <div className="flex gap-10 p-4 select-none">
            <Link to={"/doctor/verification-page1"}>
              <div className="flex items-center gap-2">
                <FaUserShield className="text-black-500 text-2xl" />
                <span className="text-black-500 font-medium">Personal Details</span>
              </div>
            </Link>

            <Link to={"/doctor/verification-page2"}>
              <div className="flex items-center gap-2">
                <FaAddressCard className="text-black-500 text-2xl" />
                <span className="text-black-500 font-medium">Profile and Bio</span>
              </div>
            </Link>
            <div className="flex items-center gap-2 border-b-2 border-blue-400 pb-1">
              <FaFileUpload className="text-blue-500 text-2xl" />
              <div className="flex flex-col items-center">
                <span className="text-blue-500 font-medium">Upload File</span>
              </div>
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="w-[80%] h-80 mb-10 mx-auto bg-white shadow-lg rounded mt-10">
          <div className="flex items-center justify-between bg-black-100 border-b border-black-300 p-3">
            <span className="w-10 text-sm font-semibold text-center">No.</span>
            <span className="w-32 text-sm font-semibold pl-1">Name</span>
            <span className="w-40 text-sm font-semibold pl-2">File</span>
            <span className="w-16 text-sm font-semibold text-center pr-4">Preview</span>
            <span className="w-28 text-sm font-semibold">Upload</span>
            <span className="w-24 text-sm font-semibold pl-7">Delete</span>
          </div>
          {["profile", "sign", "degree", "license"].map((type, index) => renderFileRow(type, index))}
        </div>

        <Link to={"/doctor/verification-page2"}
          className="ml-auto bg-secondary duration-200 text-white m-8 shadow-lg font-bold py-2 px-3 rounded-md absolute bottom-0 right-32"
        >
          Back
        </Link>
        <button
          onClick={() => uploadVerificationDocuments()}
          className="ml-auto bg-blue-500 hover:bg-blue-700 duration-200 text-white m-8 shadow-lg font-bold py-2 px-3 rounded-md absolute bottom-0 right-0"
        >
          Final Submit
        </button>
      </div>
    </>
  );
};

export default DoctorVerification3
