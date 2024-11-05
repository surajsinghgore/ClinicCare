import axiosInstance from "../../../AxiosInstance";

export const addServicesApi = async (payload) => {
  const res = await axiosInstance.post("/v1/doctor/service/add-service", payload);
  return res.data;
};

// export const deleteClinicPhotoApi = async (id,payload) => {
//   const res = await axiosInstance.patch(`/v1/doctor/clinic/delete-clinic-photo/${id}`,payload);
//   return res.data;
// };

export const getMyServiceApi = async (page = 1, limit = 10) => {
  const res = await axiosInstance.get(`/v1/doctor/service/get-my-service?page=${page}&limit=${limit}`);
  return res.data;
};

export const searchMyServiceApi = async (search) => {
  const res = await axiosInstance.get(`/v1/doctor/service/get-my-service/${search}`);
  return res.data;
};
export const GetMyServiceByIdApi = async (id) => {
  const res = await axiosInstance.get(`/v1/doctor/service/get-service/${id}`);
  return res.data;
};

export const updateServicesApi = async (id,payload) => {
  const res = await axiosInstance.post(`/v1/doctor/service/update-service/${id}`, payload);
  return res.data;
};