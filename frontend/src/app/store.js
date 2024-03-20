// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../reducerApi/loginSlice';

export const store = configureStore({
  reducer: {
    // Assuming you have a slice named loginSlice
    login: loginReducer,
  },
});
