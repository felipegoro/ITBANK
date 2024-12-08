import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../../styles/components/common/Sidebar.module.css';

const Sidebar = () => {
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <aside className="sidebar">
            <div className="user-info">
                <div className="user-avatar">
                    {user?.nombre?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="user-details">
                    <h3>{user?.nombre} {user?.apellido}</h3>
                    <p>{user?.email}</p>
                </div>
            </div>

            <nav className="sidebar-nav">
                <Link to="/dashboard" className={isActive('/dashboard')}>
                    Inicio
                </Link>
                <Link to="/accounts" className={isActive('/accounts')}>
                    Mis Cuentas
                </Link>
                <Link to="/cards" className={isActive('/cards')}>
                    Mis Tarjetas
                </Link>
                <Link to="/transactions" className={isActive('/transactions')}>
                    Transferencias
                </Link>
                <Link to="/loans" className={isActive('/loans')}>
                    Préstamos
                </Link>
                <Link to="/profile" className={isActive('/profile')}>
                    Mi Perfil
                </Link>
            </nav>
        </aside>
    );
};

export default Sidebar;