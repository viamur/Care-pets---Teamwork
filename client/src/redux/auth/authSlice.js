import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, getCurUser } from './authOperations';

const initialState = {
  email: null,
  accessToken: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeError(state) {
      state.error = null;
    },
  },

  extraReducers: {
    [registerUser.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user, token } = payload;
      state.isLoading = false;
      state.email = user.email;
      state.accessToken = token;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [loginUser.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user, token } = payload;
      state.isLoading = false;
      state.email = user.email;
      state.accessToken = token;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
        [getCurUser.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [getCurUser.fulfilled]: (state, { payload }) => {
      const { email } = payload;
      state.isLoading = false;
      state.email = email;
    },
    [getCurUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { changeError } = authSlice.actions;

export default authSlice.reducer;
