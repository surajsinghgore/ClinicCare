import { createSlice } from "@reduxjs/toolkit";
import { fetchDoctorAppointmentById } from "../../Utils/services/apis/Doctor/AppointmentApi";
import { hideLoader, showLoader } from "./LoaderState";

const initialState = {
  DoctorAppointmentById: null,
};

export const fetchDoctorAppointmentDetailsById = (id) => async (dispatch) => {
  try {
    dispatch(showLoader());

    const data = await fetchDoctorAppointmentById(id);
    if (data.status) {
      dispatch(fetchDoctorAppointmentDetailsSuccess(data.response));
    } else {
      console.error("Failed to fetch doctor appointment details.");
    }
  } catch (error) {
    console.error("Failed to fetch doctor appointment details:", error);
  } finally {
    dispatch(hideLoader());
  }
};

const DoctorAppointmentByIdSlice = createSlice({
  name: "DoctorAppointmentById",
  initialState,
  reducers: {
    fetchDoctorAppointmentDetailsSuccess: (state, action) => {
      state.DoctorAppointmentById = action.payload;
    },
  },
});

// Export actions and reducer
export const { fetchDoctorAppointmentDetailsSuccess } = DoctorAppointmentByIdSlice.actions;

export default DoctorAppointmentByIdSlice.reducer;
