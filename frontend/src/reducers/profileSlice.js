import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProfile, updateProfile, deleteProfile } from '../APIS/profileAPI';
import { selectToken } from '../reducers/loginSlice';  // Ensure the correct import path

const initialState = {
  profiles: [],
  profile: null,
  loading: false,
  error: null,
};



export const getProfile = createAsyncThunk(
  'profiles/getProfile',
  async (user_id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = selectToken(state);
      const response = await fetchProfile(user_id, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const saveProfile = createAsyncThunk(
  'profiles/saveProfile',
  async ({ id, profileData }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = selectToken(state);
      const response = await updateProfile(id, profileData, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeProfile = createAsyncThunk(
  'profiles/removeProfile',
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = selectToken(state);
      await deleteProfile(id, token);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.profiles.findIndex(profile => profile.id === action.payload.id);
        if (index >= 0) {
          state.profiles[index] = action.payload;
        } else {
          state.profiles.push(action.payload);
        }
        state.profile = action.payload;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeProfile.fulfilled, (state, action) => {
        state.profiles = state.profiles.filter(profile => profile.id !== action.payload);
        if (state.profile && state.profile.id === action.payload) {
          state.profile = null;
        }
      })
      .addCase(removeProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;


export const selectProfileState = (state) => state.profiles;
export const selectProfile = (state) => selectProfileState(state).profile;
export const selectProfiles = (state) => selectProfileState(state).profiles;
export const selectProfileLoading = (state) => selectProfileState(state).loading;
export const selectProfileError = (state) => selectProfileState(state).error;
