import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: null,
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    infoHandle: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { infoHandle } = infoSlice.actions;
export default infoSlice.reducer; 
