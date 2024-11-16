import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./Slices/AlertToggleState";
import loaderReducer from "./Slices/LoaderState";
import getMyDetailsDoctorSlice from "./Slices/getMyDetailsDoctorSlice";
import getMyDetailsAdminSlice from "./Slices/getMyDetailsAdminSlice";
import GetMyClinicByIdSlice from "./Slices/GetMyClinicByIdSlice";
import GetMyActiveUserDetailSlice from "./Slices/GetMyActiveUserDetails";
import DoctorAppointmentDataByIdSlice from "./Slices/FetchDoctorAppointmentById";
import getMyPatientByIdSlice from "./Slices/GetPatientByIdSlice";
const store = configureStore({
  reducer: {
    alert: alertReducer,
    loader: loaderReducer,
    getMyDetailsDoctor: getMyDetailsDoctorSlice,
    getMyDetailsAdmin: getMyDetailsAdminSlice,
    getMyClinicById: GetMyClinicByIdSlice,
    getMyPatientById: getMyPatientByIdSlice,
    getMyUserDetails: GetMyActiveUserDetailSlice,
    DoctorAppointmentById: DoctorAppointmentDataByIdSlice,
  },
});

export default store;
