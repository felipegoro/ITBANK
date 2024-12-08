import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import accountsReducer from '../features/accounts/accountsSlice';
import transactionsReducer from '../features/transactions/transactionsSlice';
import cardsReducer from '../features/cards/cardsSlice';
import loansReducer from '../features/loans/loansSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        accounts: accountsReducer,
        transactions: transactionsReducer,
        cards: cardsReducer,
        loans: loansReducer,
        dashboard: dashboardReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignorar acciones específicas para evitar warnings de serialización
                ignoredActions: [
                    'auth/login/fulfilled',
                    'auth/register/fulfilled',
                    'auth/checkAuth/fulfilled'
                ],
                ignoredPaths: ['auth.user'],
            },
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;