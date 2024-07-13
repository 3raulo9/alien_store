// src/APIS/productAPI.js
import axios from 'axios';

export const fetchProducts = async () => {
  const { data } = await axios.get('/products/');
  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await axios.get(`/products/${id}/`);
  return data;
};

export const addProduct = async (product) => {
  const { data } = await axios.post('/products/', product);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await axios.put(`/products/${id}/`, product);
  return data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`/products/${id}/`);
};
