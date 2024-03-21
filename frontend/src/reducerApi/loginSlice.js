import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLogin, fetchLogout } from './loginAPI'; // Make sure to import fetchLogout

const initialState = {
  loading: false,
  logged: false,
  Token: ''
};

export const doLoginAsync = createAsyncThunk(
  'login/fetchLogin',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetchLogin(credentials);
      // Assuming the API response structure has an 'access' property for the access token
      return response.data.access;
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
      const refreshToken = state.login.Token; // Make sure this correctly refers to your refresh token
      const response = await fetchLogout(refreshToken); // Correctly calling fetchLogout here
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
    // Reducer to reset the state
    reset: (state) => {
      state.Token = '';
      state.logged = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLoginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(doLoginAsync.fulfilled, (state, action) => {
        state.Token = action.payload;
        state.logged = true;
        state.loading = false;
      })
      .addCase(doLoginAsync.rejected, (state, action) => {
        state.loading = false;
        // You may want to handle the error state here
      })
      .addCase(doLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(doLogout.fulfilled, (state) => {
        state.Token = '';
        state.logged = false;
        state.loading = false;
        localStorage.removeItem('accessToken'); // Assuming you're storing the access token here
        localStorage.removeItem('refreshToken'); // And the refresh token here
      })
      .addCase(doLogout.rejected, (state, action) => {
        state.loading = false;
        // You may want to handle the error state here
      });
  },
});

export const { reset } = loginSlice.actions;

export const selectToken = (state) => state.login.Token;
export const selectLogged = (state) => state.login.logged;
export const selectLoading = (state) => state.login.loading;

export default loginSlice.reducer;
