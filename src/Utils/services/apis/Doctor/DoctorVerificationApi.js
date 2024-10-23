import axiosInstance from "../../../AxiosInstance";

export const getMyDoctorDetailsApi = async () => {
  const res = await axiosInstance.get("/v1/doctor/get-me-doctor");
  return res.data;
};
export const updatePersonalDetailsDoctorVerificationApi = async (payload) => {
  const res = await axiosInstance.patch("/v1/doctor/update-personal-details", payload);
  return res.data;
};
export const updateQualificationDetailsDoctorVerificationApi = async (payload) => {
  const res = await axiosInstance.patch("/v1/doctor/update-qualification-details", payload);
  return res.data;
};
export const uploadDocumentsDoctorVerificationApi = async (payload) => {
  const res = await axiosInstance.post("/v1/doctor/upload-files-documents", payload);
  return res.data;
};