import axiosInstance from "../../AxiosInstance";

export const loginApi = async (payload) => {
  const res = await axiosInstance.post("/v1/login", payload);
  return res.data;
};

export const loginAdminOtpVerifyApi = async (payload) => {
  const res = await axiosInstance.post("/v1/login/otp-verify", payload);
  return res.data;
};

export const forgetPasswordUsingEmailApi = async (payload) => {
  const res = await axiosInstance.patch("/v1/forgot-password", payload);
  return res.data;
};
export const resetPasswordUsingEmailApi = async (payload) => {
  const res = await axiosInstance.patch("/v1/forgot-password/verify-otp", payload);
  return res.data;
};
