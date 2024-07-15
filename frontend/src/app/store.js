// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import loginReducer from '../reducers/loginSlice';
import cartReducer from '../reducers/cartSlice'; // Ensure cart reducer is imported
import productReducer from '../reducers/productSlice';
import registerReducer from '../reducers/registerSlice';
import translatorReducer from '../reducers/translatorSlice';
import profileReducer from '../reducers/profileSlice';
import getUserReducer from '../reducers/getUserSlice';
import ordersReducer from '../reducers/getUserSlice';


export const store = configureStore({
  reducer: {
    product: productReducer,
    login: loginReducer,
    cart: cartReducer, 
    register: registerReducer,
    translator: translatorReducer,
    profiles: profileReducer,
    user: getUserReducer, 
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
