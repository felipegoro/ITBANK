
import React, { useState } from 'react';
import HistorialServicios from './HistorialServicios';
import ConfigurarcuentaServicios from './ConfigurarcuentaServicios';
import styles from './Servicios.module.css';

function Servicios() {


  return (
    <div className={styles.Servicios}>
      
        <div>
            <h2>Cuentas y servicios</h2>
            <div className={styles.tabs}>
              <a className={styles.active} href='/servicios'> pagar</a>
              <a className={styles.active} href='/HistorialServicios'> historial</a>
            </div>
          <div className={styles.content}>
            <div className={styles.card}>
              <p>¡Estás al día con tus cuentas y servicios!</p>
            </div>
            <div className={styles.card}>
              <h1>Configurá tus cuentas</h1>
              <a>Podrás configurar un recordatorio para no olvidar los vencimientos.</a>
              <a href="/ConfigurarcuentaServicios">Configurar Cuenta </a>
            </div>
          </div>
          <a className={styles.button} href='/FormulariofacturaServicios'>Pagar una cuenta nueva</a>
        </div>
      

    </div>
  );
}

export default Servicios;
