import axiosInstance from "../../../AxiosInstance";

export const getServiceByIdApi = async (id) => {
  const res = await axiosInstance.get(`/v1/user/service/get-service-by-id/${id}`);
  return res.data;
};
export const getPlatformFeeApi = async () => {
  const res = await axiosInstance.get(`/v1/user/service/get-platform-fee`);
  return res.data;
};