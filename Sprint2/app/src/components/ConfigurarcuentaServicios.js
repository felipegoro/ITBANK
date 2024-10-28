import React from 'react';
import FormulariofacturaServicios from './FormulariofacturaServicios';
import './Servicios.css';
import HistorialServicios from './HistorialServicios';

function ConfigurarcuentaServicios({ setPagina }) {
  const empresas = ['Telecentro', 'Movistar', 'Personal', 'Edesur'];

  return (
    <div>
      <header className="header">
        <button onClick={() => setPagina('home')}>&lt; Cuentas y servicios</button>
        <h2>Pagar una cuenta nueva</h2>
      </header>
      <div className="content">
        <input type="text" placeholder="Buscá la empresa a abonar" />
        <div className="empresas">
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