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
      state.isLoading = true;
      state.error = null;
    },
    [getCurUser.fulfilled]: (state, { payload }) => ({
      ...payload,
      isLoading: false,
      error: null,
    }),
    [getCurUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [pathInfoUser.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [pathInfoUser.fulfilled]: (state, { payload }) => ({
      ...state,
      ...payload,
      isLoading: false,
      error: null,
    }),
    [pathInfoUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [addPetInUserCard.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [addPetInUserCard.fulfilled]: (state, { payload }) => {
      state.pets = payload;
      state.isLoading = false;
      state.error = null;
    },
    [addPetInUserCard.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [delPetInUserCard.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [delPetInUserCard.fulfilled]: (state, { payload }) => {
      state.pets = state.pets.filter(el => el._id !== payload);
      state.isLoading = false;
      state.error = null;
    },
    [delPetInUserCard.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [logOutUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
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
