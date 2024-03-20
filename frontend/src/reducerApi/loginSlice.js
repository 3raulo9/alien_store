import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLogin } from './loginAPI';
import axios from 'axios';

const initialState = {
  logged: false,
  Token: ''
};

export const doLoginAsync = createAsyncThunk(
  'login/fetchLogin',
  async (credentials) => {
    const response = await fetchLogin(credentials);
    // Assuming the API response structure has an 'access' property for the access token
    return response.data.access;
  }
);

// Define the thunk for the logout functionality
export const doLogout = createAsyncThunk(
  'login/doLogout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      // Get the correct token that needs to be sent for logout
      const refreshToken = state.login.refreshToken; // Make sure you store and reference the correct token
      const response = await axios.post(
        "http://127.0.0.1:8000/api/logout/",
        {},
        {
          headers: {
            'Authorization': `Bearer ${refreshToken}` // Ensure this is how your backend expects the token
          }
        }
      );
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
    // Define a reducer for resetting state that can be used for synchronous logout if needed
    reset: (state) => {
      state.Token = '';
      state.logged = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLoginAsync.fulfilled, (state, action) => {
        state.Token = action.payload;
        state.logged = true;
      })
      .addCase(doLogout.fulfilled, (state) => {
        state.Token = '';
        state.logged = false;
        localStorage.removeItem('accessToken'); // Clear access token from local storage
        localStorage.removeItem('refreshToken'); // Clear refresh token from local storage
      })
      // Handle other cases such as pending or rejected if necessary
  },
});

// Export the synchronous reset action
export const { reset } = loginSlice.actions;

// Export the selectors
export const selectToken = (state) => state.login.Token;
export const selectLogged = (state) => state.login.logged;

// Export the reducer
export default loginSlice.reducer;
