import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { applyForLoan, fetchLoanTypes } from '../../features/loans/loansSlice';
import Loading from '../common/Loading';
import styles from '../../styles/components/loans/LoanApplication.module.css';


const LoanApplication = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loanTypes, isLoading, error } = useSelector((state) => state.loans);
    const { accounts } = useSelector((state) => state.accounts);

    const [formData, setFormData] = useState({
        tipo_prestamo: '',
        monto: '',
        plazo: '',
        cuenta_destino: '',
    });

    useEffect(() => {
        dispatch(fetchLoanTypes());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(applyForLoan(formData)).unwrap();
            navigate('/loans');
        } catch (error) {
            console.error('Error al solicitar préstamo:', error);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="loan-application">
            <h2>Solicitar Préstamo</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="loan-form">
                <div className="form-group">
                    <label htmlFor="tipo_prestamo">Tipo de Préstamo</label>
                    <select
                        id="tipo_prestamo"
                        name="tipo_prestamo"
                        value={formData.tipo_prestamo}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un tipo</option>
                        {loanTypes?.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.nombre} - Tasa: {type.tasa_interes}%
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="monto">Monto Solicitado</label>
                    <input
                        type="number"
                        id="monto"
                        name="monto"
                        value={formData.monto}
                        onChange={handleChange}
                        min="1000"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="plazo">Plazo (meses)</label>
                    <select
                        id="plazo"
                        name="plazo"
                        value={formData.plazo}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione el plazo</option>
                        {[12, 24, 36, 48, 60].map((months) => (
                            <option key={months} value={months}>
                                {months} meses
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="cuenta_destino">Cuenta de Destino</label>
                    <select
                        id="cuenta_destino"
                        name="cuenta_destino"
                        value={formData.cuenta_destino}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una cuenta</option>
                        {accounts?.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.tipo_cuenta} - {account.numero_cuenta}
                            </option>
                        ))}
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isLoading}
                >
                    {isLoading ? 'Procesando...' : 'Solicitar Préstamo'}
                </button>
            </form>
        </div>
    );
};

export default LoanApplication;