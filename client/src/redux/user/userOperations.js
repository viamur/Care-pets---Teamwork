import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCurUserApi,
  pathUpdateUserInfoApi,
  postPetUserCardApi,
  deltPetUserCardApi,
} from '../../utils/api';

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

/* Добовление животных в аккаунт пользователя */
export const addPetInUserCard = createAsyncThunk(
  'user/addPet',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await postPetUserCardApi(userData);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* Удаление животных в аккаунт пользователя userData - это просто id животного*/
export const delPetInUserCard = createAsyncThunk(
  'user/delPet',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await deltPetUserCardApi(userData);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
