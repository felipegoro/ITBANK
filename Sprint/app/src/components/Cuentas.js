import React, { useContext } from 'react';
import { CuentasContext } from '../context/CuentasContext'; 
import styles from './Cuentas.module.css';

export const Cuentas = () => {
  const { cuentas, toggleDetalles } = useContext(CuentasContext); 

  return (
    <div className={styles.cuentas_container}>
      <div className={styles.cuentas_title}>
        <h1>Tus Cuentas</h1>
        <p>Desde aquí puedes operar todas tus cuentas desde cualquier sitio, confía en nosotros, confía en BANK-ITO.</p>
      </div>

      <div className={styles.cuentas_list}>
        {cuentas.map(cuenta => (
          <div className={styles.cuenta_card} key={cuenta.id}>
            <h2>{cuenta.nombre}</h2>
            <p>Saldo: ${cuenta.saldo.toFixed(2)}</p>
            <button 
              className={styles.cuenta_button} 
              onClick={() => toggleDetalles(cuenta.id)}>
              {cuenta.mostrarDetalles ? 'Ocultar Detalles' : 'Ver Detalles'}
            </button>
            
            {cuenta.mostrarDetalles && (
              <div className={styles.movimientos_detalles}>
                <h3>Últimos movimientos:</h3>
                <ul>
                  {cuenta.movimientos.map((movimiento, index) => (
                    <li key={index}>{movimiento}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
