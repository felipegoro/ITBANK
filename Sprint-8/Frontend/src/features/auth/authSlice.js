import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, checkAuth } from './authThunks';

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    tokens: {
        access: null,
        refresh: null
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetAuth: (state) => {
            // Limpiar localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            // Resetear estado
            return initialState;
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
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
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
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
                state.tokens = action.payload.tokens;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                state.user = null;
                state.tokens = { access: null, refresh: null };
            })

            // Logout
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                return initialState;
            })
            .addCase(logout.rejected, (state) => {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                return initialState;
            })

            // Check Auth
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state) => {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                return initialState;
            });
    },
});

export const { clearError, resetAuth, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;