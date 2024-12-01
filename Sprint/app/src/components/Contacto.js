import React from 'react';
import styles from './Contacto.module.css';

function Contacto() {
  return (
    <div className={styles.Contacto}>
      <h1 className={styles.TContacto}>Información de Contacto</h1>
      <h3>Para cualquier consulta o asistencia, por favor, contacta con nosotros a través de los siguientes medios:</h3>
      <p>
        <strong>Correo Electrónico:</strong> <a href="mailto:contacto@bank-ito.com" target="_blank">contacto@bank-ito.com</a>
      </p>
      <p>
        <strong>Teléfono:</strong> <a href="tel:+541112345678" target="_blank">+54 11 1234-5678</a>
      </p>
      <p>
        <strong>Dirección:</strong> <a href="https://www.google.com/maps?q=Av.+Libertador+1234,+CABA,+Argentina" target="_blank">Av. Libertador 1234, CABA, Argentina</a>
      </p>
    </div>
  );
}

export default Contacto;