import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api'
});

// Interceptor para agregar el token a todas las peticiones
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


// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403 || error.response?.status === 401) {
            // Redirigir al login si no está autenticado
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;