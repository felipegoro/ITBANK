import api from './api';

const loanService = {
    getAllLoans: async () => {
        const response = await api.get('/loans');
        return response.data;
    },

    getLoanById: async (loanId) => {
        const response = await api.get(`/loans/${loanId}`);
        return response.data;
    },

    getLoanTypes: async () => {
        const response = await api.get('/loans/types');
        return response.data;
    },

    applyForLoan: async (loanData) => {
        const response = await api.post('/loans/apply', loanData);
        return response.data;
    },

    getLoanPayments: async (loanId) => {
        const response = await api.get(`/loans/${loanId}/payments`);
        return response.data;
    },

    calculateLoan: async (calculationData) => {
        const response = await api.post('/loans/calculate', calculationData);
        return response.data;
    }
};

export default loanService;
