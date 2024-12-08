import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/dashboard/AccountSummary.module.css';


const AccountSummary = () => {
    const { accounts } = useSelector((state) => state.accounts);
    const totalBalance = accounts?.reduce((sum, account) => sum + account.saldo, 0) || 0;

    return (
        <div className="account-summary">
            <div className="summary-header">
                <h2>Resumen de Cuentas</h2>
                <Link to="/accounts" className="view-all">
                    Ver todas
                </Link>
            </div>

            <div className="total-balance">
                <span className="label">Balance Total</span>
                <span className="amount">${totalBalance.toLocaleString()}</span>
            </div>

            <div className="accounts-list">
                {accounts?.map((account) => (
                    <div key={account.id} className="account-item">
                        <div className="account-info">
                            <span className="account-type">{account.tipo_cuenta}</span>
                            <span className="account-number">
                                {account.numero_cuenta}
                            </span>
                        </div>
                        <span className="account-balance">
                            ${account.saldo.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccountSummary;