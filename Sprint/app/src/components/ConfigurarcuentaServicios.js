import React from 'react';
import FormulariofacturaServicios from './FormulariofacturaServicios';
import styles from './Servicios.module.css';
import HistorialServicios from './HistorialServicios';

function ConfigurarcuentaServicios({ setPagina }) {
  const empresas = ['Telecentro', 'Movistar', 'Personal', 'Edesur'];

  return (
    <div>
      <header className={styles.header}>
        <button onClick={() => setPagina('home')}>&lt; Cuentas y servicios</button>
        <h2>Pagar una cuenta nueva</h2>
      </header>
      <div className={styles.content}>
        <input type="text" placeholder="Buscá la empresa a abonar" />
        <div className={styles.empresas}>
          {empresas.map((empresa) => (
            <button key={empresa} onClick={() => setPagina('formulario')}>
              {empresa}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
 
export default ConfigurarcuentaServicios;