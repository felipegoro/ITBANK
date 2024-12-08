import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchDashboardData',
    async (_, { rejectWithValue }) => {
        try {
            // Simular datos de ejemplo mientras se conecta al backend
            const mockData = {
                accountSummary: {
                    totalBalance: 50000,
                    accounts: [
                        { id: 1, tipo_cuenta: 'Cuenta Corriente', numero_cuenta: '1234-5678', saldo: 30000 },
                        { id: 2, tipo_cuenta: 'Caja de Ahorro', numero_cuenta: '8765-4321', saldo: 20000 }
                    ]
                },
                recentTransactions: [
                    { 
                        id: 1, 
                        fecha: '2024-03-15', 
                        descripcion: 'Depósito', 
                        monto: 1000, 
                        tipo: 'ingreso' 
                    },
                    { 
                        id: 2, 
                        fecha: '2024-03-14', 
                        descripcion: 'Pago servicios', 
                        monto: 500, 
                        tipo: 'egreso' 
                    }
                ],
                cardsSummary: {
                    totalCards: 2,
                    cards: [
                        { id: 1, tipo: 'Crédito', numero: '**** 1234', limite: 100000 },
                        { id: 2, tipo: 'Débito', numero: '**** 5678' }
                    ]
                },
                loansSummary: {
                    totalLoans: 1,
                    loans: [
                        { 
                            id: 1, 
                            tipo: 'Personal', 
                            monto: 50000, 
                            cuotas_restantes: 10,
                            cuota_mensual: 5500
                        }
                    ]
                }
            };

            // Simular llamada al API
            await new Promise(resolve => setTimeout(resolve, 1000));
            return mockData;

            // Cuando el backend esté listo, usar esto:
            // const response = await axios.get('/api/dashboard');
            // return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al cargar los datos del dashboard');
        }
    }
);

const initialState = {
    accountSummary: null,
    recentTransactions: [],
    cardsSummary: null,
    loansSummary: null,
    isLoading: false,
    error: null,
    lastUpdated: null
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        clearDashboardError: (state) => {
            state.error = null;
        },
        resetDashboard: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.accountSummary = action.payload.accountSummary;
                state.recentTransactions = action.payload.recentTransactions;
                state.cardsSummary = action.payload.cardsSummary;
                state.loansSummary = action.payload.loansSummary;
                state.lastUpdated = new Date().toISOString();
                state.error = null;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Error al cargar los datos del dashboard';
            });
    }
});

export const { clearDashboardError, resetDashboard } = dashboardSlice.actions;

export const selectDashboardData = (state) => ({
    accountSummary: state.dashboard.accountSummary,
    recentTransactions: state.dashboard.recentTransactions,
    cardsSummary: state.dashboard.cardsSummary,
    loansSummary: state.dashboard.loansSummary
});

export default dashboardSlice.reducer;