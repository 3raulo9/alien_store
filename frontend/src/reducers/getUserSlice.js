// reducers/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, getUser as fetchUser } from '../APIS/registerAPI';

export const register = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const data = await fetchUser(id, token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const getUserSlice = createSlice({
  name: 'user',
  initialState: {
    status: 'idle',
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectUser = (state) => state.user?.data;  // Safely access `data`

export default getUserSlice.reducer;
