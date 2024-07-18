import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const BASE_URL = `${API_URL}/orders/`;

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
