import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Constants
const API_BASE_URL = '/api/cards';

// Initial state
const initialState = {
    cards: [],
    selectedCard: null,
    isLoading: false,
    error: null,
    lastUpdated: null,
    requestStatus: null,
    operationSuccess: false
};

// Async Thunks
export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_BASE_URL);
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
            const response = await axios.get(`${API_BASE_URL}/${cardId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const requestNewCard = createAsyncThunk(
    'cards/requestNewCard',
    async (cardData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/request`, cardData);
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
            const response = await axios.post(`${API_BASE_URL}/${cardId}/activate`);
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
            const response = await axios.post(`${API_BASE_URL}/${cardId}/block`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Reducer Helpers
const setPending = (state) => {
    state.isLoading = true;
    state.error = null;
};

const setError = (state, action) => {
    state.isLoading = false;
    state.error = action.payload?.message || 'Error en la operación';
};

const updateCardInState = (state, payload) => {
    const index = state.cards.findIndex(card => card.id === payload.id);
    if (index !== -1) {
        state.cards[index] = payload;
    }
    if (state.selectedCard?.id === payload.id) {
        state.selectedCard = payload;
    }
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
        },
        clearRequestStatus: (state) => {
            state.requestStatus = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Cards
            .addCase(fetchCards.pending, setPending)
            .addCase(fetchCards.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cards = action.payload;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(fetchCards.rejected, setError)

            // Fetch Card Details
            .addCase(fetchCardDetails.pending, setPending)
            .addCase(fetchCardDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedCard = action.payload;
            })
            .addCase(fetchCardDetails.rejected, setError)

            // Request New Card
            .addCase(requestNewCard.pending, (state) => {
                setPending(state);
                state.requestStatus = 'pending';
            })
            .addCase(requestNewCard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cards.push(action.payload);
                state.requestStatus = 'success';
                state.operationSuccess = true;
            })
            .addCase(requestNewCard.rejected, (state, action) => {
                setError(state, action);
                state.requestStatus = 'failed';
            })

            // Activate Card
            .addCase(activateCard.pending, setPending)
            .addCase(activateCard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.operationSuccess = true;
                updateCardInState(state, action.payload);
            })
            .addCase(activateCard.rejected, setError)

            // Block Card
            .addCase(blockCard.pending, setPending)
            .addCase(blockCard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.operationSuccess = true;
                updateCardInState(state, action.payload);
            })
            .addCase(blockCard.rejected, setError);
    }
});

// Actions
export const { 
    clearCardError, 
    clearSelectedCard, 
    clearOperationSuccess,
    clearRequestStatus 
} = cardsSlice.actions;

// Selectors
export const selectAllCards = (state) => state.cards.cards;
export const selectCardById = (state, cardId) => 
    state.cards.cards.find(card => card.id === cardId);
export const selectCardsLoading = (state) => state.cards.isLoading;
export const selectCardsError = (state) => state.cards.error;
export const selectSelectedCard = (state) => state.cards.selectedCard;
export const selectOperationSuccess = (state) => state.cards.operationSuccess;
export const selectRequestStatus = (state) => state.cards.requestStatus;

export default cardsSlice.reducer;