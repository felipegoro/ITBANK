import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLoans, selectAllLoans, selectLoansLoading, selectLoansError } from '../../features/loans/loansSlice';
import Loading from '../common/Loading';
import styles from '../../styles/components/loans/LoanList.module.css';

const LoanList = () => {
    const dispatch = useDispatch();
    const loans = useSelector(selectAllLoans);
    const isLoading = useSelector(selectLoansLoading);
    const error = useSelector(selectLoansError);

    useEffect(() => {
        dispatch(fetchLoans());
    }, [dispatch]);

    if (isLoading) return <Loading />;

    return (
        <div className={styles.loansContainer}>
            <div className={styles.header}>
    <h1 className={styles.title}>Mis Préstamos</h1>
    <Link to="/loans/apply" className={styles.newLoanButton}>
                    Solicitar Préstamo
                </Link>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <div className={styles.loansGrid}>
                {loans?.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No tienes préstamos activos</p>
                        <Link to="/loans/request" className={styles.requestLoanButton}>
                            Solicitar mi primer préstamo
                        </Link>
                    </div>
                ) : (
                    loans.map((loan) => (
                        <div key={loan.id} className={styles.loanCard}>
                            <div className={styles.loanHeader}>
                                <h3 className={styles.loanType}>{loan.tipo_prestamo}</h3>
                                <span className={`${styles.loanStatus} ${styles[loan.estado]}`}>
                                    {loan.estado}
                                </span>
                            </div>
                            
                            <div className={styles.loanAmount}>
                                ${loan.monto.toLocaleString()}
                            </div>
                            
                            <div className={styles.loanDetails}>
                                <div className={styles.detailItem}>
                                    <span>Plazo:</span>
                                    <span>{loan.plazo} meses</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span>Tasa:</span>
                                    <span>{loan.tasa_interes}% anual</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span>Cuota mensual:</span>
                                    <span>${loan.cuota_mensual.toLocaleString()}</span>
                                </div>
                            </div>

                            <Link 
                                to={`/loans/${loan.id}`}
                                className={styles.viewDetailsButton}
                            >
                                Ver Detalles
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LoanList;