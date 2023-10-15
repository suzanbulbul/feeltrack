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
  }
});

export const { loginHandle, infoHandle, logout, logoutComplete} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserInfo = (state) => state.user.info?.userInfo;
export const selecLoggingOut = (state) => state.user.isLoggingOut;


export default userSlice.reducer;