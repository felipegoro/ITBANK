import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCards } from '../../features/cards/cardsSlice';
import Loading from '../common/Loading';
import styles from '../../styles/components/cards/CardList.module.css';

const CardList = () => {
    const dispatch = useDispatch();
    const { cards, isLoading, error } = useSelector((state) => state.cards);

    useEffect(() => {
        dispatch(fetchCards());
    }, [dispatch]);

    if (isLoading) return <Loading />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="card-list">
            <h2>Mis Tarjetas</h2>
            <div className="cards-grid">
                {cards.map((card) => (
                    <div key={card.id} className="card-item">
                        <h3>{card.tipo_tarjeta}</h3>
                        <p className="card-number">N°: {card.numero_tarjeta}</p>
                        <p className="card-balance">
                            Saldo: ${card.saldo.toLocaleString()}
                        </p>
                        <Link 
                            to={`/cards/${card.id}`}
                            className="view-details-btn"
                        >
                            Ver Detalles
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardList;