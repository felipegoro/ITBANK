import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAccounts } from '../../features/accounts/accountsSlice';
import Loading from '../common/Loading';
import styles from '../../styles/components/accounts/AccountList.module.css';

const AccountList = () => {
    const dispatch = useDispatch();
    const { accounts, isLoading, error } = useSelector((state) => state.accounts);

    useEffect(() => {
        dispatch(fetchAccounts());
    }, [dispatch]);

    if (isLoading) return <Loading />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="account-list">
            <h2>Mis Cuentas</h2>
            <div className="accounts-grid">
                {accounts.map((account) => (
                    <div key={account.id} className="account-card">
                        <h3>{account.tipo_cuenta}</h3>
                        <p className="account-number">N°: {account.numero_cuenta}</p>
                        <p className="account-balance">
                            Saldo: ${account.saldo.toLocaleString()}
                        </p>
                        <Link 
                            to={`/accounts/${account.id}`}
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

export default AccountList;