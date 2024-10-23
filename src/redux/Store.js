import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./Slices/AlertToggleState";
import loaderReducer from "./Slices/LoaderState";
import getMyDetailsDoctorSlice from './Slices/getMyDetailsDoctorSlice'
const store = configureStore({
  reducer: {
    alert: alertReducer,
    loader: loaderReducer,
   getMyDetailsDoctor:getMyDetailsDoctorSlice
  },
});

export default store;
