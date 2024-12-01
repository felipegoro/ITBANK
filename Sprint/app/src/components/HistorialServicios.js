import React from 'react';
import styles from './Servicios.module.css';
function HistorialServicios({ setPagina }) {
  return (
    <div>
      <header className={styles.header}>
        <button onClick={() => setPagina('home')}>&lt; Cuentas y servicios</button>
        <h2>Cuentas y servicios</h2>
        <div className={styles.tabs}>
          <button onClick={() => setPagina('home')}>A pagar</button>
          <button className={styles.active}>Historial</button>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.card}>
          <h3>Telecentro</h3>
          <p>Pago de servicio - $47,914.77</p>
          <p>Dinero disponible</p>
          <p>16/mar</p>
          <button>Ver más</button>
        </div>
      </div>
      <button className={styles.button}>Pagar una cuenta nueva</button>
    </div>
  );
}

export default HistorialServicios;