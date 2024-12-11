import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            
            // Agregar campos al FormData
            Object.keys(profileData).forEach(key => {
                if (key === 'avatar' && profileData[key]) {
                    formData.append('avatar', profileData[key]);
                } else if (profileData[key]) {
                    formData.append(key, profileData[key]);
                }
            });

            const response = await axios.patch('/api/auth/profile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error al actualizar el perfil');
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        isLoading: false,
        error: null,
        updateSuccess: false
    },
    reducers: {
        clearProfileError: (state) => {
            state.error = null;
        },
        clearUpdateSuccess: (state) => {
            state.updateSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.updateSuccess = false;
            })
            .addCase(updateProfile.fulfilled, (state) => {
                state.isLoading = false;
                state.updateSuccess = true;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearProfileError, clearUpdateSuccess } = profileSlice.actions;
export default profileSlice.reducer;