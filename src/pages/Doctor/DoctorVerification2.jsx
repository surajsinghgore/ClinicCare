import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/Common/BreadCrumbs";
import { FaUserShield, FaAddressCard } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineStarRate } from "react-icons/md";
import { TagsInput } from "react-tag-input-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMyDoctorDetails } from "../../redux/Slices/getMyDetailsDoctorSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { updateQualificationDetailsDoctorVerificationApi } from "../../Utils/services/apis/Doctor/DoctorVerificationApi";
import { doctorQualificationUpdateValidator } from "../../Utils/services/FormValidation/DoctorValidation";

const DoctorVerification2 = () => {
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
  } = useForm({ resolver: yupResolver(doctorQualificationUpdateValidator) });
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0].message;

      dispatch(showAlert({ message: firstError, type: "warning" }));

      return;
    }
  }, [errors]);

  const onSubmit = async (formData) => {
    if (selected.length == 0) {
      dispatch(showAlert({ message: "Please enter at least one highlights.", type: "warning" }));
      return;
    }

    dispatch(showLoader());
    try {
      let body = { ...formData, highlights: selected };
      let res = await updateQualificationDetailsDoctorVerificationApi(body);
      if (res.success) {
          dispatch(showAlert({ message: res.message, type: "success" }));
        setTimeout(() => {
          navigate("/doctor/verification-page3");
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
      setValue("degree", getMyDoctorDetails?.data?.degree);
      setValue("licenseNumber", getMyDoctorDetails?.data?.licenseNumber);
      setValue("experience", getMyDoctorDetails?.data?.experience);
      setValue("specialization", getMyDoctorDetails?.data?.specialization);
      setSelected(getMyDoctorDetails?.data?.highlights);
    }
  }, [getMyDoctorDetails, setValue]);
  return (
    <>
      <BreadCrumbs currentPath="Doctor Verification" />

      <div className="relative docDiv w-[85%] h-full m-auto mt-10 rounded-lg overflow-hidden">
        <div className="flex p-3 border-b border-black-400 bg-white">
          <div className="flex gap-10 p-4 select-none">
            {/* Navigation Item */}
            <div className="flex items-center gap-2 ">
              <FaUserShield className="text-black-500 text-2xl" />
              <span className="text-black-500 font-medium">Personal Details</span>
            </div>

            {/* Active Navigation Item */}
            <div className="flex items-center gap-2 border-b-2 border-blue-400 pb-1">
              <FaAddressCard className="text-blue-500 text-2xl" />
              <div className="flex flex-col items-center">
                <span className="text-blue-500 font-medium">Profile and Bio</span>
              </div>
            </div>

            {/* Navigation Item */}
            <div className="flex items-center gap-2 ">
              <FaFileUpload className="text-black-500 text-2xl " />
              <span className="text-black-500 font-medium ">Upload File</span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Input Fields Container */}
          <div className="flex flex-wrap p-8 gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <label className="text-black-500 font-medium" htmlFor="degree">
                  Degree <span className="text-danger text-lg">*</span>
                </label>
              </div>
              <div className="relative">
                <input type="text" name="degree" id="degree" {...register("degree")} required className="border border-black-300 p-2 rounded-md w-80 pl-10" placeholder="Enter your degree" />
                <TbCertificate className="absolute left-3 top-3 text-black-400" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="text-black-500 font-medium" htmlFor="licenseNumber">
                  licenseNumber <span className="text-danger text-lg">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="licenseNumber"
                  id="licenseNumber"
                  required
                  {...register("licenseNumber")}
                  className="border border-black-300 p-2 rounded-md w-80 pl-10"
                  placeholder="Enter your licence number"
                />
                <FaAddressCard className="absolute left-3 top-3 text-black-400" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="text-black-500 font-medium" htmlFor="experience">
                  Experience <span className="text-danger text-lg">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="experience"
                  id="experience"
                  required
                  {...register("experience")}
                  className="border border-black-300 p-2 rounded-md w-80 pl-10"
                  placeholder="Enter your experience"
                />
                <FaUserDoctor className="absolute left-3 top-3 text-black-400" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="text-black-500 font-medium" id="specialization">
                  Specialization <span className="text-danger text-lg">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="specialization"
                  id="specialization"
                  required
                  {...register("specialization")}
                  className="border border-black-300 p-2 rounded-md w-80 pl-10"
                  placeholder="Enter your specialization"
                />
                <MdOutlineStarRate className="absolute left-3 top-3 text-black-400" />
              </div>
            </div>

            <div className="flex pt-3 flex-wrap flex-col w-96">
              <h1 className="text-black-400 pb-2">
                Add Profile Highlights<span className="text-danger text-lg">*</span>
              </h1>
              <TagsInput required value={selected} onChange={setSelected} name="fruits" placeHolder="Enter your highlights..." />
              <em className="text-black-400">press enter to add your highlights</em>
            </div>
          </div>

          <button className="ml-auto bg-blue-500 hover:bg-blue-700 duration-200 text-white m-8 shadow-lg font-bold py-2 px-3 rounded-md absolute bottom-0 right-0">Save & Next</button>
        </form>
      </div>
    </>
  );
};

export default DoctorVerification2;
