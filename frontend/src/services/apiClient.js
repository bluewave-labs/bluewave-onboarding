import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';


export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  apiClient.interceptors.response.use(undefined, ({ response: { status } }) => {
    if (status === 401) localStorage.removeItem('authToken');
});
