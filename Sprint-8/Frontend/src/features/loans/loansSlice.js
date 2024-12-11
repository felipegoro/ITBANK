import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loanService from '../../services/loanService';

const initialState = {
    loans: [],
    loanTypes: [],
    selectedLoan: null,
    isLoading: false,
    error: null,
    operationSuccess: false,
    lastUpdated: null
};

// Async Thunks
export const fetchLoans = createAsyncThunk(
    'loans/fetchLoans',
    async (_, { rejectWithValue }) => {
        try {
            const response = await loanService.getAllLoans();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error al cargar los préstamos');
        }
    }
);

export const fetchLoanTypes = createAsyncThunk(
    'loans/fetchLoanTypes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await loanService.getLoanTypes();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error al cargar los tipos de préstamos');
        }
    }
);

export const applyForLoan = createAsyncThunk(
    'loans/applyForLoan',
    async (loanData, { rejectWithValue }) => {
        try {
            const response = await loanService.applyForLoan(loanData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error al solicitar el préstamo');
        }
    }
);

// Slice
const loansSlice = createSlice({
    name: 'loans',
    initialState,
    reducers: {
        clearLoanError: (state) => {
            state.error = null;
        },
        clearSelectedLoan: (state) => {
            state.selectedLoan = null;
        },
        clearOperationSuccess: (state) => {
            state.operationSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Loans
            .addCase(fetchLoans.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchLoans.fulfilled, (state, action) => {
                state.isLoading = false;
                state.loans = action.payload;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(fetchLoans.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Error al cargar los préstamos';
            })

            // Fetch Loan Types
            .addCase(fetchLoanTypes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchLoanTypes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.loanTypes = action.payload;
            })
            .addCase(fetchLoanTypes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Error al cargar los tipos de préstamos';
            })

            // Apply for Loan
            .addCase(applyForLoan.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.operationSuccess = false;
            })
            .addCase(applyForLoan.fulfilled, (state, action) => {
                state.isLoading = false;
                state.loans.push(action.payload);
                state.operationSuccess = true;
            })
            .addCase(applyForLoan.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Error al solicitar el préstamo';
            });
    }
});

// Actions
export const {
    clearLoanError,
    clearSelectedLoan,
    clearOperationSuccess
} = loansSlice.actions;

// Selectors
export const selectAllLoans = (state) => state.loans.loans;
export const selectLoanTypes = (state) => state.loans.loanTypes;
export const selectLoansLoading = (state) => state.loans.isLoading;
export const selectLoansError = (state) => state.loans.error;
export const selectSelectedLoan = (state) => state.loans.selectedLoan;
export const selectOperationSuccess = (state) => state.loans.operationSuccess;

export default loansSlice.reducer;