import BreadCrumbs from "../../components/Common/BreadCrumbs";
import { FaUserEdit } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { FaUserShield, FaAddressCard } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyDoctorDetails } from "../../redux/Slices/getMyDetailsDoctorSlice";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { doctorPersonalUpdateValidator } from "../../Utils/services/FormValidation/DoctorValidation";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { updatePersonalDetailsDoctorVerificationApi } from "../../Utils/services/apis/Doctor/DoctorVerificationApi";
import { useNavigate } from "react-router-dom";

const DoctorVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const { getMyDoctorDetails } = useSelector((state) => state.getMyDetailsDoctor);
  useEffect(() => {
    dispatch(fetchMyDoctorDetails());
  }, [dispatch]);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(doctorPersonalUpdateValidator) });
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0].message;

      dispatch(showAlert({ message: firstError, type: "warning" }));

      return;
    }
  }, [errors]);

  const onSubmit = async (formData) => {
    if (selected.length == 0) {
      dispatch(showAlert({ message: "Please enter at least one hobby.", type: "warning" }));
      return;
    }

    dispatch(showLoader());
    try {
      let body = { ...formData, hobbies: selected };
      let res = await updatePersonalDetailsDoctorVerificationApi(body);
      dispatch(showAlert({ message: res.message, type: "success" }));
      if (res.success) {
        setTimeout(() => {
          navigate("/doctor/verification-page2");
        }, 2000);
      }
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  // set form default value
  useEffect(() => {
    if (getMyDoctorDetails) {
      // Set values for the form fields
      setValue("name", getMyDoctorDetails?.data?.name);

      // Convert dob to 'YYYY-MM-DD' format before setting
      setValue("dob", getMyDoctorDetails?.data?.dob ? new Date(getMyDoctorDetails?.data?.dob).toISOString().split("T")[0] : "");

      setValue("gender", getMyDoctorDetails?.data?.gender);
      setValue("mobile", getMyDoctorDetails?.data?.mobile);
      setValue("hobbies", getMyDoctorDetails?.data?.hobbies);
      setSelected(getMyDoctorDetails?.data?.hobbies);
    }
  }, [getMyDoctorDetails, setValue]);
  return (
    <>
      <BreadCrumbs currentPath="Doctor Verification" />
      {getMyDoctorDetails?.data?.applicationStatus === "rejected" && (
        <>
          <p className="w-full p-3 text-messageWarning  font-semibold ">{getMyDoctorDetails?.data?.adminMessage}</p>
        </>
      )}

      <div className="heading relative docDiv  w-[85%] h-full m-auto mt-10 rounded-lg overflow-hidden">
        {(getMyDoctorDetails?.data?.applicationStatus === "rejected" || getMyDoctorDetails?.data?.applicationStatus === "pending") && (
          <>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex p-3 border-b border-black-400 bg-white">
                  <div className="flex gap-10 p-4 select-none">
                    <div className="flex items-center gap-2 border-b-2 border-blue-400 pb-1">
                      <FaUserShield className="text-blue-500 text-2xl" />
                      <div className="flex flex-col items-center">
                        <span className="text-blue-500 font-medium">Personal Details</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ">
                      <FaAddressCard className="text-black-500 text-2xl" />
                      <span className="text-black-500 font-medium">Profile and Bio</span>
                    </div>

                    <div className="flex items-center gap-2 ">
                      <FaFileUpload className="text-black-500 text-2xl " />
                      <span className="text-black-500 font-medium ">Upload File</span>
                    </div>
                  </div>
                </div>

                <div className="flex p-6 flex-wrap">
                  <div className="flex flex-col mr-16 md:w-1/3 p-2">
                    <label className="text-black-400 pb-2" htmlFor="name">
                      Doctor Name <span className="text-danger text-lg">*</span>
                    </label>
                    <div className="flex items-center relative">
                      <input
                        type="text"
                        name="name"
                        {...register("name")}
                        id="name"
                        placeholder="Enter doctor name..."
                        className="w-96 rounded-lg p-2 border border-black-200 focus:outline-none pl-10"
                        required
                      />
                      <FaUserEdit className="ml-2 text-lg absolute left-1" />
                    </div>
                  </div>

                  <div className="flex flex-col mr-16 md:w-1/3 p-2">
                    <label className="text-black-400 pb-2" htmlFor="dob">
                      Date of Birth{" "}
                      <span className="text-danger text-lg" id="dob">
                        *
                      </span>
                    </label>
                    <div className="flex items-center relative">
                      <input type="date" name="dob" {...register("dob")} className="w-96 rounded-lg p-2 border border-black-200 focus:outline-none pl-10" required />
                      <MdOutlineDateRange className="ml-2 text-lg absolute left-1" />
                    </div>
                  </div>

                  <div className="flex flex-col mr-16 md:w-1/3 p-2">
                    <label className="text-black-400 pb-2">
                      Gender <span className="text-danger text-lg">*</span>
                    </label>
                    <div className="flex items-center">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="gender" value="male" {...register("gender")} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" required />
                        <span className="text-gray-700">Male</span>
                      </label>
                      <label className="flex items-center gap-2 ml-4">
                        <input type="radio" name="gender" value="female" {...register("gender")} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" required />
                        <span className="text-gray-700">Female</span>
                      </label>
                      <label className="flex items-center gap-2 ml-4">
                        <input
                          type="radio"
                          name="gender"
                          value="other"
                          {...register("gender")}
                          {...register("gender")}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          required
                        />
                        <span className="text-gray-700">Other</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex p-6 mr-10">
                  <div className="flex flex-col p-2 mr-16">
                    <label className="text-black-400 pb-2" htmlFor="mobile">
                      Mobile Number <span className="text-danger text-lg">*</span>
                    </label>
                    <div className="flex items-center relative">
                      <input
                        name="mobile"
                        {...register("mobile")}
                        type="text"
                        id="mobile"
                        placeholder="Add mobile number..."
                        className="w-96 rounded-lg p-2 border border-black-200 focus:outline-none pl-10"
                        required
                      />
                      <FaPhone className="ml-2 text-lg absolute left-1" />
                    </div>
                  </div>

                  <div className="flex pt-3 flex-wrap flex-col w-96">
                    <h1 className="text-black-400 pb-2">
                      Add Hobbies<span className="text-danger text-lg">*</span>
                    </h1>
                    <TagsInput required value={selected} onChange={setSelected} name="fruits" placeHolder="Enter your hobbies..." />
                    <em className="text-black-400">press enter to add new hobbies</em>
                  </div>
                </div>

                <button className="ml-auto bg-blue-500 hover:bg-blue-700 duration-200 text-white m-8 shadow-lg font-bold py-2 px-3 rounded-md absolute bottom-0 right-0">Save & Next</button>
              </form>
            </div>
          </>
        )}

        {getMyDoctorDetails?.data?.applicationStatus === "banned" && (
          <>
            <div>
              {/* Pending Status page */}

              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Application Status is {getMyDoctorDetails?.data?.applicationStatus}</h1>
                <p className="text-lg text-gray-600 mb-6">&ldquo;{getMyDoctorDetails?.data?.adminMessage}&ldquo;</p>
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
                </div>
              </div>
            </div>
          </>
        )}
        {getMyDoctorDetails?.data?.applicationStatus === "submitted" && (
          <>
            <div>
              {/* Pending Status page */}

              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Verification Under Review...</h1>
                <p className="text-lg text-gray-600 mb-6">&ldquo;Your verification is still pending. Please wait while we complete the approval process&ldquo;</p>
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DoctorVerification;
