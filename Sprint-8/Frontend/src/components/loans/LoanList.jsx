import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLoans } from '../../features/loans/loansSlice';
import Loading from '../common/Loading';
import styles from '../../styles/components/loans/LoanList.module.css';



const LoanList = () => {
    const dispatch = useDispatch();
    const { loans, isLoading, error } = useSelector((state) => state.loans);

    useEffect(() => {
        dispatch(fetchLoans());
    }, [dispatch]);

    if (isLoading) return <Loading />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="loan-list">
            <div className="loan-header">
                <h2>Mis Préstamos</h2>
                <Link to="/loans/apply" className="apply-loan-btn">
                    Solicitar Préstamo
                </Link>
            </div>

            {loans?.length === 0 ? (
                <div className="no-loans">
                    <p>No tienes préstamos activos.</p>
                    <p>¿Necesitas financiamiento? Solicita un préstamo ahora.</p>
                </div>
            ) : (
                <div className="loans-grid">
                    {loans.map((loan) => (
                        <div key={loan.id} className="loan-card">
                            <div className="loan-type">
                                <h3>{loan.tipo_prestamo}</h3>
                                <span className={`status ${loan.estado.toLowerCase()}`}>
                                    {loan.estado}
                                </span>
                            </div>
                            <div className="loan-details">
                                <div className="detail-item">
                                    <span>Monto Total:</span>
                                    <span>${loan.monto_total.toLocaleString()}</span>
                                </div>
                                <div className="detail-item">
                                    <span>Cuota Mensual:</span>
                                    <span>${loan.cuota_mensual.toLocaleString()}</span>
                                </div>
                                <div className="detail-item">
                                    <span>Cuotas Restantes:</span>
                                    <span>{loan.cuotas_restantes} de {loan.total_cuotas}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LoanList;