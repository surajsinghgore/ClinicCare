import { useEffect, useState } from "react";
import loginRegister from "../../assets/loginRegister.png";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAdminValidation } from "../../Utils/services/FormValidation/AdminValidation";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { useDispatch } from "react-redux";

import { createAdminAccountApi } from "../../Utils/services/apis/AuthApis";
import { showLoader, hideLoader } from "../../redux/Slices/LoaderState";
import { setSessionStorage } from "../../Utils/SessionStorage";

const AdminCreate = () => {
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
    if (selectedPermission == "") {
      dispatch(showAlert({ message: "Please select permission of admin", type: "warning" }));
      return;
    }
    dispatch(showLoader());

    try {
      let res = await createAdminAccountApi(body);
      dispatch(showAlert({ message: res.message, type: "success" }));
      setSessionStorage("email", res.email);
      setTimeout(() => {
        navigate("/auth/otpverify");
      }, 2000);
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };
  return (
    <div className="flex justify-center items-center mt-16">
      <div className="w-1/2 flex justify-center items-center">
        <img src={loginRegister} alt="Register" className="w-full object-cover ml-56" />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="border rounded-lg p-8 mr-56" style={{ borderColor: "#d3d3d3" }}>
          <h2 className="text-2xl font-bold mb-4">Create Admin Form</h2>
          <form className="w-[380px]" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
                autoComplete="off"
                autoFocus
                {...register("name")}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
                autoComplete="off"
                {...register("email")}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="number" className="block text-sm text-gray-700 font-medium">
                Mobile Number
              </label>
              <input
                type="number"
                id="number"
                className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
                autoComplete="off"
                {...register("mobile")}
              />
            </div>
            <div className="mb-7 relative">
              <label htmlFor="password" className="block text-sm text-gray-700 font-medium">
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
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
            <div className="mb-4">
              <label className="block text-sm text-gray-700 font-medium mb-2">Permissions</label>
              <div className="flex flex-wrap">
                {/* Only one permission checkbox can be selected at a time */}
                {["all", "read", "write", "update", "create"].map((perm) => (
                  <div className="flex items-center mr-4" key={perm}>
                    <input
                      type="checkbox"
                      id={perm}
                      className="h-4 w-4 text-[#13BEF0] focus:ring-[#13BEF0] border-[#13BEF0] rounded"
                      checked={selectedPermission === perm} // Check if this permission is selected
                      onChange={handlePermissionChange} // Handle change event
                    />
                    <label htmlFor={perm} className="ml-2 block text-sm text-gray-900 font-medium">
                      {perm.charAt(0).toUpperCase() + perm.slice(1)} {/* Capitalize the permission label */}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <button type="submit" className="w-full py-2 px-4 bg-[#004AAD] text-white rounded-md hover:bg-[#0fa3d1] font-medium">
                Register
              </button>
            </div>
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-700 font-medium">Already have an account? </span>
              <Link to="/auth/login" className="text-sm text-[#004AAD] hover:underline font-medium">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreate;
