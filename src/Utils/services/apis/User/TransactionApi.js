import axiosInstance from "../../../AxiosInstance";

export const createPaymentApi = async (data) => {
  const res = await axiosInstance.post(`/v1/transaction/create`, data);
  return res.data;
};
