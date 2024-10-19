import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./Slices/AlertToggleState";
import loaderReducer from "./Slices/LoaderState";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    loader: loaderReducer,
  },
});

export default store;
