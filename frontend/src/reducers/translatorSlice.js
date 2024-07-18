// src/reducers/translatorSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { translateBatch as translateBatchAPI } from '../APIS/translationAPI';

export const translateBatch = createAsyncThunk(
  'translator/translateBatch',
  async ({ texts, language }) => {
    const response = await translateBatchAPI(texts, language);
    return response.translated_texts;  
  }
);

const translatorSlice = createSlice({
  name: 'translator',
  initialState: {
    selectedLanguage: 'en',
    translatedTexts: [],
  },
  reducers: {
    setSelectedLanguage(state, action) {
      state.selectedLanguage = action.payload;
    },
    toggleFontFamily(state) {
      // logic for toggling font family
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(translateBatch.fulfilled, (state, action) => {
        state.translatedTexts = action.payload;
      })
      .addCase(translateBatch.rejected, (state, action) => {
        console.error('Translation error:', action.error.message);
      });
  },
});

export const selectTranslatedTexts = (state) => state.translator.translatedTexts;

export const { setSelectedLanguage, toggleFontFamily } = translatorSlice.actions;

export default translatorSlice.reducer;
