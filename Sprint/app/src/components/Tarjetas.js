import React, { useState } from 'react';
import styles from './Tarjetas.module.css'; 

function Tarjetas({ marca, numero, cuenta, limite, vencimiento }) {
  const [showNumber, setShowNumber] = useState(false);

  const Visibility = () => {
    setShowNumber(!showNumber);
  };

  return (
    <div className={styles.Tarjetas}>
      <div className={styles.marca}>{marca}</div>
      <div className={styles.button_container}>
        <div className={styles.number}> {showNumber ? numero : '**** **** **** ****'} </div>
        <button onClick={Visibility}> {showNumber ? 'ø' : 'o'} </button>
        </div>
      <div className={styles.account_number}>Cuenta: {cuenta}</div>
      <div className={styles.limite}>Límite: {limite}</div>
      <div className={styles.vencimiento}>{vencimiento}</div>
    </div>
  );
}

export default function TarjetasContainer() {
  return (
    <section>
      <h1 className={styles.Tar}>Tarjetas</h1>
      <h1 className={styles.Debito}>Tarjetas de Débito</h1>
      <div className={styles.tarjetas_container}>
        <Tarjetas 
          marca="VISA" 
          numero="5500 0000 0000 0040" 
          cuenta="008-67894/2" 
          limite="$200.000,00" 
          vencimiento="11/28" 
        />
      </div>
      <h1 className={styles.Credito}>Tarjetas de Crédito</h1>
      <div className={styles.tarjetas_container}>
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