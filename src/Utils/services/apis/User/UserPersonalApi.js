import axiosInstance from "../../../AxiosInstance";

export const getMeActiveDetailsUserApi = async () => {
  const res = await axiosInstance.get(`/v1/user/get-me`);
  return res.data;
};

export const updateMeUserByIdApi = async (payload) => {
  const res = await axiosInstance.patch(`/v1/user/update-my-general-details`, payload);
  return res.data;
};

export const updateMeUserProfileByIdApi = async (payload) => {
  const res = await axiosInstance.patch(`/v1/user/update-my-profile`, payload);
  return res.data;
};


export const changeUserActivePasswordApi = async (payload) => {
  const res = await axiosInstance.patch(`/v1/user/update-my-password`, payload);
  return res.data;
};