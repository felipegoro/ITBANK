import api from './api';

const loanService = {
    getAllLoans: async () => {
        const response = await api.get('/prestamos');
        return response.data;
    },

    getLoanById: async (loanId) => {
        const response = await api.get(`/prestamos/${loanId}`);
        return response.data;
    },

    getLoanTypes: async () => {
        const response = await api.get('/prestamos/tipos');
        return response.data;
    },

    applyForLoan: async (loanData) => {
        const response = await api.post('/prestamos/solicitar', loanData);
        return response.data;
    },

    getLoanPayments: async (loanId) => {
        const response = await api.get(`/prestamos/${loanId}/pagos`);
        return response.data;
    },

    calculateLoan: async (calculationData) => {
        const response = await api.post('/prestamos/calcular', calculationData);
        return response.data;
    }
};

export default loanService;