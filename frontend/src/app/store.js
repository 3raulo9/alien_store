// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import loginReducer from '../reducers/loginSlice';
import cartReducer from '../reducers/cartSlice'; // Ensure cart reducer is imported
import productReducer from '../reducers/productSlice';
import registerReducer from '../reducers/registerSlice';
import translatorReducer from '../reducers/translatorSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    login: loginReducer,
    cart: cartReducer, // Ensure cart reducer is added
    register: registerReducer,
    translation: translatorReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
