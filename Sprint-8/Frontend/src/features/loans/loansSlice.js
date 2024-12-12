import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loanService from '../../services/loanService';

// Async Thunks
export const fetchLoans = createAsyncThunk(
    'loans/fetchLoans',
    async (_, { rejectWithValue }) => {
        try {
            const response = await loanService.getAllLoans();
            return Array.isArray(response) ? response : [];
        } catch (error) {
            return rejectWithValue(error.message || 'Error al cargar los préstamos');
        }
    }
);

export const fetchLoanTypes = createAsyncThunk(
    'loans/fetchLoanTypes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await loanService.getLoanTypes();
            return Array.isArray(response) ? response : [];
        } catch (error) {
            return rejectWithValue(error.message || 'Error al cargar los tipos de préstamos');
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
            return rejectWithValue(error.message || 'Error al solicitar el préstamo');
        }
    }
);

export const fetchLoanDetail = createAsyncThunk(
    'loans/fetchLoanDetail',
    async (loanId, { rejectWithValue }) => {
        try {
            const response = await loanService.getLoanById(loanId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Error al cargar el detalle del préstamo');
        }
    }
);

const initialState = {
    loans: [],
    loanTypes: [],
    selectedLoan: null,
    isLoading: false,
    error: null,
    operationSuccess: false,
    lastUpdated: null,
    applyStatus: 'idle',
    detailStatus: 'idle'
};

const loansSlice = createSlice({
    name: 'loans',
    initialState,
    reducers: {
        clearLoanError: (state) => {
            state.error = null;
        },
        clearSelectedLoan: (state) => {
            state.selectedLoan = null;
            state.detailStatus = 'idle';
        },
        clearOperationSuccess: (state) => {
            state.operationSuccess = false;
            state.applyStatus = 'idle';
        },
        resetLoanState: () => initialState
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
                state.loans = Array.isArray(action.payload) ? action.payload : [];
                state.lastUpdated = new Date().toISOString();
                state.error = null;
            })
            .addCase(fetchLoans.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.loans = [];
            })

            // Fetch Loan Types
            .addCase(fetchLoanTypes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchLoanTypes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.loanTypes = Array.isArray(action.payload) ? action.payload : [];
                state.error = null;
            })
            .addCase(fetchLoanTypes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.loanTypes = [];
            })

            // Apply for Loan
            .addCase(applyForLoan.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.operationSuccess = false;
                state.applyStatus = 'loading';
            })
            .addCase(applyForLoan.fulfilled, (state, action) => {
                state.isLoading = false;
                state.loans.push(action.payload);
                state.operationSuccess = true;
                state.applyStatus = 'succeeded';
                state.error = null;
            })
            .addCase(applyForLoan.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.applyStatus = 'failed';
                state.operationSuccess = false;
            })

            // Fetch Loan Detail
            .addCase(fetchLoanDetail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.detailStatus = 'loading';
            })
            .addCase(fetchLoanDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedLoan = action.payload;
                state.detailStatus = 'succeeded';
                state.error = null;
            })
            .addCase(fetchLoanDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.detailStatus = 'failed';
                state.selectedLoan = null;
            });
    }
});

// Actions
export const {
    clearLoanError,
    clearSelectedLoan,
    clearOperationSuccess,
    resetLoanState
} = loansSlice.actions;

// Selectors
export const selectAllLoans = (state) => state.loans?.loans || [];
export const selectLoanTypes = (state) => state.loans?.loanTypes || [];
export const selectSelectedLoan = (state) => state.loans?.selectedLoan || null;
export const selectLoansLoading = (state) => state.loans?.isLoading || false;
export const selectLoansError = (state) => {
    const error = state.loans?.error;
    if (typeof error === 'object' && error !== null) {
        return error.message || error.detail || 'Error desconocido';
    }
    return error || null;
};
export const selectOperationSuccess = (state) => state.loans?.operationSuccess || false;
export const selectLastUpdated = (state) => state.loans?.lastUpdated || null;
export const selectApplyStatus = (state) => state.loans?.applyStatus || 'idle';
export const selectDetailStatus = (state) => state.loans?.detailStatus || 'idle';

export default loansSlice.reducer;