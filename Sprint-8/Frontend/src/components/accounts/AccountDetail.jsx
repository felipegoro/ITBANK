import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountDetails } from '../../features/accounts/accountsSlice';
import Loading from '../common/Loading';
import styles from '../../styles/components/accounts/AccountDetail.module.css';

const AccountDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedAccount, isLoading, error } = useSelector((state) => state.accounts);

    useEffect(() => {
        if (id) {
            dispatch(fetchAccountDetails(id));
        }
    }, [dispatch, id]);

    if (isLoading) return <Loading />;
    if (error) return <div className="error-message">{error}</div>;
    if (!selectedAccount) return <div>No se encontró la cuenta</div>;

    return (
        <div className="account-details">
            <h2>Detalles de la Cuenta</h2>
            <div className="account-info">
                <div className="info-group">
                    <label>Tipo de Cuenta:</label>
                    <span>{selectedAccount.tipo_cuenta}</span>
                </div>
                <div className="info-group">
                    <label>Número de Cuenta:</label>
                    <span>{selectedAccount.numero_cuenta}</span>
                </div>
                <div className="info-group">
                    <label>Saldo Actual:</label>
                    <span>${selectedAccount.saldo.toLocaleString()}</span>
                </div>
                <div className="info-group">
                    <label>Estado:</label>
                    <span className={`status ${selectedAccount.estado.toLowerCase()}`}>
                        {selectedAccount.estado}
                    </span>
                </div>
            </div>

            <div className="recent-movements">
                <h3>Movimientos Recientes</h3>
                {selectedAccount.movimientos?.map((movement) => (
                    <div key={movement.id} className="movement-item">
                        <span className="date">{new Date(movement.fecha).toLocaleDateString()}</span>
                        <span className="description">{movement.descripcion}</span>
                        <span className={`amount ${movement.tipo}`}>
                            ${movement.monto.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccountDetails;