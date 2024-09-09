import React from 'react'
import "./Cuentas.css"

export const Cuentas = () => {
  return (
    <div>

    <div className="cuentas-container">
    <h1 className="cuentas-title">Tus Cuentas</h1>
    <div className="cuentas-list">
        <div className="cuenta-card">
            <h2>Cuenta Ahorros</h2>
            <p>Saldo: $5,000.00</p>
            <button className="cuenta-button">Ver Detalles</button>
        </div>
        <div className="cuenta-card">
            <h2>Cuenta Corriente</h2>
            <p>Saldo: $1,200.00</p>
            <button className="cuenta-button">Ver Detalles</button>
        </div>
        <div className="cuenta-card">
            <h2>Cuenta Plazo Fijo</h2>
            <p>Saldo: $10,000.00</p>
            <button className="cuenta-button">Ver Detalles</button>
        </div>
    </div>
</div>    
     </div>
  )
}
