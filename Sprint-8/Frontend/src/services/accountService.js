import api from './api';

const accountService = {
    getAllAccounts: async () => {
        const response = await api.get('/accounts');
        return response.data;
    },

    getAccountById: async (accountId) => {
        const response = await api.get(`/accounts/${accountId}`);
        return response.data;
    },

    getAccountTransactions: async (accountId, params = {}) => {
        const response = await api.get(`/accounts/${accountId}/transactions`, { params });
        return response.data;
    },

    getAccountBalance: async (accountId) => {
        const response = await api.get(`/accounts/${accountId}/balance`);
        return response.data;
    },

    createAccount: async (accountData) => {
        const response = await api.post('/accounts', accountData);
        return response.data;
    },

    updateAccount: async (accountId, accountData) => {
        const response = await api.put(`/accounts/${accountId}`, accountData);
        return response.data;
    }
};

export default accountService;