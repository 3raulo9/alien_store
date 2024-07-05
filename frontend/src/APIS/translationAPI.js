// translationAPI.js

import axios from "axios";

const translationAPI = {
  translate: async (text, language) => {
    try {
      const response = await axios.post("/translate/", {
        input_text: text,
        language: language,
      });
      return response.data.translated_text; // Ensure that only the translated text is returned
    } catch (error) {
      throw Error("Error translating text:", error);
    }
  },
};

export default translationAPI;
