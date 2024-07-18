import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchProducts = async () => {
  const { data } = await axios.get(`${API_URL}/products/`);
  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await axios.get(`${API_URL}/products/${id}/`);
  return data;
};

export const addProduct = async (product) => {
  const { data } = await axios.post(`${API_URL}/products/`, product);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await axios.put(`${API_URL}/products/${id}/`, product);
  return data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/products/${id}/`);
};
