import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggingOut: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginHandle: (state, action) => {
      state.user = JSON.parse(action.payload);
    },
    logout: (state) => {
      state.isLoggingOut = true;
    },
    logoutComplete: (state) => {
      state.user = null;
      state.isLoggingOut = false;
    },
  },
});

export const { loginHandle, logout, logoutComplete } = authSlice.actions;
export default authSlice.reducer;