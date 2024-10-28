import React from 'react';
import './Servicios.css';
function HistorialServicios({ setPagina }) {
  return (
    <div>
      <header className="header">
        <button onClick={() => setPagina('home')}>&lt; Cuentas y servicios</button>
        <h2>Cuentas y servicios</h2>
        <div className="tabs">
          <button onClick={() => setPagina('home')}>A pagar</button>
          <button className="active">Historial</button>
        </div>
      </header>
      <div className="content">
        <div className="card">
          <h3>Telecentro</h3>
          <p>Pago de servicio - $47,914.77</p>
          <p>Dinero disponible</p>
          <p>16/mar</p>
          <button>Ver más</button>
        </div>
      </div>
      <button className="button">Pagar una cuenta nueva</button>
    </div>
  );
}

export default HistorialServicios;