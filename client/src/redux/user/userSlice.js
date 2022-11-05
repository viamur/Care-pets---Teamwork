import { createSlice } from '@reduxjs/toolkit';
import authSlice from 'redux/auth/authSlice';
import { getCurUser } from './userOperations';

const initialState = {
  _id: null,
  name: '',
  email: '',
  birthday: '',
  phone: '',
  city: '',
  avatarURL: '',
  pets: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutReducer(state) {
      return { ...initialState };
    },
  },

  extraReducers: {
    [getCurUser.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [getCurUser.fulfilled]: (state, { payload }) => ({ ...payload, isLoading: false, error: null }),
    [getCurUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { logOutReducer } = userSlice.actions;
export default userSlice.reducer;
