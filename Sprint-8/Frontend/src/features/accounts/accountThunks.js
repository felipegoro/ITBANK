import { createAsyncThunk } from '@reduxjs/toolkit';
import accountService from '../../services/accountService';

export const fetchAccounts = createAsyncThunk(
    'accounts/fetchAccounts',
    async (_, { rejectWithValue }) => {
        try {
            return await accountService.getAllAccounts();
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error al obtener las cuentas');
        }
    }
);

export const fetchAccountTypes = createAsyncThunk(
    'accounts/fetchAccountTypes',
    async (_, { rejectWithValue }) => {
        try {
            return await accountService.getAccountTypes();
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error al obtener los tipos de cuenta');
        }
    }
);;

export const createAccount = createAsyncThunk(
    'accounts/createAccount',
    async (accountData, { rejectWithValue }) => {
        try {
            return await accountService.createAccount(accountData);
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error al crear la cuenta');
        }
    }
);

export const fetchAccountDetail = createAsyncThunk(
    'accounts/fetchAccountDetail',
    async (accountId, { rejectWithValue }) => {
        try {
            return await accountService.getAccountById(accountId);
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error al obtener el detalle de la cuenta');
        }
    }
);

export const transferFunds = createAsyncThunk(
    'accounts/transferFunds',
    async ({ accountId, transferData }, { rejectWithValue }) => {
        try {
            return await accountService.transferFunds(accountId, transferData);
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error al realizar la transferencia');
        }
    }
);

export const fetchAccountSummary = createAsyncThunk(
    'accounts/fetchAccountSummary',
    async (_, { rejectWithValue }) => {
        try {
            return await accountService.getAccountsSummary();
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error al obtener el resumen de cuentas');
        }
    }
);

export const fetchAccountMovements = createAsyncThunk(
    'accounts/fetchAccountMovements',
    async (accountId, { rejectWithValue }) => {
        try {
            return await accountService.getAccountMovements(accountId);
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error al obtener los movimientos');
        }
    }
);

export const fetchTransactions = createAsyncThunk(
    'accounts/fetchTransactions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await accountService.getTransactions();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error al obtener las transacciones');
        }
    }
);