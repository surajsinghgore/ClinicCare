import axiosInstance from "../../../../AxiosInstance";

export const getMeActiveDetailsAdminApi = async () => {
  const res = await axiosInstance.get("/v1/admin/get-me-admin");
  return res.data;
};
