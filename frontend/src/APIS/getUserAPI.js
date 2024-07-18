import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getUser = async (token) => {
  const response = await axios.get(`${API_URL}/user/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
