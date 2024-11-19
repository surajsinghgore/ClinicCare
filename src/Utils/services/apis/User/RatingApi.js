import axiosInstance from "../../../AxiosInstance";

export const getMyRatingOfDoctor = async (doctorId) => {
  const res = await axiosInstance.get(`/v1/user/get-my-rating/${doctorId}`);
  return res.data;
};

export const giveMyRatingOfDoctor = async (doctorId, payload) => {
  const res = await axiosInstance.post(`/v1/user/give-doctor-rating/${doctorId}`, payload);
  return res.data;
};

export const getAllRatingOfDoctor = async (doctorId, limit = 10) => {
  const res = await axiosInstance.get(`/v1/get-rating-doctor-all/${doctorId}?limit=${limit}`);
  return res.data;
};

export const getAllRatingOfDoctorSortBy = async (doctorId, limit = 10, sortBy = "latest") => {
  const res = await axiosInstance.get(`/v1/get-rating-doctor-sortBy/${doctorId}?limit=${limit}&sortBy=${sortBy}`);
  return res.data;
};
export const searchAllRatingOfDoctor = async (doctorId, search = "") => {
  const res = await axiosInstance.get(`/v1/search-rating-doctor/${doctorId}?search=${search}`);
  return res.data;
};
