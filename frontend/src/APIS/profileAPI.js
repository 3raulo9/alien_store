import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchProfile = async (user_id, token) => {
  const response = await axios.get(`${API_URL}/profiles/${user_id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(`${API_URL}/profiles/${user_id}/`);
  return response.data;
};

export const updateProfile = async (user_id, profileData, token) => {
  const response = await axios.put(`${API_URL}/profiles/${user_id}/`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteProfile = async (user_id, token) => {
  const response = await axios.delete(`${API_URL}/profiles/${user_id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.status;
};
