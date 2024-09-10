import React, { useState } from 'react';
import './Cuentas.css';

export const Cuentas = () => {
  const [cuentas, setCuentas] = useState([
    {
      id: 1,
      nombre: 'Cuenta de Ahorros en Pesos',
      saldo: 5000.00,
      movimientos: [
        'Pago de servicios - $1,000',
        'Depósito - $2,000',
        'Transferencia recibida - $500',
      ],
      mostrarDetalles: false,
    },
    {
      id: 2,
      nombre: 'Cuenta de Ahorros en Dólares',
      saldo: 18000.00,
      movimientos: [
        'Transferencia enviada - $500',
        'Compra con tarjeta - $300',
        'Depósito - $2,000',
      ],
      mostrarDetalles: false,
    },
    {
      id: 3,
      nombre: 'Cuenta Corriente',
      saldo: 1200.00,
      movimientos: [
        'Pago de tarjeta de crédito - $200',
        'Transferencia enviada - $500',
        'Depósito - $1,000',
      ],
      mostrarDetalles: false,
    },
    {
      id: 4,
      nombre: 'Cuenta Sueldo',
      saldo: 10000.00,
      movimientos: [
        'Cobro de sueldo - $10,000',
        'Pago de alquiler - $1,500',
        'Transferencia a otra cuenta - $2,000',
      ],
      mostrarDetalles: false,
    },
    {
      id: 5,
      nombre: 'Cuenta Ahorro Universal',
      saldo: 40000.00,
      movimientos: [
        'Depósito - $5,000',
        'Transferencia recibida - $10,000',
        'Compra con tarjeta - $1,000',
      ],
      mostrarDetalles: false,
    },
    {
      id: 6,
      nombre: 'Cuenta Inversión',
      saldo: 14030.20,
      movimientos: [
        'Compra de acciones - $500',
        'Depósito - $2,000',
        'Venta de bonos - $1,500',
      ],
      mostrarDetalles: false,
    },
  ]);

  const toggleDetalles = (id) => {
    setCuentas(cuentas.map(cuenta => 
      cuenta.id === id 
        ? { ...cuenta, mostrarDetalles: !cuenta.mostrarDetalles } 
        : cuenta
    ));
  };

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
