import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    fetchLoanTypes, 
    applyForLoan,
    selectLoanTypes,
    selectLoansLoading,
    selectLoansError,
    selectOperationSuccess
} from '../../features/loans/loansSlice';
import styles from '../../styles/components/loans/LoanApplication.module.css';

const LoanApplication = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const loanTypes = useSelector(selectLoanTypes);
    const isLoading = useSelector(selectLoansLoading);
    const error = useSelector(selectLoansError);
    const success = useSelector(selectOperationSuccess);

    const [formData, setFormData] = useState({
        tipo_prestamo: '',
        monto: '',
        plazo: '',
        ingreso_mensual: '',
        motivo: ''
    });

    useEffect(() => {
        dispatch(fetchLoanTypes());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            navigate('/loans');
        }
    }, [success, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(applyForLoan(formData)).unwrap();
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formCard}>
                <h1 className={styles.title}>Solicitar Préstamo</h1>
                
                {error && <div className={styles.errorMessage}>{error}</div>}
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="tipo_prestamo">Tipo de Préstamo</label>
                        <select
                            id="tipo_prestamo"
                            name="tipo_prestamo"
                            value={formData.tipo_prestamo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione un tipo</option>
                            {loanTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="monto">Monto Solicitado</label>
                        <input
                            type="number"
                            id="monto"
                            name="monto"
                            value={formData.monto}
                            onChange={handleChange}
                            placeholder="$0.00"
                            min="1000"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="plazo">Plazo (meses)</label>
                        <select
                            id="plazo"
                            name="plazo"
                            value={formData.plazo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione el plazo</option>
                            <option value="12">12 meses</option>
                            <option value="24">24 meses</option>
                            <option value="36">36 meses</option>
                            <option value="48">48 meses</option>
                            <option value="60">60 meses</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="ingreso_mensual">Ingreso Mensual</label>
                        <input
                            type="number"
                            id="ingreso_mensual"
                            name="ingreso_mensual"
                            value={formData.ingreso_mensual}
                            onChange={handleChange}
                            placeholder="$0.00"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="motivo">Motivo del Préstamo</label>
                        <textarea
                            id="motivo"
                            name="motivo"
                            value={formData.motivo}
                            onChange={handleChange}
                            placeholder="Describa el motivo de su solicitud"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Procesando...' : 'Solicitar Préstamo'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoanApplication;