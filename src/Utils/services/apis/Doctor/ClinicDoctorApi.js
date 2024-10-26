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
export const deleteClinicPhotoApi = async (url) => {
  const res = await axiosInstance.patch(`/v1/doctor/clinic/delete-clinic-photo/${url}`);
  return res.data;
};
export const getMyClinicApi = async () => {
  const res = await axiosInstance.get(`/v1/doctor/clinic/get-my-clinic`);
  return res.data;
};
export const getMyClinicByIdApi = async (id) => {
  const res = await axiosInstance.get(`/v1/doctor/clinic/get-my-clinic/${id}`);
  return res.data;
};
