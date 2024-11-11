import { useCallback, useEffect, useState } from "react";
import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { getMyClinicApi } from "../../../Utils/services/apis/Doctor/ClinicDoctorApi";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceDataValidator } from "../../../Utils/services/FormValidation/ServicesValidation";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { GetMyServiceByIdApi, updateServicesApi } from "../../../Utils/services/apis/Doctor/ServiceDoctorApi";
import { useNavigate, useParams } from "react-router-dom";

const UpdateServices = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(serviceDataValidator) });
  const dispatch = useDispatch();
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0].message;

      dispatch(showAlert({ message: firstError, type: "warning" }));

      return;
    }
  }, [errors]);

  const dataFetch = useCallback(async () => {
    try {
      dispatch(showLoader());
      const res = await getMyClinicApi();
      if (res?.success) {
        setClinics(res.data);
      }
    } catch (error) {
      console.error("Error fetching clinics:", error);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch]);

  const dataFetchToUpdate = useCallback(async () => {
    try {
      dispatch(showLoader());
      const res = await GetMyServiceByIdApi(id);
      if (res?.success) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Error fetching clinics:", error);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch]);

  useEffect(() => {
    dataFetch();
    dataFetchToUpdate();
  }, []);

  // set form default value
  useEffect(() => {
    if (data) {
      setValue("treatmentName", data?.treatmentName);
      setValue("specialty", data?.specialty);
      setValue("fees", data?.fees);
      setValue("duration", data?.duration);
      setValue("limit", data?.limit);
      setValue("clinicId", data?.clinicId?._id);
      setValue("description", data?.description);
    }
  }, [data, setValue]);
  const onSubmit = async (formData) => {
    let body = { ...formData };
    dispatch(showLoader());
    try {
      let res = await updateServicesApi(id, body);
      if (res.success) {
        dispatch(showAlert({ message: "service updated successfully", type: "success" }));

        setTimeout(() => {
          navigate("/doctor/services-list?page=1&limit=10");
        }, 2000);
      }
      console.log(res);
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div>
      <BreadCrumbs currentPath="Udapte Service" />
      <div className="relative w-[95%] max-w-5xl m-auto mt-10 mb-10 bg-white rounded-lg shadow-lg p-10">
        <h2 className="text-3xl font-semibold mb-8 text-black-800">Udapte Service</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <label htmlFor="treatmentName" className="block mb-2 text-sm font-medium text-black-600">
                Treatment Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="treatmentName"
                autoFocus
                {...register("treatmentName")}
                className="border border-black-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="specialty" className="block mb-2 text-sm font-medium text-black-600">
                Specialty<span className="text-danger">*</span>
              </label>
              <input type="text" id="specialty" {...register("specialty")} className="border border-black-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="fees" className="block mb-2 text-sm font-medium text-black-600">
                Fees<span className="text-danger">*</span>
              </label>
              <input
                type="number"
                onWheel={(e) => e.target.blur()}
                id="fees"
                {...register("fees")}
                className="border border-black-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label htmlFor="duration" className="block mb-2 text-sm font-medium text-black-600">
                Duration (minutes)<span className="text-danger">*</span>
              </label>
              <input
                type="number"
                onWheel={(e) => e.target.blur()}
                id="duration"
                {...register("duration")}
                className="border border-black-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="limit" className="block mb-2 text-sm font-medium text-black-600">
                Slot availability limit<span className="text-danger">*</span>
              </label>
              <input
                type="number"
                onWheel={(e) => e.target.blur()}
                id="limit"
                {...register("limit")}
                className="border border-black-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="clinic" className="block mb-2 text-sm font-medium text-black-600">
                Select your clinic associated with this services<span className="text-danger">*</span>
              </label>
              <select id="clinic" name="clinicId" {...register("clinicId")} className="border border-black-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Clinic</option>
                {clinics?.map((clinic) => (
                  <option key={clinic._id} value={clinic._id}>
                    {clinic.name}, {clinic.address}, {clinic.city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}

          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-black-600">
              Description<span className="text-danger">*</span>
            </label>
            <textarea
              name="description"
              id="description"
              {...register("description")}
              className="border resize-none border-black-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-52"
            ></textarea>
          </div>
          {/* Submit Button */}
          <div className="flex justify-end my-10">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-lg transition duration-200 ease-in-out shadow-md hover:shadow-lg">
              Update Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateServices;
