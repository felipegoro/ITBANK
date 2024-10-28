import React, { createContext, useState, useEffect } from 'react';

export const CuentasContext = createContext();

export const CuentasProvider = ({ children }) => {
  const [cuentas, setCuentas] = useState([]);

  useEffect(() => {
    const fetchedCuentas = [
      {
        id: 1,
        nombre: 'Cuenta de Ahorros en Pesos',
        saldo: 5000.0,
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
        saldo: 18000.0,
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
    ];
    setCuentas(fetchedCuentas);
  }, []);

  const toggleDetalles = (id) => {
    setCuentas(cuentas.map((cuenta) =>
      cuenta.id === id
        ? { ...cuenta, mostrarDetalles: !cuenta.mostrarDetalles }
        : cuenta
    ));
  };

  return (
    <CuentasContext.Provider value={{ cuentas, toggleDetalles }}>
      {children}
    </CuentasContext.Provider>
  );
};
