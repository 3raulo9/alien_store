import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLogin, fetchLogout } from './loginAPI'; 

const initialState = {
  loading: false,
  logged: localStorage.getItem('accessToken') ? true : false,
  Token: localStorage.getItem('accessToken') || '',
  user: null, // You'll probably want to handle user info in a similar way
};


export const doLoginAsync = createAsyncThunk(
  'login/fetchLogin',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetchLogin(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const doLogout = createAsyncThunk(
  'login/doLogout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const refreshToken = state.login.Token;
      const response = await fetchLogout(refreshToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    reset: (state) => {
      state.Token = '';
      state.logged = false;
      state.loading = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLoginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(doLoginAsync.fulfilled, (state, action) => {
        state.Token = action.payload.access;
        state.logged = true;
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('accessToken', action.payload.access);
      })
      .addCase(doLoginAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(doLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(doLogout.fulfilled, (state) => {
        state.Token = '';
        state.logged = false;
        state.loading = false;
        state.user = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(doLogout.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { reset } = loginSlice.actions;

export const selectUser = (state) => state.login.user;
export const selectLogged = (state) => state.login.logged; // Export selectLogged selector
export const selectLoading = (state) => state.login.loading; // Export selectLoading selector

export default loginSlice.reducer;
