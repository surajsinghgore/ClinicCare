import axiosInstance from "../../../AxiosInstance";

export const getMyTransactionAppointmentsApi = async (page = 1, limit = 10, type = "all") => {
    const res = await axiosInstance.get(`/v1/doctor/transaction/get-my-all-transaction?page=${page}&limit=${limit}&type=${type}`);
    return res.data;
  };


  export const searchTransactionAllAppointmentsApi = async (appointmentNumber = "", patientName = "", appointmentDate = "", txnId = "") => {
    const queryObj = {};
    
    // Clean up txnId to avoid unwanted %09 (tab character)
    if (txnId) {
      txnId = txnId.trim().replace(/\t/g, ""); // Remove any tab characters
      queryObj.txnId = txnId;
    }
    
    // Add other query parameters
    if (appointmentNumber) queryObj.appointmentNumber = appointmentNumber;
    if (patientName) queryObj.patientName = patientName;
    if (appointmentDate) queryObj.appointmentDate = appointmentDate;
  
    const query = new URLSearchParams(queryObj).toString();
    
    const res = await axiosInstance.get(`/v1/doctor/transaction/search-my-all-transaction?${query}`);
    
    return res.data;
  };
  
  
export const getMyTransactionAppointmentsByIdApi = async (id) => {
    const res = await axiosInstance.get(`/v1/doctor/transaction/get-my-all-transaction/${id}`);
    return res.data;
  };
  