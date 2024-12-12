import { configureStore } from '@reduxjs/toolkit';
import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import accountsReducer from '../features/accounts/accountsSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import loansReducer from '../features/loans/loansSlice'; // Añade esta línea

// Configuración de persistencia
const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['isAuthenticated', 'user', 'tokens'] // Solo persistir estos campos
};

const persistedReducer = persistReducer(persistConfig, authReducer);

// Configurar store
export const store = configureStore({
    reducer: {
        accounts: accountsReducer,
        dashboard: dashboardReducer,
        auth: persistedReducer,
        loans: loansReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ],
                ignoredPaths: ['auth.user']
            },
        }),
    // Estado inicial explícito
    preloadedState: {
        auth: {
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            tokens: {
                access: null,
                refresh: null
            }
        }
    }
});

// Crear persistor
export const persistor = persistStore(store, null, () => {
    // Limpiar el estado si no hay token
    if (!localStorage.getItem('token')) {
        store.dispatch({ type: 'auth/resetAuth' });
    }
});

export default store;