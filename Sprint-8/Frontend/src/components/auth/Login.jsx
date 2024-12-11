import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../features/auth/authThunks';
import { clearError } from '../../features/auth/authSlice';
import styles from '../../styles/pages/Login.module.css';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(clearError());
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login(credentials)).unwrap();
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h2 className={styles.loginTitle}>Iniciar Sesión</h2>
                
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    {error && (
                        <div className={styles.errorMessage}>
                            {typeof error === 'string' ? error : 'Error al iniciar sesión'}
                        </div>
                    )}
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className={styles.label}>Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            className={styles.input}
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className={styles.input}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={styles.loginButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>

                    <div className={styles.authLinks}>
                        <Link to="/register" className={styles.registerLink}>
                            ¿No tienes cuenta? Regístrate aquí
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;