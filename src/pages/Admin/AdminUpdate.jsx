import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateAdminValidation } from "../../Utils/services/FormValidation/AdminValidation";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { showLoader, hideLoader } from "../../redux/Slices/LoaderState";
import { setSessionStorage } from "../../Utils/SessionStorage";
import BreadCrumbs from "../../components/Common/BreadCrumbs";
import { createAdminAccountPermissionApi, getAdminByIdApi, updateAdminAccountApi } from "../../Utils/services/apis/Admin/AdminApi";

const AdminUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState("");
  const [data, setData] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(updateAdminValidation) });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0].message;
      dispatch(showAlert({ message: firstError, type: "warning" }));
      return;
    }
  }, [errors]);

  const dataFetch = async () => {
    try {
      dispatch(showLoader());
      let res = await getAdminByIdApi(id);
      if (res?.success) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePermissionChange = (e) => {
    setSelectedPermission(e.target.id);
  };

  const onSubmit = async (formData) => {
    let body = { ...formData, permission: selectedPermission };

    // Check if permission is selected
    if (selectedPermission === "") {
      dispatch(showAlert({ message: "Please select permission of admin", type: "warning" }));
      return;
    }

    // Check password manually if changePassword is true
    if (changePassword) {
      const password = formData.password;

      if (!password) {
        dispatch(showAlert({ message: "New Password is required", type: "warning" }));
        return;
      }

      // Validate password conditions one by one
      if (password.length < 5) {
        dispatch(showAlert({ message: "New Password must be at least 5 characters long.", type: "warning" }));
        return;
      }
      if (!/[A-Z]/.test(password)) {
        dispatch(showAlert({ message: "New Password must contain at least one uppercase letter.", type: "warning" }));
        return;
      }
      if (!/[a-z]/.test(password)) {
        dispatch(showAlert({ message: "New Password must contain at least one lowercase letter.", type: "warning" }));
        return;
      }
      if (!/[0-9]/.test(password)) {
        dispatch(showAlert({ message: "New Password must contain at least one number.", type: "warning" }));
        return;
      }
      if (!/[\W_]/.test(password)) {
        dispatch(showAlert({ message: "New Password must contain at least one special character.", type: "warning" }));
        return;
      }
    } else {
      body.password = null;
    }

    dispatch(showLoader());

    try {
      let res = await updateAdminAccountApi(id, body);
      dispatch(showAlert({ message: res.message, type: "success" }));
      setTimeout(() => {
        navigate("/admin/admins-list");
      }, 2000);
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  // getAdminByIdApi

  useEffect(() => {
    dataFetch();
  }, []);
  useEffect(() => {
    const clinicId = id;
    if (clinicId) {
      if (data && data.length !== 0) {
        setValue("name", data?.name);
        setValue("email", data?.email);
        setValue("mobile", data?.mobile);
        setSelectedPermission(data?.permission);
      }
    }
  }, [data]);
  return (
    <div className="container mx-auto p-6">
      <BreadCrumbs currentPath="Update Admin" />
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

            <div className="mb-7 relative text-danger cursor-pointer" onClick={() => setChangePassword(!changePassword)}>
              {changePassword ? <>Click here to don’t change password</> : <>Click here to change password</>}{" "}
            </div>
            {changePassword && (
              <div className="mb-7 relative">
                <label htmlFor="password" className="block text-sm font-medium text-black-700">
                  New Password
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
            )}

            <div className="mb-6">
              <label className="block text-lg font-medium text-black-700 mb-2">Permissions</label>
              <div className="flex flex-wrap">
                {["all", "read", "delete", "update", "create"].map((perm) => (
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
