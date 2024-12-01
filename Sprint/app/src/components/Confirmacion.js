import React from 'react';
import styles from './Confirmacion.module.css';

const Confirmacion = () => {
  return (
    <div className={styles.confirmacion_container}>
      <h1>¡Contratación Exitosa!</h1>
      <p>El servicio ha sido contratado con éxito. Nos comunicaremos con usted en las próximas horas.</p>
      <a href="/seguros" className="confirmacion-button">Volver a Seguros</a>
      

      <div className={styles.confirmacion_tips}>
        <h2>¿Qué hacer a continuación?</h2>
        <p>
          Gracias por contratar nuestro servicio. Aquí tienes algunos consejos para seguir:
        </p>
        <ul>
          <li>Revisa tu correo electrónico para confirmar la recepción de la contratación y los detalles del servicio.</li>
          <li>Si necesitas hacer algún cambio en tu contrato, contacta con nuestro servicio de atención al cliente.</li>
          <li>Si te arrepientes de la contratación, verifica nuestra política de cancelación en nuestro sitio web.</li>
          <li>Para cualquier otra consulta, visita nuestra sección de preguntas frecuentes o contáctanos directamente.</li>
        </ul>
      </div>
    </div>
  );
};

export default Confirmacion;
