import axiosInstance from "../../../AxiosInstance";

export const getAvailableTimeSlotApi = async (serviceId, date) => {
  const res = await axiosInstance.get(`/v1/appointment/available-slots?serviceId=${serviceId}&date=${date}`);
  return res.data;
};

export const bookAppointmentTempApi = async (payload) => {
  const res = await axiosInstance.post(`/v1/appointment/book-appointment-temp`,payload);
  return res.data;
};
