import React from 'react';
import './Fondo.css';

function Fondo() {
    return (
        <div>
        <div className="fondo"><img src="fondito.jpg" alt="Fondo decorativo" /> </div>
        <div className="fotologin"> <img src="/assets/feliz.jpg" alt="Imagen de un usuario del banco realizando un pago desde su casa" /> </div>
        </div>
    );
}

export default Fondo;