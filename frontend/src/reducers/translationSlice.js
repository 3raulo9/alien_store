// translationSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  language: 'fr', // Default language
};

// Async thunk for translating text
export const translateTextAsync = createAsyncThunk(
  'translation/translateText',
  async ({ text, language }) => {
    try {
      const response = await axios.post('/translate', {
        input_text: text,
        language: language,
      });
      return response.data.translated_text;
    } catch (error) {
      throw error;
    }
  }
);

const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(translateTextAsync.fulfilled, (state, action) => {
      // Update translated text in state
      // For simplicity, let's assume we're updating the entire translated text
      // structure in state, you might want to handle this based on your application's design
      // state.translatedText = action.payload;
    });
  },
});

export const { setLanguage } = translationSlice.actions;

export const selectLanguage = (state) => state.translation.language;

export default translationSlice.reducer;
