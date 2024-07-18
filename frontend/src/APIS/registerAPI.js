const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (userData) => {
  try {
    console.log("Sending registration data:", userData);
    const response = await fetch(`${API_URL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Registration error details:", errorData);
      throw new Error('Failed to register');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};
