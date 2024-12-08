import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/cards');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchCardDetails = createAsyncThunk(
    'cards/fetchCardDetails',
    async (cardId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/cards/${cardId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const activateCard = createAsyncThunk(
    'cards/activateCard',
    async (cardId, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/api/cards/${cardId}/activate`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const blockCard = createAsyncThunk(
    'cards/blockCard',
    async (cardId, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/api/cards/${cardId}/block`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Initial state
const initialState = {
    cards: [],
    selectedCard: null,
    isLoading: false,
    error: null,
    lastUpdated: null,
    operationSuccess: false
};

// Slice
const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        clearCardError: (state) => {
            state.error = null;
        },
        clearSelectedCard: (state) => {
            state.selectedCard = null;
        },
        clearOperationSuccess: (state) => {
            state.operationSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Cards
            .addCase(fetchCards.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCards.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cards = action.payload;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(fetchCards.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Error al cargar las tarjetas';
            })

            // Fetch Card Details
            .addCase(fetchCardDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCardDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedCard = action.payload;
            })
            .addCase(fetchCardDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Error al cargar los detalles de la tarjeta';
            })

            // Activate Card
            .addCase(activateCard.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.operationSuccess = false;
            })
            .addCase(activateCard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.operationSuccess = true;
                // Actualizar el estado de la tarjeta en la lista
                const index = state.cards.findIndex(card => card.id === action.payload.id);
                if (index !== -1) {
                    state.cards[index] = action.payload;
                }
                if (state.selectedCard?.id === action.payload.id) {
                    state.selectedCard = action.payload;
                }
            })
            .addCase(activateCard.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Error al activar la tarjeta';
            })

            // Block Card
            .addCase(blockCard.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.operationSuccess = false;
            })
            .addCase(blockCard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.operationSuccess = true;
                // Actualizar el estado de la tarjeta en la lista
                const index = state.cards.findIndex(card => card.id === action.payload.id);
                if (index !== -1) {
                    state.cards[index] = action.payload;
                }
                if (state.selectedCard?.id === action.payload.id) {
                    state.selectedCard = action.payload;
                }
            })
            .addCase(blockCard.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Error al bloquear la tarjeta';
            });
    }
});

// Actions
export const { clearCardError, clearSelectedCard, clearOperationSuccess } = cardsSlice.actions;

// Selectors
export const selectAllCards = (state) => state.cards.cards;
export const selectCardById = (state, cardId) => 
    state.cards.cards.find(card => card.id === cardId);
export const selectCardsLoading = (state) => state.cards.isLoading;
export const selectCardsError = (state) => state.cards.error;
export const selectSelectedCard = (state) => state.cards.selectedCard;
export const selectOperationSuccess = (state) => state.cards.operationSuccess;

// Reducer
export default cardsSlice.reducer;