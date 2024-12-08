import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTransaction } from '../../features/transactions/transactionsSlice';
import Loading from '../common/Loading';
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
        tipo_transferencia: 'inmediata' // inmediata o programada
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.cuenta_origen || !formData.cuenta_destino || !formData.monto) {
            alert('Por favor, complete todos los campos requeridos');
            return;
        }

        try {
            await dispatch(createTransaction(formData)).unwrap();
            navigate('/transactions');
        } catch (error) {
            console.error('Error al realizar la transferencia:', error);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="transaction-form-container">
            <h2>Nueva Transferencia</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="transaction-form">
                <div className="form-group">
                    <label htmlFor="cuenta_origen">Cuenta de Origen</label>
                    <select
                        id="cuenta_origen"
                        name="cuenta_origen"
                        value={formData.cuenta_origen}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una cuenta</option>
                        {accounts?.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.tipo_cuenta} - Saldo: ${account.saldo.toLocaleString()}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="cuenta_destino">Cuenta de Destino</label>
                    <input
                        type="text"
                        id="cuenta_destino"
                        name="cuenta_destino"
                        value={formData.cuenta_destino}
                        onChange={handleChange}
                        placeholder="Ingrese el número de cuenta"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="monto">Monto a Transferir</label>
                    <input
                        type="number"
                        id="monto"
                        name="monto"
                        value={formData.monto}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <input
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        placeholder="Motivo de la transferencia"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tipo_transferencia">Tipo de Transferencia</label>
                    <select
                        id="tipo_transferencia"
                        name="tipo_transferencia"
                        value={formData.tipo_transferencia}
                        onChange={handleChange}
                        required
                    >
                        <option value="inmediata">Inmediata</option>
                        <option value="programada">Programada</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isLoading}
                >
                    {isLoading ? 'Procesando...' : 'Realizar Transferencia'}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;