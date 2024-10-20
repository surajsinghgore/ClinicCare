import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false, 
  message: "",     
  alertType: "",   
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.isVisible = true;              
      state.message = action.payload.message;
      state.alertType = action.payload.type; 
    },
    hideAlert: (state) => {
      state.isVisible = false;                
      state.message = "";                  
      state.alertType = "";                  
    },
  },
});

// Export actions and reducer
export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
