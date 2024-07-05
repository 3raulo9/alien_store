import { createSlice } from "@reduxjs/toolkit";
import translationAPI from "../APIS/translationAPI";

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem("selectedLanguage");
  return savedLanguage ? savedLanguage : "english";
};

const initialState = {
  fontFamily: "Anta",
  selectedLanguage: getInitialLanguage(),
};

export const translatorSlice = createSlice({
  name: "translator",
  initialState,
  reducers: {
    toggleFontFamily: (state) => {
      const fontFamilies = [
        "Anta",
        "OuterRimAf-d9Kq7",
        "KitisakkullianAf-ALWnx",
        "alien",
        "Wingdings, sans-serif",
        "Zdyk Sagittarius",
        "Mage Script",
        "AlienAlphabet-nRRqJ",
        "nyamawemban",
      ];
      const currentFontIndex = fontFamilies.indexOf(state.fontFamily);
      const nextFontIndex = (currentFontIndex + 1) % fontFamilies.length;
      state.fontFamily = fontFamilies[nextFontIndex];
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
      localStorage.setItem("selectedLanguage", action.payload); // Save to localStorage
    },
    translateText: async (state, action) => {
      try {
        const { input_text } = action.payload;
        const { selectedLanguage } = state;
        const response = await translationAPI.translate(input_text, selectedLanguage);
        return response.translated_text;
      } catch (error) {
        console.error("Error translating text:", error);
      }
    },
  },
});

export const { toggleFontFamily, setSelectedLanguage, translateText } = translatorSlice.actions;

export default translatorSlice.reducer;
