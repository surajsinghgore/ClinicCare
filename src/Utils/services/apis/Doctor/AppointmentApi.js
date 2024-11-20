import axiosInstance from "../../../AxiosInstance";

export const getDetailedTodayAppointmentsApi = async (page = 1, limit = 10, type = "all") => {
  const res = await axiosInstance.get(`/v1/doctor/appointment/get-today-appointment?page=${page}&limit=${limit}&type=${type}`);
  return res.data;
};
export const getDetailedTodayAppointmentStatsApi = async () => {
  const res = await axiosInstance.get(`/v1/doctor/appointment/get-today-appointment-stats`);
  return res.data;
};
export const getTodayAppointmentsBySearchApi = async (search) => {
  const res = await axiosInstance.get(`/v1/doctor/appointment/get-today-appointment-by-appointment-number/${search}`);
  return res.data;
};

export const getTodayAppointmentByAppointmentNumber = async (number) => {
  const res = await axiosInstance.get(`/v1/doctor/appointment/get-today-appointment-by-appointment-number/${number}`);
  return res.data;
};
export const getTodayAppointmentsByUserName = async (name) => {
  const res = await axiosInstance.get(`/v1/doctor/appointment/get-today-appointment-by-patient-name/${name}`);
  return res.data;
};

export const getTodayAppointmentsByTreatmentName = async (name) => {
  const res = await axiosInstance.get(`/v1/doctor/appointment/get-today-appointment-by-treatment-name/${name}`);
  return res.data;
};

// Helper function to convert 24-hour time to 12-hour time
function convertTo12HourFormat(time24) {
  const [hours, minutes] = time24.split(":").map(Number);
  const suffix = hours >= 12 ? "pm" : "am";
  const hours12 = hours % 12 || 12; // Convert 00 to 12 for midnight and 12 to 12 for noon
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${suffix}`;
}
export const searchTodayAppointmentsByTime = async (time) => {
  // Convert the time from 24-hour format to 12-hour format with AM/PM
  const time12hr = convertTo12HourFormat(time);

  // Call the API with the converted time
  const res = await axiosInstance.get(`/v1/doctor/appointment/get-today-appointment-by-time/${time12hr}`);

  return res.data;
};

export const fetchDoctorAppointmentById = async (id) => {
  const res = await axiosInstance.get(`/v1/doctor/appointment/get-doctor-appointment-by-id/${id}`);
  return res.data;
};

export const processAppointmentByAppointmentId = async (id, payload) => {
  const res = await axiosInstance.post(`/v1/doctor/appointment/process-appointment-by-id/${id}`, payload);
  return res.data;
};

export const processRejectAppointmentByAppointmentId = async (id) => {
  const res = await axiosInstance.patch(`/v1/doctor/appointment/process-reject-appointment-by-id/${id}`);
  return res.data;
};

export const getAllDetailedAppointmentsApi = async (page = 1, limit = 10) => {
  const res = await axiosInstance.get(`/v1/doctor/appointment/get-my-all-appointment?page=${page}&limit=${limit}`);
  return res.data;
};

export const searchDoctorAllAppointmentsApi = async (appointmentId = "", patientName = "", appointmentDate = "", status = "") => {
  // Create an object to hold the query parameters
  const queryObj = {};

  // Add parameters to the query only if they have a value
  if (appointmentId) queryObj.appointmentId = appointmentId;
  if (patientName) queryObj.patientName = patientName;
  if (appointmentDate) queryObj.appointmentDate = appointmentDate;
  if (status) queryObj.status = status;

  // Use URLSearchParams to convert the object to a query string
  const query = new URLSearchParams(queryObj).toString();

  // Make the GET request with the properly formatted query string
  const res = await axiosInstance.get(`/v1/doctor/appointment/search-get-my-all-appointment?${query}`);
  
  return res.data;
};

export const viewAppointmentApiByIdApiDoctor = async (id) => {
  const res = await axiosInstance.get(`/v1/doctor/appointment/view-appointment-by-id-doctor/${id}`);
  return res.data;
};
