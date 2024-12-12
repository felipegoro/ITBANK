import { createSlice } from '@reduxjs/toolkit';
import { 
    fetchAccounts,
    fetchAccountTypes,
    createAccount,
    fetchAccountDetail,
    transferFunds,
    fetchAccountSummary,
    fetchAccountMovements,
    fetchTransactions
} from './accountThunks';

const getErrorMessage = (payload) => {
    if (typeof payload === 'string') return payload;
    return payload?.detail || payload?.message || payload?.error || 'Ha ocurrido un error';
};

const initialState = {
    accounts: [],
    accountTypes: [],
    selectedAccount: null,
    transactions: [],
    isLoading: false,
    error: null,
    transferStatus: 'idle',
    createAccountStatus: 'idle',
    accountSummary: null,
    movements: []
};

const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        clearTransferStatus: (state) => {
            state.transferStatus = 'idle';
            state.error = null;
        },
        clearCreateAccountStatus: (state) => {
            state.createAccountStatus = 'idle';
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetAccountState: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch accounts cases
            .addCase(fetchAccounts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.accounts = Array.isArray(action.payload) ? action.payload : [];
                state.error = null;
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.isLoading = false;
                state.accounts = [];
                state.error = getErrorMessage(action.payload);
            })

            // Fetch account types cases
            .addCase(fetchAccountTypes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAccountTypes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.accountTypes = action.payload;
                state.error = null;
            })
            .addCase(fetchAccountTypes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = getErrorMessage(action.payload);
            })

            // Create account cases
            .addCase(createAccount.pending, (state) => {
                state.createAccountStatus = 'loading';
                state.error = null;
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.createAccountStatus = 'succeeded';
                state.accounts.push(action.payload.cuenta);
                state.error = null;
            })
            .addCase(createAccount.rejected, (state, action) => {
                state.createAccountStatus = 'failed';
                state.error = getErrorMessage(action.payload);
            })

            // Fetch account detail cases
            .addCase(fetchAccountDetail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAccountDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedAccount = action.payload;
                state.error = null;
            })
            .addCase(fetchAccountDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = getErrorMessage(action.payload);
            })

            // Transfer funds cases
            .addCase(transferFunds.pending, (state) => {
                state.transferStatus = 'loading';
                state.error = null;
            })
            .addCase(transferFunds.fulfilled, (state, action) => {
                state.transferStatus = 'succeeded';
                if (action.payload?.saldo_actual) {
                    state.selectedAccount.saldo = action.payload.saldo_actual;
                }
                state.error = null;
            })
            .addCase(transferFunds.rejected, (state, action) => {
                state.transferStatus = 'failed';
                state.error = getErrorMessage(action.payload);
            })

            // Fetch transactions cases
            .addCase(fetchTransactions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions = action.payload;
                state.error = null;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = getErrorMessage(action.payload);
            })

            // Fetch account summary cases
            .addCase(fetchAccountSummary.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAccountSummary.fulfilled, (state, action) => {
                state.isLoading = false;
                state.accountSummary = action.payload;
                state.error = null;
            })
            .addCase(fetchAccountSummary.rejected, (state, action) => {
                state.isLoading = false;
                state.error = getErrorMessage(action.payload);
            })

            // Fetch account movements cases
            .addCase(fetchAccountMovements.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAccountMovements.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movements = action.payload;
                state.error = null;
            })
            .addCase(fetchAccountMovements.rejected, (state, action) => {
                state.isLoading = false;
                state.error = getErrorMessage(action.payload);
            });
    }
});

export const { 
    clearTransferStatus, 
    clearCreateAccountStatus, 
    clearError,
    resetAccountState 
} = accountsSlice.actions;

export const selectAccounts = (state) => state.accounts.accounts;
export const selectAccountTypes = (state) => state.accounts.accountTypes;
export const selectSelectedAccount = (state) => state.accounts.selectedAccount;
export const selectAccountSummary = (state) => state.accounts.accountSummary;
export const selectMovements = (state) => state.accounts.movements;
export const selectTransactions = (state) => state.accounts.transactions;
export const selectIsLoading = (state) => state.accounts.isLoading;
export const selectError = (state) => state.accounts.error;

export default accountsSlice.reducer;