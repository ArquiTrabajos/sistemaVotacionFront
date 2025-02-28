import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://sistema-votaci-n-final-production.up.railway.app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // Importante para CORS con credenciales
});

// Interceptor para manejar errores
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      console.error('Response error:', error.response.data);
      console.error('Status:', error.response.status);
    }
    if (error.response?.status === 401) {
      // Manejar error de autenticación
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Interceptor para agregar el token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Agregar headers específicos para CORS
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

export default api; 