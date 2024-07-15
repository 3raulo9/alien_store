// src/reducers/ordersSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrdersAPI } from '../APIS/ordersAPI';
import { selectToken } from './loginSlice';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { getState }) => {
  const token = selectToken(getState());
  const response = await fetchOrdersAPI(token);
  return response;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const selectOrders = (state) => state.orders.orders;
export const selectOrdersStatus = (state) => state.orders.status;
export const selectOrdersError = (state) => state.orders.error;

export default ordersSlice.reducer;
