import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginHandle: (state, action) => {
      state.user = action.payload;
    },
    logoutHandle: (state) => {
      state.user = null;
    },
  },
});

export const { loginHandle, logoutHandle } = authSlice.actions;
export default authSlice.reducer;
