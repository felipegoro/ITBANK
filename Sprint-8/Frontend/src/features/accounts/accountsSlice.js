import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const fetchAccounts = createAsyncThunk(
    'accounts/fetchAccounts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/accounts');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchAccountDetails = createAsyncThunk(
    'accounts/fetchAccountDetails',
    async (accountId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/accounts/${accountId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Initial state
const initialState = {
    accounts: [],
    selectedAccount: null,
    isLoading: false,
    error: null,
    lastUpdated: null
};

// Slice
const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        clearAccountError: (state) => {
            state.error = null;
        },
        clearSelectedAccount: (state) => {
            state.selectedAccount = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Accounts
            .addCase(fetchAccounts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.accounts = action.payload;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Error al cargar las cuentas';
            })
            
            // Fetch Account Details
            .addCase(fetchAccountDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAccountDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedAccount = action.payload;
            })
            .addCase(fetchAccountDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Error al cargar los detalles de la cuenta';
            });
    }
});

// Actions
export const { clearAccountError, clearSelectedAccount } = accountsSlice.actions;

// Selectors
export const selectAllAccounts = (state) => state.accounts.accounts;
export const selectAccountById = (state, accountId) => 
    state.accounts.accounts.find(account => account.id === accountId);
export const selectAccountsLoading = (state) => state.accounts.isLoading;
export const selectAccountsError = (state) => state.accounts.error;
export const selectSelectedAccount = (state) => state.accounts.selectedAccount;

// Reducer
export default accountsSlice.reducer;