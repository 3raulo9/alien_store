import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCartItems, addToCart, removeFromCart, checkout } from '../APIS/cartAPI'; 
import { selectToken } from './loginSlice'; // Assuming login slice has a selectToken selector

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCartItemsAsync = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = selectToken(state);
      const response = await fetchCartItems(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async ({ id, quantity }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = selectToken(state);
      const response = await addToCart(id, quantity, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCart',
  async (_id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = selectToken(state);
      const response = await removeFromCart(_id, token);
      return _id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const checkoutAsync = createAsyncThunk(
  'cart/checkout',
  async (_, { getState }) => {
    const token = selectToken(getState());
    const response = await checkout(token);
    return response;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCartItemsAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const existingItemIndex = state.items.findIndex(item => item.product._id === action.payload.product._id);
        if (existingItemIndex >= 0) {
          state.items[existingItemIndex].quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(removeFromCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.product._id !== action.payload);
        state.loading = false;
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(checkoutAsync.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(checkoutAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectCartItems = (state) => state.cart.items;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;

export default cartSlice.reducer;
