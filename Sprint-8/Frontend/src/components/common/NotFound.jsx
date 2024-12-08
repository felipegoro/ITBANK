import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>404 - Página no encontrada</h2>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <Link to="/" className="back-home">
                Volver al inicio
            </Link>
        </div>
    );
};

export default NotFound;