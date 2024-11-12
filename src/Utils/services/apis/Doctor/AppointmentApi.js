import axiosInstance from "../../../AxiosInstance";



export const getDetailedTodayAppointmentsApi = async (page = 1, limit = 10,type="all") => {
  const res = await axiosInstance.get(`/v1/doctor/appointment/get-today-appointment?page=${page}&limit=${limit}&type=${type}`);
  return res.data;
};
export const getDetailedTodayAppointmentStatsApi = async () => {
  const res = await axiosInstance.get(`/v1/doctor/appointment/get-today-appointment-stats`);
  return res.data;
};
