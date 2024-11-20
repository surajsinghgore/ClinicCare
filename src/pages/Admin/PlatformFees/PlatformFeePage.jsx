import { useEffect, useState } from "react";
import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { platformFeeValidation } from "../../../Utils/services/FormValidation/PlatformValidation";
import { createOrUpdatePlatformFeeApi, getPlatformFeeApi } from "../../../Utils/services/apis/Admin/PlatformFee/PlatformFeeApi";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";

const PlatformFeePage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(platformFeeValidation) });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0].message;
      dispatch(showAlert({ message: firstError, type: "warning" }));
      return;
    }
  }, [errors]);

  // Fetch data when component mounts
  const dataFetch = async () => {
    try {
      dispatch(showLoader());
      let res = await getPlatformFeeApi();
      if (res?.status) {

        setData(res.data);  // Set fetched data to the state
        setValue("fees", res.data.fees); // Set the fees value in the form
      }
    } catch (error) {
      console.log(error);
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);  // Empty dependency array to ensure dataFetch is called once on component mount

  const onSubmit = async (formData) => {
    dispatch(showLoader());
    try {
      const res = await createOrUpdatePlatformFeeApi(formData);
      if (res.status) {
        dispatch(showAlert({ message: res.message, type: "success" }));
        dataFetch()
      }

    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message || "Failed to add platform fee", type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <>
      <BreadCrumbs currentPath="Platform Fee" />
      <div className="relative w-[80%] max-w-xl m-auto mt-24 rounded-lg shadow-md p-8 bg-white">
        <h1 className="text-2xl font-semibold underline text-black-800 mb-8">Platform Fee</h1>
        <label htmlFor="fees" className="text-lg font-medium mb-2 block text-black-700">
          Enter Platform Fee:
        </label>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-14 items-end space-x-3">
            <input
              type="text"
              id="fees"
              autoFocus
              {...register("fees")}
              required
              placeholder="Enter amount..."
              className="w-full px-4 py-3 border border-black-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-black-800 placeholder-black-500"
            />
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none transition-colors">
              {data.length !== 0 ? (
                <>Update Fee</>
              ) : (
                <>Add Fee</>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlatformFeePage;
