import axiosInstance from "../../../AxiosInstance";

export const addClinicPhase1Api = async (payload) => {
  const res = await axiosInstance.post("/v1/doctor/clinic/add-clinic-general-details", payload);
  return res.data;
};
export const addClinicPhase2Api = async (id, payload) => {
  const res = await axiosInstance.patch(`/v1/doctor/clinic/add-clinic-working-days-details/${id}`, payload);
  return res.data;
};
export const addClinicPhase3Api = async (id, payload) => {
  const res = await axiosInstance.patch(`/v1/doctor/clinic/upload-clinic-photos/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const deleteClinicPhotoApi = async (id, payload) => {
  const res = await axiosInstance.patch(`/v1/doctor/clinic/delete-clinic-photo/${id}`, payload);
  return res.data;
};
export const getMyClinicApi = async (page = 1, limit = 10) => {
  const res = await axiosInstance.get(`/v1/doctor/clinic/get-my-clinic?page=${page}&limit=${limit}`);
  return res.data;
};
export const getMyClinicByIdApi = async (id) => {
  const res = await axiosInstance.get(`/v1/doctor/clinic/get-my-clinic/${id}`);
  return res.data;
};
export const searchMyClinicApi = async (search) => {
  const res = await axiosInstance.get(`/v1/doctor/clinic/get-my-clinic/${search}`);
  return res.data;
};
