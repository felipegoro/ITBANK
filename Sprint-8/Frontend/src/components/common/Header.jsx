import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authThunks';  // Añadir esta importación
import styles from '../../styles/components/common/Header.module.css';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    const handleLogout = async () => {
        try {
            // Ejecutamos el logout
            await dispatch(logout()).unwrap();
            
            // Limpiamos el token y cualquier otra información de autenticación
            localStorage.clear();
            
            // Redirigimos al usuario a la página de login
            navigate('/login');
        } catch (error) {
            console.error('Error durante el logout:', error);
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <Link to="/dashboard" className={styles.logo}>
                    <h1>ITBANK</h1>
                </Link>
                <nav className={styles.navigation}>
                    <Link to="/dashboard">Menu</Link>
                    <Link to="/accounts">Mis Cuentas</Link>
                    <Link to="/cards">Mis Tarjetas</Link>
                    <Link to="/transactions">Transferencias</Link>
                    <Link to="/loans">Préstamos</Link>
                    <Link to="/profile">Mi Perfil</Link>
                </nav>
                <div className={styles.userSection}>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{user?.email}</span>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className={styles.logoutButton}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;