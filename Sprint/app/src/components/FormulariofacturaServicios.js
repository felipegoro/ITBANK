import React, { useState } from 'react';
import styles from './Servicios.module.css';

function FormulariofacturaServicios({ setPagina }) {
  const [numeroFactura, setNumeroFactura] = useState('');
  const [monto, setMonto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje('Factura abonada');
  };

  return (
    <div>
      <header className={styles.header}>
        <button onClick={() => setPagina('configurar')}>&lt; Seleccionar empresa</button>
        <h2>Formulario de Pago</h2>
      </header>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Número de factura</label>
            <input
              type="text"
              value={numeroFactura}
              onChange={(e) => setNumeroFactura(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Monto</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              required
            />
          </div>
          <button type="submit">Aceptar</button>
        </form>
        {mensaje && <p>{mensaje}</p>}
      </div>
    </div>
  );
}

export default FormulariofacturaServicios;