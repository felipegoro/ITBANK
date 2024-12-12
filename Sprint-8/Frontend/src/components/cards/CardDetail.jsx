import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardDetails } from '../../features/cards/cardsSlice';
import Loading from '../common/Loading';


const CardDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedCard, isLoading, error } = useSelector((state) => state.cards);

    useEffect(() => {
        if (id) {
            dispatch(fetchCardDetails(id));
        }
    }, [dispatch, id]);

    if (isLoading) return <Loading />;
    if (error) return <div className="error-message">{error}</div>;
    if (!selectedCard) return <div>No se encontró la tarjeta</div>;

    return (
        <div className="card-details">
            <h2>Detalles de la Tarjeta</h2>
            <div className="card-info">
                <div className="info-group">
                    <label>Tipo de Tarjeta:</label>
                    <span>{selectedCard.tipo_tarjeta}</span>
                </div>
                <div className="info-group">
                    <label>Número de Tarjeta:</label>
                    <span>{selectedCard.numero_tarjeta}</span>
                </div>
                <div className="info-group">
                    <label>Saldo Actual:</label>
                    <span>${selectedCard.saldo.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};

export default CardDetail;