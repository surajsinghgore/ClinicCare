import axiosInstance from "../../AxiosInstance";

export const loginApi = async (payload) => {
  const res = await axiosInstance.post("/v1/login", payload);
  return res.data;
};

export const loginAdminOtpVerifyApi = async (payload) => {
  const res = await axiosInstance.post("/v1/login/otp-verify", payload);
  return res.data;
};

export const forgetPasswordUsingEmailApi = async (payload) => {
  const res = await axiosInstance.patch("/v1/forgot-password", payload);
  return res.data;
};
export const resetPasswordUsingEmailApi = async (payload) => {
  const res = await axiosInstance.patch("/v1/forgot-password/verify-otp", payload);
  return res.data;
};

export const ourDoctorSearchApi = async (search) => {
  const res = await axiosInstance.get(`/v1/our-doctor/${search}`);
  return res.data;
};
export const ourDoctorAllDataApi = async () => {
  const res = await axiosInstance.get(`/v1/our-doctor`);
  return res.data;
};
export const getDoctorServicesByIdApi = async (id) => {
  const res = await axiosInstance.get(`/v1/get-doctor-details/${id}`);
  return res.data;
};
export const getUniqueCitiesApi = async () => {
  const res = await axiosInstance.get(`/v1/get-cities`);
  return res.data;
};
export const getTreatmentNamesByCityApi = async (city) => {
  const res = await axiosInstance.get(`/v1/get-treatment-by-city/${city}`);
  return res.data;
};
export const getSpecialtiesByTreatmentApi = async (city, treatmentName) => {
  const res = await axiosInstance.get(`/v1/get-specialties-by-treatment/${city}/${treatmentName}`);
  return res.data;
};

export const getDoctorsByCityTreatmentAndSpecialtyApi = async (city, treatmentName, specialty) => {
  const res = await axiosInstance.get(`/v1/get-doctors-by-city-treatment-specialty/${city}/${treatmentName}/${specialty}`);
  return res.data;
};

export const getClinicDetailsByIdApi = async (id) => {
  const res = await axiosInstance.get(`/v1/get-clinic-by-id/${id}`);
  return res.data;
};
export const getTotalPlatformStatsApi = async () => {
  const res = await axiosInstance.get(`/v1/get-platform-stats`);
  return res.data;
};

