import React from 'react';
import { RiLockPasswordLine } from "react-icons/ri";

const UserChangePassword = () => {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-[80%] p-8">
        <h1 className="flex gap-4 text-3xl font-semibold text-left text-[#004AAD] mb-10">Change Password <RiLockPasswordLine /></h1>
        
        <form>
          {/* Current Password */}
          <div className="mb-5">
            <label htmlFor="currentPassword" className="block text-base font-medium text-black-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:border-[#004AAD]"
              placeholder="Enter current password"
            />
          </div>

          {/* New Password */}
          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-base font-medium text-black-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:border-[#004AAD]"
              placeholder="Enter new password"
            />
          </div>

          {/* Re-enter New Password */}
          <div className="mb-7">
            <label htmlFor="reenterNewPassword" className="block text-base font-medium text-black-700 mb-1">
              Re-enter New Password
            </label>
            <input
              type="password"
              id="reenterNewPassword"
              className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:border-[#004AAD]"
              placeholder="Re-enter new password"
            />
          </div>

          {/* Update Password Button */}
          <button
            type="button"
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
