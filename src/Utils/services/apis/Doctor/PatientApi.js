import axiosInstance from "../../../AxiosInstance";

export const getPatientDetailsById = async (id, limit = 5) => {
  const res = await axiosInstance.get(`/v1/doctor/patient/view-patient-by-id-doctor/${id}?limit=${limit}`);
  return res.data;
};
