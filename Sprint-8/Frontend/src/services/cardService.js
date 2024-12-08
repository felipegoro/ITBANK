import api from './api';

const cardService = {
    getAllCards: async () => {
        const response = await api.get('/cards');
        return response.data;
    },

    getCardById: async (cardId) => {
        const response = await api.get(`/cards/${cardId}`);
        return response.data;
    },

    activateCard: async (cardId) => {
        const response = await api.post(`/cards/${cardId}/activate`);
        return response.data;
    },

    blockCard: async (cardId) => {
        const response = await api.post(`/cards/${cardId}/block`);
        return response.data;
    },

    requestNewCard: async (cardData) => {
        const response = await api.post('/cards/request', cardData);
        return response.data;
    },

    getCardTransactions: async (cardId, params = {}) => {
        const response = await api.get(`/cards/${cardId}/transactions`, { params });
        return response.data;
    }
};

export default cardService;