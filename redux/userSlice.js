import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  info: null,
  isLoggingOut: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginHandle: (state, action) => {
      state.user = JSON.parse(action.payload);
    },
    infoHandle: (state, action) => {
      state.info = action.payload;
    },
    logout: (state) => {
      state.isLoggingOut = true;
    },
    logoutComplete: (state) => {
      state.user = null;
      state.info = null;
      state.isLoggingOut = false;
    },
  },
});

export const { loginHandle, infoHandle, logout, logoutComplete } = userSlice.actions;
export default userSlice.reducer;