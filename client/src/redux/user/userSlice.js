import { createSlice } from '@reduxjs/toolkit';
import { logOutUser } from '../auth/authOperations';
import {
  getCurUser,
  pathInfoUser,
  addPetInUserCard,
  delPetInUserCard,
} from './userOperations';

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
  reducers: {},

  extraReducers: {
    [getCurUser.pending]: state => {
      state.error = null;
    },
    [getCurUser.fulfilled]: (state, { payload }) => ({
      ...payload,
      error: null,
    }),
    [getCurUser.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [pathInfoUser.pending]: state => {
      state.error = null;
    },
    [pathInfoUser.fulfilled]: (state, { payload }) => ({
      ...state,
      ...payload,
      error: null,
    }),
    [pathInfoUser.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [addPetInUserCard.pending]: state => {
      state.error = null;
    },
    [addPetInUserCard.fulfilled]: (state, { payload }) => {
      state.pets = payload;
      state.error = null;
    },
    [addPetInUserCard.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [delPetInUserCard.pending]: state => {
      state.error = null;
    },
    [delPetInUserCard.fulfilled]: (state, { payload }) => {
      state.pets = state.pets.filter(el => el._id !== payload);
      state.error = null;
    },
    [delPetInUserCard.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [logOutUser.fulfilled]: (state, { payload }) => {
      state._id = null;
      state.email = null;
      state.name = null;
      state.birthday = null;
      state.phone = null;
      state.city = null;
      state.avatarURL = null;
      state.pets = null;
    },
  },
});

export default userSlice.reducer;
