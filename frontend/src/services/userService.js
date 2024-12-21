import axios from 'axios';

const apiUrl = 'https://aura-8yfu.onrender.com/api'; // Base API URL

export const logout = async () => {
  try {
    const response = await axios.post(`${apiUrl}/logout`, {}, {
      withCredentials: true, // Include cookies in the request
    });
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (userData) => {
    try {
      const response = await axios.post(`${apiUrl}/signIn`, userData, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const signUpUser = async (userData) => {
    try {
      const response = await axios.post(`${apiUrl}/users`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };