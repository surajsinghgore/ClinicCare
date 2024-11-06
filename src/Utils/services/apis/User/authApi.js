import axiosInstance from "../../../AxiosInstance";

export const createUserAccountApi = async (payload) => {
  const res = await axiosInstance.post("/v1/user/create-account",payload);
  return res.data;
};