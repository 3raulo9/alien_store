import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Adjust this to your API URL

export const translateText = async (input_text, language) => {
  const response = await axios.post(`${API_URL}/translate`, {
    input_text,
    language,
  });
  return response.data;
};
