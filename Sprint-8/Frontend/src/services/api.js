import axios from 'axios';
import { store } from '../app/store';
import { resetAuth } from '../features/auth/authSlice'; // Cambiado de resetAuthState a resetAuth

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para añadir el token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            store.dispatch(resetAuth()); // Cambiado de resetAuthState a resetAuth
        }
        return Promise.reject(error);
    }
);

export default api;