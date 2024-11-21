import axiosInstance from "../../../AxiosInstance";

export const getMeActiveDetailsAdminApi = async () => {
  const res = await axiosInstance.get("/v1/admin/get-me-admin");
  return res.data;
};
export const getAllAdminApi = async (page = 1, limit = 10) => {
  const res = await axiosInstance.get(`/v1/admin/get-all-admin?page=${page}&limit=${limit}`);
  return res.data;
};
export const searchAllAdminApi = async (search) => {
  const res = await axiosInstance.get(`/v1/admin/get-all-admin/${search}`);
  return res.data;
};
export const deleteAdminApi = async (id) => {
  const res = await axiosInstance.delete(`/v1/admin/delete-admin/${id}`);
  return res.data;
};
export const getAdminByIdApi = async (id) => {
  const res = await axiosInstance.get(`/v1/admin/get-all-admin/${id}`);
  return res.data;
};
export const createAdminAccountPermissionApi = async (payload) => {
  const res = await axiosInstance.post("/v1/admin/create-admin-account-permission", payload);
  return res.data;
};
export const updateAdminAccountApi = async (id,payload) => {
  const res = await axiosInstance.post(`/v1/admin/update-admin-account/${id}`, payload);
  return res.data;
};
export const createAdminAccountApi = async (payload) => {
  const res = await axiosInstance.post("/v1/admin/create-account", payload);
  return res.data;
};