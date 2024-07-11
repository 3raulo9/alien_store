import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLogin, fetchLogout } from '../APIS/loginAPI';

const initialState = {
  loading: false,
  logged: localStorage.getItem('accessToken') ? true : false,
  Token: localStorage.getItem('accessToken') || '',
  user: null,  // User info will be handled here
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
      await fetchLogout(refreshToken);
      return refreshToken;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    reset: (state) => {
      state.Token = '';
      state.logged = false;
      state.loading = false;
      state.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
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
        state.user = action.payload.user;  // Save user info
        localStorage.setItem('accessToken', action.payload.access);
        localStorage.setItem('refreshToken', action.payload.refresh);
      })
      .addCase(doLoginAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(doLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(doLogout.fulfilled, (state, action) => {
        state.Token = '';
        state.logged = false;
        state.loading = false;
        state.user = null;  // Clear user info
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(doLogout.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { reset } = loginSlice.actions;

export const selectToken = (state) => state.login.Token;
export const selectLogged = (state) => state.login.logged;
export const selectLoading = (state) => state.login.loading;
export const selectUser = (state) => state.login.user;  // Selector for user info

export default loginSlice.reducer;
