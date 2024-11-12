import axiosInstance from "../../../AxiosInstance";



export const getDetailedAppointmentsApi = async (page = 1, limit = 10,type="all") => {
  const res = await axiosInstance.get(`/v1/doctor/appointment/get-today-appointment?page=${page}&limit=${limit}&type=${type}`);
  return res.data;
};
