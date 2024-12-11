import api from './api';

const accountService = {
    getAllAccounts: async () => {
        const response = await api.get('/cuentas/');
        return response.data;
    },

    getAccountTypes: async () => {
        const response = await api.get('/tipos-cuenta/');  // Ajusta esta ruta según tu API
        return response.data;
    },

    createAccount: async (accountData) => {
        const response = await api.post('/cuentas/', accountData);
        return response.data;
    },

    getAccountById: async (accountId) => {
        const response = await api.get(`/cuentas/${accountId}/`);
        return response.data;
    },

    getAccountMovements: async (accountId) => {
        const response = await api.get(`/cuentas/${accountId}/movimientos/`);
        return response.data;
    },

    getAccountsSummary: async () => {
        const response = await api.get('/cuentas/resumen/');
        return response.data;
    },

    transferFunds: async (accountId, transferData) => {
        const response = await api.post(`/cuentas/${accountId}/transferir/`, transferData);
        return response.data;
    }
};

export default accountService;