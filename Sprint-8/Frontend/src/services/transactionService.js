import api from './api';

const transactionService = {
    getAllTransactions: async (params = {}) => {
        const response = await api.get('/transactions', { params });
        return response.data;
    },

    getTransactionById: async (transactionId) => {
        const response = await api.get(`/transactions/${transactionId}`);
        return response.data;
    },

    createTransaction: async (transactionData) => {
        const response = await api.post('/transactions', transactionData);
        return response.data;
    },

    getTransactionTypes: async () => {
        const response = await api.get('/transactions/types');
        return response.data;
    },

    validateTransaction: async (transactionData) => {
        const response = await api.post('/transactions/validate', transactionData);
        return response.data;
    },

    getTransactionReceipt: async (transactionId) => {
        const response = await api.get(`/transactions/${transactionId}/receipt`);
        return response.data;
    }
};

export default transactionService;
