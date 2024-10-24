import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./Slices/AlertToggleState";
import loaderReducer from "./Slices/LoaderState";
import getMyDetailsDoctorSlice from './Slices/getMyDetailsDoctorSlice'
import getMyDetailsAdminSlice from './Slices/getMyDetailsAdminSlice'
const store = configureStore({
  reducer: {
    alert: alertReducer,
    loader: loaderReducer,
   getMyDetailsDoctor:getMyDetailsDoctorSlice,
   getMyDetailsAdmin:getMyDetailsAdminSlice,
  },
});

export default store;
