import axiosInstance from "../../../AxiosInstance";

export const getAvailableTimeSlotApi = async (serviceId, date) => {
  const res = await axiosInstance.get(`/v1/appointment/available-slots?serviceId=${serviceId}&date=${date}`);
  return res.data;
};

export const bookAppointmentTempApi = async (payload) => {
  const res = await axiosInstance.post(`/v1/appointment/book-appointment-temp`, payload);
  return res.data;
};

export const getTodayAppointmentsActiveUserApi = async () => {
  const res = await axiosInstance.get(`/v1/user/get-my-today-appointment`);
  return res.data;
};

export const downloadAppointmentPdfDataApi = async (appointmentId) => {
  const res = await axiosInstance.get(`/v1/user/get-my-appointment-pdf/${appointmentId}`);
  return res.data;
};
export const downloadReportPdfDataApi = async (appointmentId) => {
  const res = await axiosInstance.get(`/v1/user/get-my-report-pdf/${appointmentId}`);
  return res.data;
};
