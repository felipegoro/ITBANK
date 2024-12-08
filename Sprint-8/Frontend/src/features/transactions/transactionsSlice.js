import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async ({ page = 1, limit = 10, filters = {} } = {}, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/transactions', {
                params: { page, limit, ...filters }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createTransaction = createAsyncThunk(
    'transactions/createTransaction',
    async (transactionData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/transactions', transactionData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchTransactionDetails = createAsyncThunk(
    'transactions/fetchTransactionDetails',
    async (transactionId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/transactions/${transactionId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchTransactionTypes = createAsyncThunk(
    'transactions/fetchTransactionTypes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/transactions/types');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Initial state
const initialState = {
    transactions: [],
    selectedTransaction: null,
    transactionTypes: [],
    isLoading: false,
    error: null,
    transactionSuccess: false,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    },
    lastUpdated: null
};

// Slice
const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        clearTransactionError: (state) => {
            state.error = null;
        },
        clearSelectedTransaction: (state) => {
            state.selectedTransaction = null;
        },
        clearTransactionSuccess: (state) => {
            state.transactionSuccess = false;
        },
        setTransactionFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Transactions
            .addCase(fetchTransactions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions = action.payload.transactions;
                state.pagination = {
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    totalItems: action.payload.totalItems,
                    itemsPerPage: action.payload.itemsPerPage
                };
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Error al cargar las transacciones';
            })

            // Create Transaction
            .addCase(createTransaction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.transactionSuccess = false;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactionSuccess = true;
                state.transactions.unshift(action.payload);
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Error al crear la transacción';
            })

            // Fetch Transaction Details
            .addCase(fetchTransactionDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTransactionDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedTransaction = action.payload;
            })
            .addCase(fetchTransactionDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Error al cargar los detalles de la transacción';
            })

            // Fetch Transaction Types
            .addCase(fetchTransactionTypes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTransactionTypes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactionTypes = action.payload;
            })
            .addCase(fetchTransactionTypes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Error al cargar los tipos de transacción';
            });
    }
});

// Actions
export const {
    clearTransactionError,
    clearSelectedTransaction,
    clearTransactionSuccess,
    setTransactionFilters
} = transactionsSlice.actions;

// Selectors
export const selectAllTransactions = (state) => state.transactions.transactions;
export const selectTransactionById = (state, transactionId) =>
    state.transactions.transactions.find(transaction => transaction.id === transactionId);
export const selectTransactionTypes = (state) => state.transactions.transactionTypes;
export const selectTransactionsLoading = (state) => state.transactions.isLoading;
export const selectTransactionsError = (state) => state.transactions.error;
export const selectSelectedTransaction = (state) => state.transactions.selectedTransaction;
export const selectTransactionSuccess = (state) => state.transactions.transactionSuccess;
export const selectTransactionsPagination = (state) => state.transactions.pagination;

// Reducer
export default transactionsSlice.reducer;