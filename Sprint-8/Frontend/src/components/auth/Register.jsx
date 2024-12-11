import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../features/auth/authThunks';
import styles from '../../styles/pages/Register.module.css';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        fecha_nacimiento: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, registrationSuccess } = useSelector((state) => state.auth);

    useEffect(() => {
        if (registrationSuccess) {
            navigate('/login');
        }
    }, [registrationSuccess, navigate]);

    const validateForm = () => {
        const errors = {};
        
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }
        
        if (formData.dni.length !== 8) {
            errors.dni = 'El DNI debe tener 8 dígitos';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Frontend/src/components/auth/Register.jsx

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
    
        const userData = {
            first_name: formData.nombre,
            last_name: formData.apellido,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            dni: formData.dni,
            fecha_nacimiento: formData.fecha_nacimiento
        };
    
        try {
            await dispatch(register(userData)).unwrap();
            navigate('/login');
        } catch (error) {
            setFormErrors({
                ...formErrors,
                submit: error.message || "Error al registrar usuario"
            });
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error del campo cuando el usuario empiece a escribir
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerCard}>
                <h2 className={styles.registerTitle}>Registro de Usuario</h2>
                
                {(error || formErrors.submit) && (
                    <div className={styles.errorMessage}>
                        {error || formErrors.submit}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className={styles.registerForm}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="nombre">Nombre</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="apellido">Apellido</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="dni">DNI</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="dni"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            pattern="\d{8}"
                            title="DNI debe tener 8 dígitos"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                        <input
                            className={styles.input}
                            type="date"
                            id="fecha_nacimiento"
                            name="fecha_nacimiento"
                            value={formData.fecha_nacimiento}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input
                            className={styles.input}
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="username">Usuario</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="password">Contraseña</label>
                        <input
                            className={styles.input}
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            className={styles.input}
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={styles.registerButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registrando...' : 'Registrarse'}
                    </button>

                    <div className={styles.authLinks}>
                        <Link to="/login">¿Ya tienes cuenta? Inicia sesión aquí</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;