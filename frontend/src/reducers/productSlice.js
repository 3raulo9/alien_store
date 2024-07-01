// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProduct } from '../APIS/productAPI';

const initialState = {
  product: {},
  loading: false,
  error: null,
};

export const fetchProductAsync = createAsyncThunk(
  'product/fetchProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetchProduct(productId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectProduct = (state) => state.product.product;
export const selectProductLoading = (state) => state.product.loading;
export const selectProductError = (state) => state.product.error;

export default productSlice.reducer;
