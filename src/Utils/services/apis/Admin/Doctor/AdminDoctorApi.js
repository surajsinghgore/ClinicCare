import axiosInstance from "../../../../AxiosInstance";

export const createDoctorApi = async (payload) => {
  const res = await axiosInstance.post("/v1/admin/create-doctor", payload);
  return res.data;
};

export const fetchAllDoctorSubmittedListApi = async (page = 1, limit = 10) => {
  const res = await axiosInstance.get(`/v1/admin/doctors/submitted?page=${page}&limit=${limit}`);
  return res.data;
};

export const fetchSingleDoctorSubmittedDataApi = async (id) => {
  const res = await axiosInstance.get(`/v1/admin/doctors/submitted/${id}`);
  return res.data;
};

export const searchAllDoctorSubmittedListApi = async (search) => {
  const res = await axiosInstance.get(`/v1/admin/doctors/search/${search}`);
  return res.data;
};
export const fetchAllDoctorListApi = async () => {
  const res = await axiosInstance.get(`/v1/admin/doctors/get-all-doctor`);
  return res.data;
};
export const searchAllDoctorListApi = async (search) => {
  const res = await axiosInstance.get(`/v1/admin/doctors/get-all-doctor/${search}`);
  return res.data;
};

export const updateDoctorApplicationApi = async (id, payload) => {
  const res = await axiosInstance.patch(`/v1/admin/doctors/review-doctor-application/${id}`, payload);
  return res.data;
};