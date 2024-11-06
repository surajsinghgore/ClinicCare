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


export const ourDoctorSearchApi = async (search) => {
  const res = await axiosInstance.get(`/v1/our-doctor/${search}`);
  return res.data;
};
export const ourDoctorAllDataApi = async () => {
  const res = await axiosInstance.get(`/v1/our-doctor`);
  return res.data;
};
