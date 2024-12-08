import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData, selectDashboardData } from '../../features/dashboard/dashboardSlice';
import AccountSummary from './AccountSummary';
import RecentTransactions from './RecentTransactions';
import Loading from '../common/Loading';
import styles from '../../styles/pages/Dashboard.module.css';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.dashboard);
    const dashboardData = useSelector(selectDashboardData);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                await dispatch(fetchDashboardData()).unwrap();
            } catch (err) {
                console.error('Error al cargar el dashboard:', err);
            }
        };
        
        loadDashboard();
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className={styles.dashboard}>
                <div className={styles.loadingContainer}>
                    <Loading />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.dashboard}>
                <div className={styles.errorContainer}>
                    <h2>Error</h2>
                    <p className={styles.errorMessage}>{error}</p>
                    <button 
                        className={styles.retryButton}
                        onClick={() => dispatch(fetchDashboardData())}
                    >
                        Intentar nuevamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.welcomeSection}>
                <h1>Bienvenido, {user?.nombre || 'Usuario'}</h1>
                <p className={styles.date}>
                    {new Date().toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>
            <div className={styles.dashboardContent}>
                <AccountSummary data={dashboardData.accountSummary} />
                <RecentTransactions transactions={dashboardData.recentTransactions} />
            </div>
        </div>
    );
};

export default Dashboard;   