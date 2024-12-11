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

    return (
        <div className={styles.transactionListContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Transferencias</h1>
                <Link to="/transactions/new" className={styles.newTransactionButton}>
                    Nueva Transferencia
                </Link>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <div className={styles.transactionsGrid}>
                {transactions?.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No hay transferencias realizadas</p>
                        <Link to="/transactions/new" className={styles.newTransactionButton}>
                            Realizar mi primera transferencia
                        </Link>
                    </div>
                ) : (
                    transactions.map((transaction) => (
                        <div key={transaction.id} className={styles.transactionCard}>
                            <div className={styles.transactionHeader}>
                                <span className={styles.transactionDate}>
                                    {new Date(transaction.fecha).toLocaleDateString()}
                                </span>
                                <span className={`${styles.transactionStatus} ${styles[transaction.estado.toLowerCase()]}`}>
                                    {transaction.estado}
                                </span>
                            </div>
                            
                            <div className={styles.transactionBody}>
                                <div className={styles.transactionAmount}>
                                    ${transaction.monto.toLocaleString()}
                                </div>
                                <div className={styles.transactionDescription}>
                                    {transaction.descripcion}
                                </div>
                            </div>

                            <div className={styles.transactionFooter}>
                                <div className={styles.accountInfo}>
                                    <div className={styles.originAccount}>
                                        De: {transaction.cuenta_origen}
                                    </div>
                                    <div className={styles.destinationAccount}>
                                        Para: {transaction.cuenta_destino}
                                    </div>
                                </div>
                                <Link 
                                    to={`/transactions/${transaction.id}`}
                                    className={styles.viewDetailsButton}
                                >
                                    Ver Detalles
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TransactionList;