import axiosInstance from "../../../AxiosInstance";

export const getAvailableTimeSlotApi = async (serviceId, date) => {
    console.log(date)
  const res = await axiosInstance.get(`/v1/appointment/available-slots?serviceId=${serviceId}&date=${date}`);
  return res.data;
};
