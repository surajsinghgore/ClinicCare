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

export const getAllAppointmentsActiveUserApi = async (limit) => {
  const res = await axiosInstance.get(`/v1/user/get-my-all-appointment?limit=${limit}`);
  return res.data;
};

export const rejectedAppointmentUserByIdApi = async (id) => {
  const res = await axiosInstance.get(`/v1/user/get-my-rejected-appointment/${id}`);
  return res.data;
};
export const getMyAppointmentUserApiByIdApi = async (id) => {
  const res = await axiosInstance.get(`/v1/user/get-my-completed-appointment/${id}`);
  return res.data;
};

export const searchUserAllAppointmentsApi = async (appointmentNumber = "", txnId = "", appointmentDate = "", status = "") => {
  const queryObj = {};

  if (appointmentNumber) queryObj.appointmentNumber = appointmentNumber;
  if (txnId) queryObj.txnId = txnId;
  if (appointmentDate) queryObj.appointmentDate = appointmentDate;
  if (status) queryObj.status = status;

  const query = new URLSearchParams(queryObj).toString();

  const res = await axiosInstance.get(`/v1/user/search-my-all-appointment?${query}`);

  return res.data;
};
