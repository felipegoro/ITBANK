import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTransactions } from '../../features/transactions/transactionsSlice';
import Loading from '../common/Loading';
import styles from '../../styles/components/transactions/TransactionList.module.css';

const TransactionList = () => {
    const dispatch = useDispatch();
    const { transactions, isLoading, error } = useSelector((state) => state.transactions);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    if (isLoading) return <Loading />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="transaction-list">
            <div className="transaction-header">
                <h2>Historial de Transacciones</h2>
                <Link to="/transactions/new" className="new-transaction-btn">
                    Nueva Transferencia
                </Link>
            </div>

            <div className="transactions-container">
                {transactions?.length === 0 ? (
                    <div className="no-transactions">
                        <p>No hay transacciones para mostrar.</p>
                    </div>
                ) : (
                    <div className="transactions-table">
                        <div className="table-header">
                            <div>Fecha</div>
                            <div>Descripción</div>
                            <div>Tipo</div>
                            <div>Monto</div>
                            <div>Estado</div>
                        </div>
                        {transactions.map((transaction) => (
                            <div key={transaction.id} className="transaction-row">
                                <div className="transaction-date">
                                    {new Date(transaction.fecha).toLocaleDateString()}
                                </div>
                                <div className="transaction-description">
                                    {transaction.descripcion}
                                </div>
                                <div className="transaction-type">
                                    {transaction.tipo}
                                </div>
                                <div className={`transaction-amount ${transaction.tipo}`}>
                                    ${transaction.monto.toLocaleString()}
                                </div>
                                <div className={`transaction-status ${transaction.estado.toLowerCase()}`}>
                                    {transaction.estado}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionList;