import React from 'react';
import styles from './Privacidad.module.css'; 

function Privacidad() {
  return (
    <div>
      <div className={styles.Privacidad}>
        <h1 className={styles.TPrivacidad}>Políticas de Privacidad</h1>
        <h2>1. Introducción</h2>
        <p>En BANK-ITO, nos comprometemos a proteger su privacidad. Esta política de privacidad explica cómo recopilamos, usamos y compartimos su información personal.</p>
        <h2>2. Información que Recopilamos</h2>
        <p>Recopilamos información personal que nos proporciona al registrarse en nuestro sitio, como nombre, dirección de correo electrónico y datos de contacto.</p>
        <h2>3. Uso de la Información</h2>
        <p>Utilizamos la información que recopilamos para proporcionarle nuestros servicios, mejorar la calidad de nuestros productos y comunicarnos con usted.</p>
        <h2>4. Compartición de la Información</h2>
        <p>No compartimos su información personal con terceros sin su consentimiento, excepto cuando sea necesario para proporcionar nuestros servicios.</p>
        <h2>5. Seguridad</h2>
        <p>Tomamos medidas razonables para proteger su información personal contra el acceso no autorizado y el uso indebido.</p>
        <h2>6. Cambios a esta Política</h2>
        <p>Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos sobre cualquier cambio significativo mediante la publicación de la nueva política en nuestro sitio web.</p>
      </div>
    </div>
  );
}

export default Privacidad;