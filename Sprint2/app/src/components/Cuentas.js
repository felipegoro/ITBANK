import React, { useContext } from 'react';
import { CuentasContext } from '../context/CuentasContext'; 
import './Cuentas.css';

export const Cuentas = () => {
  const { cuentas, toggleDetalles } = useContext(CuentasContext); 

  return (
    <div className="cuentas-container">
      <div className='cuentas-title'>
        <h1>Tus Cuentas</h1>
        <p>Desde aquí puedes operar todas tus cuentas desde cualquier sitio, confía en nosotros, confía en BANK-ITO.</p>
      </div>

      <div className="cuentas-list">
        {cuentas.map(cuenta => (
          <div className="cuenta-card" key={cuenta.id}>
            <h2>{cuenta.nombre}</h2>
            <p>Saldo: ${cuenta.saldo.toFixed(2)}</p>
            <button 
              className="cuenta-button" 
              onClick={() => toggleDetalles(cuenta.id)}>
              {cuenta.mostrarDetalles ? 'Ocultar Detalles' : 'Ver Detalles'}
            </button>
            
            {cuenta.mostrarDetalles && (
              <div className="movimientos-detalles">
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
