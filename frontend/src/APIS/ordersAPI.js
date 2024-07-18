// src/api/ordersAPI.js

import axios from 'axios';

const BASE_URL = '/orders/';

export const fetchOrdersAPI = async (token) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;  
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
