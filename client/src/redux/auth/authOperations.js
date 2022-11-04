import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLoginApi, getRegisterApi, getCurUserApi} from '../../utils/api';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkApi) => {
    try {
      await getRegisterApi(userData);
      const { email, password } = userData;
      const loginUserData = await getLoginApi({ email, password });
      return loginUserData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkApi) => {
    try {
      const loginUserData = await getLoginApi(userData);
      return loginUserData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const getCurUser = createAsyncThunk(
  'auth/getCurUser',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const { accessToken} = getState().auth;
      const curUserData = await getCurUserApi(accessToken);
      return curUserData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
