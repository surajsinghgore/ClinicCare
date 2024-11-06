import axiosInstance from "../../../../AxiosInstance.js";

export const createOrUpdatePlatformFeeApi = async (payload) => {
  const res = await axiosInstance.post("/v1/platformfee/platformfee", payload);
  return res.data;
};
export const getPlatformFeeApi = async () => {
  const res = await axiosInstance.get("/v1/platformfee/platformfee");
  return res.data;
};
