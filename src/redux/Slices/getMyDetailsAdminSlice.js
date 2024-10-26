import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMeActiveDetailsAdminApi } from "../../Utils/services/apis/Admin/AdminApi";
const initialState = {
  getMyAdminDetails: null,
};

// Async thunk to fetch Admin details
export const fetchMyAdminDetails = createAsyncThunk(
  "Admin/fetchMyAdminDetails",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMeActiveDetailsAdminApi(); 
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
const getMyDetailsAdminSlice = createSlice({
  name: "getMyDetailsAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyAdminDetails.fulfilled, (state, action) => {
        state.getMyAdminDetails = action.payload;
      });
  },
});

export default getMyDetailsAdminSlice.reducer;
