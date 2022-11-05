import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurUserApi } from '../../utils/api';

export const getCurUser = createAsyncThunk(
  'auth/getCurUser',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const { accessToken } = getState().auth;
      const curUserData = await getCurUserApi(accessToken);
      return curUserData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
