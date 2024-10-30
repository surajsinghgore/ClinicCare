import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAdminValidation } from "../../Utils/services/FormValidation/AdminValidation";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { showLoader, hideLoader } from "../../redux/Slices/LoaderState";
import { setSessionStorage } from "../../Utils/SessionStorage";
import BreadCrumbs from "../../components/Common/BreadCrumbs";
import { createAdminAccountPermissionApi } from "../../Utils/services/apis/Admin/AdminApi";

const AdminUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerAdminValidation) });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0].message;
      dispatch(showAlert({ message: firstError, type: "warning" }));
      return;
    }
  }, [errors]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePermissionChange = (e) => {
    setSelectedPermission(e.target.id);
  };

  const onSubmit = async (formData) => {
    let body = { ...formData, permission: selectedPermission };
    if (selectedPermission === "") {
      dispatch(showAlert({ message: "Please select permission of admin", type: "warning" }));
      return;
    }
    dispatch(showLoader());

    try {
      let res = await createAdminAccountPermissionApi(body);
      dispatch(showAlert({ message: res.message, type: "success" }));
      setSessionStorage("email", res.email);
      setTimeout(() => {
        navigate("/admin/admins-list");
      }, 2000);
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="container mx-auto p-6">
      <BreadCrumbs currentPath="Create Admin" />
      <div className="w-full mt-8">
        <div className="bg-white shadow-lg rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-10 text-left">Update Admin</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label htmlFor="name" className="block text-sm font-medium text-black-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
                autoComplete="off"
                {...register("name")}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-black-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
                autoComplete="off"
                {...register("email")}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="number" className="block text-sm font-medium text-black-700">
                Mobile Number
              </label>
              <input
                type="number"
                id="number"
                className="mt-1 block w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
                autoComplete="off"
                {...register("mobile")}
              />
            </div>

            <div className="mb-7 relative">
              <label htmlFor="password" className="block text-sm font-medium text-black-700">
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
                autoComplete="off"
                {...register("password")}
              />
              <div className="absolute inset-y-0 right-0 top-[35%] pr-3 flex items-center text-sm leading-5">
                {passwordVisible ? (
                  <FaRegEyeSlash onClick={togglePasswordVisibility} className="cursor-pointer text-lg" />
                ) : (
                  <FaRegEye onClick={togglePasswordVisibility} className="cursor-pointer text-lg" />
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-black-700 mb-2">Permissions</label>
              <div className="flex flex-wrap">
                {["all", "read", "write", "update", "create"].map((perm) => (
                  <div className="flex items-center mr-4" key={perm}>
                    <input
                      type="checkbox"
                      id={perm}
                      className="h-4 w-4 text-[#13BEF0] focus:ring-[#13BEF0] border-black-300 rounded"
                      checked={selectedPermission === perm}
                      onChange={handlePermissionChange}
                    />
                    <label htmlFor={perm} className="ml-2 text-base text-black-900">
                      {perm.charAt(0).toUpperCase() + perm.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="ml-[85%]">
              <button type="submit" className="w-40 py-2 bg-[#004AAD] text-white rounded-md hover:bg-[#0fa3d1] font-medium">
                Update Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdate;
