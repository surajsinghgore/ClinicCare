import axiosInstance from "../../../AxiosInstance";

export const getPatientDetailsById = async (id, limit = 5) => {
  const res = await axiosInstance.get(`/v1/doctor/patient/view-patient-by-id-doctor/${id}?limit=${limit}`);
  return res.data;
};
export const viewAppointmentApiByIdAllApiDoctor = async (id) => {
  const res = await axiosInstance.get(`/v1/doctor/patient/view-appointment-by-id-doctor/${id}`);
  return res.data;
};
export const rejectedAppointmentByIdApi = async (id) => {
  const res = await axiosInstance.get(`/v1/doctor/patient/view-rejected-appointment-by-id-doctor/${id}`);
  return res.data;
};

export const searchUserInDoctorApi = async (search) => {
  const res = await axiosInstance.get(`/v1/doctor/patient/search-user?search=${search}`);
  return res.data;
};


export const getPatientDetailsApi = async (userId) => {
  const res = await axiosInstance.get(`/v1/doctor/patient/get-patient-details/${userId}`);
  return res.data;
};

