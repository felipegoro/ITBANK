
import './styles/Transferencias.scss';

import React, { useContext, useState } from 'react';
import { CuentasContext } from '../context/CuentasContext';

function Transferencias() {
  const { cuentas } = useContext(CuentasContext);
  
  const [fromAccount, setFromAccount] = useState(''); 
  const [toAccount, setToAccount] = useState(''); 
  const [amount, setAmount] = useState(''); 
  const [message, setMessage] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fromAccount === '' || toAccount === '' || amount <= 0) {
      setMessage('Por favor, completa todos los campos correctamente.');
      return;
    }

    console.log(`Transferencia de ${amount} desde la cuenta ${fromAccount} a la cuenta ${toAccount}`);

    setFromAccount('');
    setToAccount('');
    setAmount('');
    setMessage('¡Transferencia realizada con éxito!');
  };

  return (
    <div className="transferencias-container">
      <h1>Realizar Transferencia</h1>
      <form onSubmit={handleSubmit}>
        {/* Selección de cuenta de origen */}
        <div>
          <label>Cuenta de origen:</label>
          <select
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
            required
          >
            <option value="">Selecciona una cuenta</option>
            {cuentas.map((cuenta) => (
              <option key={cuenta.id} value={cuenta.nombre}>
                {cuenta.nombre} (Saldo: ${cuenta.saldo.toFixed(2)})
              </option>
            ))}
          </select>
        </div>

        {/* Selección de cuenta de destino */}
        <div>
          <label>Cuenta de destino:</label>
          <input
            type="text"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
            placeholder="Cuenta de destino"
            required
          />
        </div>

        {/* Monto de la transferencia */}
        <div>
          <label>Monto a transferir:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Monto"
            required
          />
        </div>

        {/* Botón de envío */}
        <button type="submit">Transferir</button>
      </form>

      {/* Mensaje de confirmación */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Transferencias;


