import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMyDoctorDetailsApi } from "../../Utils/services/apis/Doctor/DoctorVerificationApi";

const initialState = {
  getMyDoctorDetails: null,
};

// Async thunk to fetch doctor details
export const fetchMyDoctorDetails = createAsyncThunk(
  "doctor/fetchMyDoctorDetails",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMyDoctorDetailsApi(); 
      return data; 
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Create slice
const getMyDetailsDoctorSlice = createSlice({
  name: "getMyDetailsDoctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyDoctorDetails.fulfilled, (state, action) => {
        state.getMyDoctorDetails = action.payload;
      });
  },
});

export default getMyDetailsDoctorSlice.reducer;
