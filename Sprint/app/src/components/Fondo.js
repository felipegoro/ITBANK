import React from 'react';
import styles from './Fondo.module.css';

function Fondo() {
    return (
        <div className={styles.fondo}>
        <div className={styles.fotologin}> <img src="/assets/feliz.jpg" alt="Imagen de un usuario del banco realizando un pago desde su casa" /> </div>
        </div>
    );
}

export default Fondo;