import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLoginApi, getRegisterApi, getLogOutApi } from '../../utils/api';
import { logOutReducer } from '../user/userSlice';

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkApi) => {
  try {
    await getRegisterApi(userData);
    const { email, password } = userData;
    const loginUserData = await getLoginApi({ email, password });
    return loginUserData;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkApi) => {
  try {
    const loginUserData = await getLoginApi(userData);
    return loginUserData;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});

export const logOutUser = createAsyncThunk('auth/logOut', async (userData, thunkApi) => {
  try {
    const logOut = await getLogOutApi();
    if (logOut.success) {
      thunkApi.dispatch(logOutReducer());
      console.log('success');
      return logOut;
    }
    return thunkApi.rejectWithValue(logOut.message);
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});
