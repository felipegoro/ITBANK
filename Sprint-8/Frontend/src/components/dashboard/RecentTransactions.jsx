import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/dashboard/RecentTransactions.module.css';

const RecentTransactions = () => {
    const { recentTransactions } = useSelector((state) => state.dashboard);

    return (
        <div className="recent-transactions">
            <div className="transactions-header">
                <h2>Movimientos Recientes</h2>
                <Link to="/transactions" className="view-all">
                    Ver todos
                </Link>
            </div>

            <div className="transactions-list">
                {recentTransactions?.map((transaction) => (
                    <div key={transaction.id} className="transaction-item">
                        <div className="transaction-info">
                            <span className="transaction-date">
                                {new Date(transaction.fecha).toLocaleDateString()}
                            </span>
                            <span className="transaction-description">
                                {transaction.descripcion}
                            </span>
                        </div>
                        <span className={`transaction-amount ${transaction.tipo}`}>
                            {transaction.tipo === 'debito' ? '-' : '+'}
                            ${transaction.monto.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;