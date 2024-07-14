import {apiClient} from './apiClient';  // Import the existing apiClient
import axios from 'axios';

// Create a new instance of apiClient with 'auth' appended to the baseURL
const authClient = axios.create({
  ...apiClient.defaults,
  baseURL: `${apiClient.defaults.baseURL}auth`,
});

// Function to handle login
export const login = async (email, password) => {
  try {
    const response = await authClient.post('/login', { email, password });
    const token = response.data.token;
    localStorage.setItem('authToken', token);

    return response.data;
  } catch (error) {
    console.error('Login error:', error.response);
    throw error;
  }
};

// Function to handle logout
export const logout = async () => {
  try {
    await apiClient.post('auth/logout');
    localStorage.removeItem('authToken');
    return true;
  } catch (error) {
    console.error('Logout error:', error.response);
    localStorage.removeItem('authToken');
    throw error;
  }
};

// Function to handle sign up
export const signUp = async (userData) => {
  try {
    const response = await authClient.post('/register', userData);
    const token = response.data.token;
    localStorage.setItem('authToken', token);
    return response.data;
  } catch (error) {
    console.error('Sign up error:', error.response);
    throw error;
  }
};

// Function to handle sign up
export const forgotPassword = async (userData) => {
  try {
    const response = await authClient.post('/forget-password', userData);
    return response.data;
  } catch (error) {
    console.error(error.response);
    throw error;
  }
};

export const resetPassword = async (userData) => {
  try {
    const response = await authClient.post('/reset-password', userData);
    return response.data;
  } catch (error) {
    console.error(error.response);
    throw error;
  }
};

export default authClient;



