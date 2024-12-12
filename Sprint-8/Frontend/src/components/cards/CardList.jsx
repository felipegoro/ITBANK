import React from 'react';
import styles from '../../styles/components/cards/CardList.module.css';

const CardList = () => {
    
    const mockCards = [
        {
            id: 1,
            tipo_tarjeta: 'Visa Gold',
            numero_tarjeta: '4532 **** **** 1234',
            saldo: 50000,
            estado: 'activa',
            color: '#FFD700'
        },
        {
            id: 2,
            tipo_tarjeta: 'Mastercard Black',
            numero_tarjeta: '5423 **** **** 5678',
            saldo: 75000,
            estado: 'activa',
            color: '#000000'
        }
    ];

    const cards = mockCards;

    return (
        <div className={styles.cardListContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Mis Tarjetas</h1>
                <button className={styles.newCardButton}>
                    Nueva Tarjeta
                </button>
            </div>

            <div className={styles.cardGrid}>
                {cards.map((card) => (
                    <div key={card.id} className={styles.cardItem}>
                        <div 
                            className={styles.cardFront}
                            style={{
                                background: `linear-gradient(135deg, ${card.color} 0%, rgba(0,0,0,0.8) 100%)`
                            }}
                        >
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardType}>{card.tipo_tarjeta}</h3>
                                <div className={styles.chipIcon}>
                                    <div className={styles.chip}></div>
                                </div>
                            </div>
                            
                            <div className={styles.cardNumber}>
                                {card.numero_tarjeta}
                            </div>
                            
                            <div className={styles.cardFooter}>
                                <div className={styles.cardBalance}>
                                    ${card.saldo.toLocaleString()}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardList;