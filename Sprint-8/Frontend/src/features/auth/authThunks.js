import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Registro de usuario
export const register = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            console.log('Enviando datos de registro:', userData); // Debug
            const response = await axios.post(
                `${API_URL}/clientes/usuarios/`,
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Respuesta del registro:', response.data); // Debug
            return response.data;
        } catch (error) {
            console.error('Error en el registro:', error.response?.data); // Debug
            return rejectWithValue(
                error.response?.data?.errors || 
                error.response?.data?.message || 
                'Error en el registro'
            );
        }
    }
);

// Login de usuario
export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            // Primero obtener el token
            const tokenResponse = await axios.post(
                `${API_URL}/auth/token/`,
                credentials,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            
            const { access, refresh } = tokenResponse.data;
            localStorage.setItem('token', access);
            localStorage.setItem('refreshToken', refresh);

            // Luego obtener los datos del usuario
            const userResponse = await axios.get(
                `${API_URL}/clientes/usuarios/me/`,
                {
                    headers: {
                        'Authorization': `Bearer ${access}`
                    }
                }
            );

            return {
                user: userResponse.data,
                tokens: { access, refresh }
            };
        } catch (error) {
            console.error('Login error:', error.response?.data);
            return rejectWithValue(
                error.response?.data?.detail || 
                error.response?.data?.message ||
                'Error al iniciar sesión'
            );
        }
    }
);

// Logout de usuario
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post(
                    `${API_URL}/auth/logout/`,
                    {},
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
            }
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return null;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 
                'Error al cerrar sesión'
            );
        }
    }
);

// Verificar token y obtener usuario actual
export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('No token found');
            }

            // Verificar token
            await axios.post(
                `${API_URL}/auth/token/verify/`,
                { token },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            // Obtener datos del usuario
            const response = await axios.get(
                `${API_URL}/clientes/usuarios/me/`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            return response.data;
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return rejectWithValue(
                error.response?.data?.message || 
                'Error de autenticación'
            );
        }
    }
);

// Refrescar token
export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { rejectWithValue }) => {
        try {
            const refresh = localStorage.getItem('refreshToken');
            if (!refresh) {
                return rejectWithValue('No refresh token found');
            }

            const response = await axios.post(
                `${API_URL}/auth/token/refresh/`,
                { refresh }
            );

            const { access } = response.data;
            localStorage.setItem('token', access);

            return access;
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return rejectWithValue(
                error.response?.data?.message || 
                'Error al refrescar el token'
            );
        }
    }
);