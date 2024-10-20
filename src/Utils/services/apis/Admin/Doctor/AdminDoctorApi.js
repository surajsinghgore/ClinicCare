import axiosInstance from "../../../../AxiosInstance";

export const createDoctorApi = async (payload) => {
  const res = await axiosInstance.post("/v1/admin/create-doctor", payload);
  return res.data;
};
