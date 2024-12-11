import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../../styles/pages/Dashboard.module.css'; // Cambiada la ruta de importación

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    
    const currentDate = new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className={styles.dashboardContainer}>
            <section className={styles.welcomeSection}>
                <h1 className={styles.welcomeTitle}>¡Bienvenido!</h1>
                <p className={styles.dateDisplay}>{currentDate}</p>
            </section>

            <div className={styles.dashboardGrid}>
                {/* Resumen de Cuentas */}
                <div className={styles.card}>
                    <div className={styles.cardTitle}>
                        <h2>Resumen de Cuentas</h2>
                        <button 
                            onClick={() => handleNavigate('/accounts')} 
                            className={styles.viewAllLink}
                        >
                            
                        </button>
                    </div>
                    <div className={styles.accountSummary}>
                        <div>Balance Total</div>
                        <div className={styles.balanceAmount}>$1500</div>
                    </div>
                </div>

                {/* Movimientos Recientes */}
                <div className={styles.card}>
                    <div className={styles.cardTitle}>
                        <h2>Movimientos Recientes</h2>
                        <button 
                            onClick={() => handleNavigate('/transactions')} 
                            className={styles.viewAllLink}
                        >
                            
                        </button>
                    </div>
                    <ul className={styles.transactionList}>
                        <li className={styles.transactionItem}>
                            <div className={styles.transactionInfo}>
                                <span className={styles.transactionDate}>14/3/2024</span>
                                <span className={styles.transactionDescription}>Depósito</span>
                            </div>
                            <span className={`${styles.transactionAmount} ${styles.positive}`}>
                                +$1000
                            </span>
                        </li>
                        <li className={styles.transactionItem}>
                            <div className={styles.transactionInfo}>
                                <span className={styles.transactionDate}>13/3/2024</span>
                                <span className={styles.transactionDescription}>Pago servicios</span>
                            </div>
                            <span className={`${styles.transactionAmount} ${styles.negative}`}>
                                -$500
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;