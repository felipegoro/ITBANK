import React from 'react';
import styles from './Operaciones.module.css';

const Operaciones = () => {
  return (
    <div className={styles.Operaciones_container}>
      <h1>Operacion Exitosa!</h1>
      <p>La Operación ha sido realizada con éxito.</p>
      <a href="/Inversiones" className="Operaciones-button">Volver a Inversiones</a>
      

      <div className={styles.Operaciones_tips}>
        <h2>¿Qué hacer a continuación?</h2>
        <p>
          Gracias por operar con nosotros. Aquí tienes algunos consejos para seguir:
        </p>
        <ul>
          <li>Revisa tu correo electrónico para confirmar la operacion y sus detalles.</li>
          <li>Si necesitas hacer algún cambio, contacta con nuestro servicio de atención al cliente.</li>
          <li>Si te arrepientes de la operación, verifica nuestra política de cancelación en nuestro sitio web.</li>
          <li>Para cualquier otra consulta, visita nuestra sección de preguntas frecuentes o contáctanos directamente.</li>
        </ul>
      </div>
    </div>
  );
};

export default Operaciones;
