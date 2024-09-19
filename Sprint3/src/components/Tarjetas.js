"use client";

import React, { useState } from 'react';
import '../app/styles/Tarjetas.css'; 

function Tarjetas({ marca, numero, cuenta, limite, vencimiento }) {
  const [showNumber, setShowNumber] = useState(false);

  const Visibility = () => {
    setShowNumber(!showNumber);
  };

  return (
    <div className="Tarjetas">
      <div className="marca">{marca}</div>
      <div className="button-container">
        <div className="number"> {showNumber ? numero : '**** **** **** ****'} </div>
        <button onClick={Visibility}> {showNumber ? 'ø' : 'o'} </button>
        </div>
      <div className="account-number">Cuenta: {cuenta}</div>
      <div className="limite">Límite: {limite}</div>
      <div className="vencimiento">{vencimiento}</div>
    </div>
  );
}

export default function TarjetasContainer() {
  return (
    <section>
      <h1 className="Tar">Tarjetas</h1>
      <h1 className="Debito">Tarjetas de Débito</h1>
      <div className="tarjetas-container">
        <Tarjetas 
          marca="VISA" 
          numero="5500 0000 0000 0040" 
          cuenta="008-67894/2" 
          limite="$200.000,00" 
          vencimiento="11/28" 
        />
      </div>
      <h1 className="Credito">Tarjetas de Crédito</h1>
      <div className="tarjetas-container">
        <Tarjetas 
          marca="MasterCard" 
          numero="3782 8220 0463 1005" 
          cuenta="123-45678/9" 
          limite="$300.000,00" 
          vencimiento="12/29" 
        />
        <Tarjetas 
          marca="American Express" 
          numero="7011 0000 0004 6010" 
          cuenta="987-65432/1" 
          limite="$500.000,00" 
          vencimiento="01/30" 
        />
      </div>
    </section>
  );
}