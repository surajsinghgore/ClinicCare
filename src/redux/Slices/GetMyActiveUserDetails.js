import { createSlice } from "@reduxjs/toolkit";
import { getMeActiveDetailsUserApi } from "../../Utils/services/apis/User/UserPersonalApi";
import { hideLoader, showLoader } from "./LoaderState";

const initialState = {
  getMyUserDetails: null,
};

// Define actions for fetching user details
export const fetchMyUserDetails = () => async (dispatch) => {
  try {
    dispatch(showLoader());

    const data = await getMeActiveDetailsUserApi();
    dispatch(fetchMyUserDetailsSuccess(data));
  } catch (error) {
    console.error("Failed to fetch user details:", error);
  } finally {
    dispatch(hideLoader());
  }
};

// Create slice
const getMyDetailsUserSlice = createSlice({
  name: "getMyDetailsUser",
  initialState,
  reducers: {
    fetchMyUserDetailsSuccess: (state, action) => {
      state.getMyUserDetails = action.payload;
    },
  },
});

export const { fetchMyUserDetailsSuccess } = getMyDetailsUserSlice.actions;
export default getMyDetailsUserSlice.reducer;
