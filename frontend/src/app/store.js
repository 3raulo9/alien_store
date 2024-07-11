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


export const store = configureStore({
  reducer: {
    product: productReducer,
    login: loginReducer,
    cart: cartReducer, 
    register: registerReducer,
    translation: translatorReducer,
    profiles: profileReducer,
    user: getUserReducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
