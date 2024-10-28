
import React, { useState } from 'react';
import HistorialServicios from './HistorialServicios';
import ConfigurarcuentaServicios from './ConfigurarcuentaServicios';
import './Servicios.css';

function Servicios() {


  return (
    <div className="Servicios">
      
        <div>
            <h2>Cuentas y servicios</h2>
            <div className="tabs">
              <a className="active" href='/servicios'> pagar</a>
              <a className="active" href='/HistorialServicios'> historial</a>
            </div>
          <div className="content">
            <div className="card">
              <p>¡Estás al día con tus cuentas y servicios!</p>
            </div>
            <div className="card">
              <h1>Configurá tus cuentas</h1>
              <a>Podrás configurar un recordatorio para no olvidar los vencimientos.</a>
              <a href="/ConfigurarcuentaServicios">Configurar Cuenta </a>
            </div>
          </div>
          <a className="button" href='/FormulariofacturaServicios'>Pagar una cuenta nueva</a>
        </div>
      

    </div>
  );
}

export default Servicios;
