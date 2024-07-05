// src/APIS/productAPI.js
import axios from 'axios';

export const fetchProducts = async () => {
  const { data } = await axios.get('/products');
  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await axios.get(`/products/${id}`);
  return data;
};
