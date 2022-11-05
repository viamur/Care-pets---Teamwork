import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurUserApi, pathUpdateUserInfoApi } from '../../utils/api';

export const getCurUser = createAsyncThunk(
  'user/getCurUser',
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

/* Обновление данных пользователя */
export const pathInfoUser = createAsyncThunk(
  'user/getCurUser',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await pathUpdateUserInfoApi(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
