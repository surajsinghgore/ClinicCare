import { createSlice } from "@reduxjs/toolkit";
import { getPatientDetailsById } from "../../Utils/services/apis/Doctor/PatientApi";

const initialState = {
  patientDetails: null,
};

// Create slice
const getMyClinicByIdSlice = createSlice({
  name: "getMyPatientById",
  initialState,
  reducers: {
    setPatientDetails(state, action) {
      state.patientDetails = action.payload;
    },
    resetPatientDetails(state) {
      state.patientDetails = null;
    },
  },
});

// Thunk to fetch clinic details by ID
export const fetchPatientByIdDoctor = (id,limit) => async (dispatch) => {
  try {
    const data = await getPatientDetailsById(id,limit);
    dispatch(setPatientDetails(data)); 
  } catch (error) {
    console.error("Error fetching clinic details:", error);
    // Optionally handle error state here
  }
};

export const { setPatientDetails, resetPatientDetails } = getMyClinicByIdSlice.actions; // Export reset action
export default getMyClinicByIdSlice.reducer;
