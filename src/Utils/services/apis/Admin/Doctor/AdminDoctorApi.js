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


