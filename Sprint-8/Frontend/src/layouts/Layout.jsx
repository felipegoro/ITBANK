import React from 'react';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import styles from '../../styles/layout/Layout.module.css';

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.container}>
                <Sidebar />
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;