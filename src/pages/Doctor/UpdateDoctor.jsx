import { useEffect } from "react";
import AdminNavigate from "../../components/Common/BreadCrumbs";
import { RiUserAddLine } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { createDoctorValidation } from "../../Utils/services/FormValidation/AdminValidation";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { showLoader, hideLoader } from "../../redux/Slices/LoaderState";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createDoctorApi } from "../../Utils/services/apis/Admin/Doctor/AdminDoctorApi";
import { useNavigate, useParams } from "react-router-dom";

const UpdateDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const {id}=useParams()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createDoctorValidation) });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0].message;

      dispatch(showAlert({ message: firstError, type: "warning" }));

      return;
    }
  }, [errors]);

  const onSubmit = async (formData) => {
    let body = { ...formData };

    dispatch(showLoader());

    try {
      let res = await createDoctorApi(body);
      if (res.success) {
        reset();
        dispatch(showAlert({ message: res.message, type: "success" }));
        setTimeout(() => {
          navigate("/admin/verify-doctor?page=1&limit=10");
        }, 2000);
      }
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <>
      <AdminNavigate currentPath="Update Doctor" />

      <div className="relative w-[90%] h-[55%] m-auto mt-10 rounded-lg shadow-lg">
        <div className="p-5 flex items-center gap-3 text-[#116AEF] border-b border-gray-400">
          <RiUserAddLine />
          <h1 className="font-semibold text-2xl">Update Doctor</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="flex flex-wrap md:flex-nowrap">
            <div className="flex flex-col mr-28">
              <label htmlFor="name" className="mb-2 text-black-600">
                Doctor Name
              </label>
              <div className="relative">
                <FaUserEdit className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-black-500" />
                <input
                  type="text"
                  {...register("name")}
                  autoFocus
                  autoComplete="off"
                  id="name"
                  placeholder="Add doctor name..."
                  className="w-80 p-2 pl-10 rounded-lg border border-black-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <label htmlFor="email" className="mb-2 text-black-600">
                Email
              </label>
              <div className="relative">
                <MdOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-black-500" />
                <input
                  type="email"
                  {...register("email")}
                  autoComplete="off"
                  id="email"
                  placeholder="Add doctor email..."
                  className="w-80 p-2 pl-10 rounded-lg border border-black-300 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 duration-200 text-white font-bold py-2 px-4 shadow-lg rounded-md absolute bottom-6 right-6">Create Doctor Profile</button>
        </form>
      </div>
    </>
  );
};

export default UpdateDoctor;
