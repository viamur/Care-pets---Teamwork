import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,

  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: {},
});

export default authSlice.reducer;
