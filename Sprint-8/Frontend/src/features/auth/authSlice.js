import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Configuración de axios
axios.defaults.baseURL = 'http://localhost:8000';

// Thunks
export const register = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            // Asegurarse de que la fecha esté en el formato correcto
            const formattedData = {
                ...userData,
                fecha_nacimiento: new Date(userData.fecha_nacimiento).toISOString().split('T')[0]
            };

            console.log('Datos a enviar al backend:', formattedData); // Debug

            const response = await axios.post('/api/auth/register/', formattedData);
            console.log('Respuesta del backend:', response.data); // Debug
            return response.data;
        } catch (error) {
            console.error('Error completo:', error.response?.data); // Debug
            return rejectWithValue(error.response?.data || {
                message: 'Error en el registro. Por favor, intente nuevamente.'
            });
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/login/', credentials);
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || {
                message: 'Error al iniciar sesión'
            });
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await axios.post('/api/auth/logout/');
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            return null;
        } catch (error) {
            return rejectWithValue(error.response?.data || {
                message: 'Error al cerrar sesión'
            });
        }
    }
);

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get('/api/auth/me/');
            return response.data;
        } catch (error) {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            return rejectWithValue(error.response?.data || {
                message: error.message
            });
        }
    }
);

// Initial state
const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    registrationSuccess: false
};

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearRegistrationSuccess: (state) => {
            state.registrationSuccess = false;
        },
        resetAuthState: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
                state.registrationSuccess = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Error en el registro';
            })

            // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Error al iniciar sesión';
            })

            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload?.message || 'Error al cerrar sesión';
            })

            // Check Auth
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            });
    }
});

// Actions
export const { clearError, clearRegistrationSuccess, resetAuthState } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectRegistrationSuccess = (state) => state.auth.registrationSuccess;

// Reducer
export default authSlice.reducer;