import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: null,
  isLoggingOut: false,
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    infoHandle: (state, action) => {
      state.info = action.payload;
    },
    logoutInfo: (state) => {
      state.isLoggingOut = true;
    },
    logoutInfoComplete: (state) => {
      state.info = null;
      state.isLoggingOut = false;
    },
  },
});

export const { infoHandle, logoutInfo, logoutInfoComplete } = infoSlice.actions;
export default infoSlice.reducer; 
