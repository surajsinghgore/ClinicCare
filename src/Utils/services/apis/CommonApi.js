import axiosInstance from "../../AxiosInstance";


export const loginApi = async (payload) => {
  const res = await axiosInstance.post("/v1/login", payload);
  return res.data;
};

export const loginAdminOtpVerifyApi = async (payload) => {
  const res = await axiosInstance.post("/v1/login/otp-verify", payload);
  return res.data;
};
