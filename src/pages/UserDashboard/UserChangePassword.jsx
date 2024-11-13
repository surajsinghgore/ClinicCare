import React, { useState, useEffect } from 'react';
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { showAlert } from '../../redux/Slices/AlertToggleState';
import { hideLoader, showLoader } from '../../redux/Slices/LoaderState';
import { changeUserActivePasswordApi } from '../../Utils/services/apis/User/UserPersonalApi';
import { useNavigate } from 'react-router-dom';
import { passwordChangeValidationSchema } from '../../Utils/services/FormValidation/UserValidation';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const UserChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordChangeValidationSchema),
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0].message;
      dispatch(showAlert({ message: firstError, type: "warning" }));
      return;
    }
  }, [errors]);

  const onSubmit = async (formData) => {
    const { confirmPassword, ...body } = formData;

    dispatch(showLoader());

    try {
      const res = await changeUserActivePasswordApi(body);
      if (res.success) {
        dispatch(showAlert({ message: res.message, type: "success" }));
        navigate("/user/user-general-details");
      }
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message || "Failed to change account password", type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisible(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-[80%] p-8">
        <h1 className="flex gap-4 text-3xl font-bold text-left text-[#004AAD] mb-10">Change Password <RiLockPasswordLine /></h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Current Password */}
          <div className="mb-5 relative">
            <label htmlFor="currentPassword" className="block text-base font-medium text-black-700 mb-1">
              Current Password
            </label>
            <input
              type={passwordVisible.oldPassword ? "text" : "password"}
              id="currentPassword"
              autoFocus
              required
              className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:border-[#004AAD]"
              placeholder="Enter current password"
              {...register("oldPassword")} // Register oldPassword field
            />
            <div className="absolute inset-y-0 right-0 top-[35%] pr-3 flex items-center text-sm leading-5">
              {passwordVisible.oldPassword ? (
                <FaRegEyeSlash onClick={() => togglePasswordVisibility("oldPassword")} className="cursor-pointer text-lg" />
              ) : (
                <FaRegEye onClick={() => togglePasswordVisibility("oldPassword")} className="cursor-pointer text-lg" />
              )}
            </div>
          </div>

          {/* New Password */}
          <div className="mb-6 relative">
            <label htmlFor="newPassword" className="block text-base font-medium text-black-700 mb-1">
              New Password
            </label>
            <input
              type={passwordVisible.newPassword ? "text" : "password"}
              id="newPassword"
              className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:border-[#004AAD]"
              placeholder="Enter new password"
              name="newPassword"

              {...register("newPassword")}
              required
            />
            <div className="absolute inset-y-0 right-0 top-[35%] pr-3 flex items-center text-sm leading-5">
              {passwordVisible.newPassword ? (
                <FaRegEyeSlash onClick={() => togglePasswordVisibility("newPassword")} className="cursor-pointer text-lg" />
              ) : (
                <FaRegEye onClick={() => togglePasswordVisibility("newPassword")} className="cursor-pointer text-lg" />
              )}
            </div>
          </div>

          {/* Re-enter New Password */}
          <div className="mb-7 relative">
            <label htmlFor="confirmPassword" className="block text-base font-medium text-black-700 mb-1">
              Re-enter New Password
            </label>
            <input
              type={passwordVisible.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:border-[#004AAD]"
              placeholder="Re-enter new password"
              {...register("confirmPassword")}
              required
            />
            <div className="absolute inset-y-0 right-0 top-[35%] pr-3 flex items-center text-sm leading-5">
              {passwordVisible.confirmPassword ? (
                <FaRegEyeSlash onClick={() => togglePasswordVisibility("confirmPassword")} className="cursor-pointer text-lg" />
              ) : (
                <FaRegEye onClick={() => togglePasswordVisibility("confirmPassword")} className="cursor-pointer text-lg" />
              )}
            </div>
          </div>

          {/* Update Password Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#004AAD] to-[#0fa3d1] text-white font-medium rounded-md shadow-md transition duration-200 hover:bg-blue-700"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserChangePassword;
