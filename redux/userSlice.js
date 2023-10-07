import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  info: null,
  isLoggingOut: false,
  selectedItems: [],
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
      state.selectedItems = [];
      state.isLoggingOut = false;
    },
    updateSelectedItems: (state, action) => {
      state.selectedItems = action.payload;
    },
  },
});

export const { loginHandle, infoHandle, logout, logoutComplete, updateSelectedItems, selectedInfo } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserInfo = (state) => state.user.info?.userInfo;
export const selecLoggingOut = (state) => state.user.isLoggingOut;
export const selectItems = (state) => state.user.selectedItems ? state.user.selectedItems : [];


export default userSlice.reducer;