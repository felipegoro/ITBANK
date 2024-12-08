import React from 'react';
import styles from '../../styles/components/common/Loading.module.css';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando...</p>
        </div>
    );
};

export default Loading;