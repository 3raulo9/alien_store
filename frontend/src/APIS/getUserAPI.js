// src/APIS/getUserAPI.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const getUser = async (token) => {
  const response = await axios.get(`${API_URL}/user/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
