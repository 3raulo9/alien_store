import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = async (userData) => {
    try {
      const response = await fetch('register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to register');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };
    
  export const getUser = createAsyncThunk(
    'user/getUser',
    async (id, { rejectWithValue }) => {
      try {
        const response = await fetch(`user/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to get user');
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );