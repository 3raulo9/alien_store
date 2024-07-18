import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchCartItems = async (token) => {
  const response = await axios.get(`${API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const addToCart = async (id, quantity, token) => {
  const response = await axios.post(
    `${API_URL}/cart/${id}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const removeFromCart = async (_id, token) => {
  const response = await axios.delete(`${API_URL}/cart/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const checkout = async (token) => {
  const response = await axios.post(
    `${API_URL}/cart/checkout/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
