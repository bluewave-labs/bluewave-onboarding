import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Function to handle login
export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response);
    throw error;
  }
};

// Function to handle sign up
export const signUp = async (userData) => {
  try {
    const response = await apiClient.post('/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Sign up error:', error.response);
    throw error;
  }
};

export default apiClient;



