import axiosInstance from "../../../AxiosInstance";

export const getMyRatingOfDoctor = async (doctorId) => {
  const res = await axiosInstance.get(`/v1/user/get-my-rating/${doctorId}`);
  return res.data;
};

export const giveMyRatingOfDoctor = async (doctorId,payload) => {
  const res = await axiosInstance.post(`/v1/user/give-doctor-rating/${doctorId}`,payload);
  return res.data;
};