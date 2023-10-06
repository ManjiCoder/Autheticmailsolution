import { createSlice } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const initialState = {
  data: null,
  status: STATUSES.IDLE,
};

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStatus, setData } = emailSlice.actions;

export default emailSlice.reducer;

// Thunk
