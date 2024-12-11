import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTransaction } from '../../features/transactions/transactionsSlice';
import styles from '../../styles/components/transactions/TransactionForm.module.css';

const TransactionForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { accounts } = useSelector((state) => state.accounts);
    const { isLoading, error } = useSelector((state) => state.transactions);

    const [formData, setFormData] = useState({
        cuenta_origen: '',
        cuenta_destino: '',
        monto: '',
        descripcion: '',
        tipo_transferencia: 'inmediata'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createTransaction(formData)).unwrap();
            navigate('/transactions');
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formCard}>
                <h1 className={styles.title}>Nueva Transferencia</h1>
                
                {error && <div className={styles.errorMessage}>{error}</div>}
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="cuenta_origen">Cuenta de Origen</label>
                        <select
                            id="cuenta_origen"
                            value={formData.cuenta_origen}
                            onChange={(e) => setFormData({...formData, cuenta_origen: e.target.value})}
                            required
                        >
                            <option value="">Seleccione una cuenta</option>
                            {accounts?.map((account) => (
                                <option key={account.id} value={account.id}>
                                    {account.tipo_cuenta} - ${account.saldo.toLocaleString()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="cuenta_destino">Cuenta de Destino</label>
                        <input
                            type="text"
                            id="cuenta_destino"
                            value={formData.cuenta_destino}
                            onChange={(e) => setFormData({...formData, cuenta_destino: e.target.value})}
                            placeholder="Ingrese el número de cuenta"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="monto">Monto a Transferir</label>
                        <input
                            type="number"
                            id="monto"
                            value={formData.monto}
                            onChange={(e) => setFormData({...formData, monto: e.target.value})}
                            placeholder="$0.00"
                            min="1"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="descripcion">Descripción</label>
                        <input
                            type="text"
                            id="descripcion"
                            value={formData.descripcion}
                            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                            placeholder="Motivo de la transferencia"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="tipo_transferencia">Tipo de Transferencia</label>
                        <select
                            id="tipo_transferencia"
                            value={formData.tipo_transferencia}
                            onChange={(e) => setFormData({...formData, tipo_transferencia: e.target.value})}
                        >
                            <option value="inmediata">Inmediata</option>
                            <option value="programada">Programada</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Procesando...' : 'Realizar Transferencia'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;