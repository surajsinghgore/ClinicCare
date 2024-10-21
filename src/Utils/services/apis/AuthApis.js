import axiosInstance from "../../AxiosInstance";

export const createAdminAccountApi = async (payload) => {
  const res = await axiosInstance.post("/v1/admin/create-account", payload);
  return res.data;
};
export const otpAdminAccountVerifyApi = async (payload) => {
  const res = await axiosInstance.patch("/v1/admin/otp-verification", payload);
  return res.data;
};



export const resendOtpAdminAccountApi = async (payload) => {
  const res = await axiosInstance.patch("/v1/admin/admin-account-resend-otp", payload);
  return res.data;
};



