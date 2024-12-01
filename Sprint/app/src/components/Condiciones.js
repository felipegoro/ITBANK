import React from 'react';
import styles from './Condiciones.module.css';

function Condiciones() {
  return (
    <div>
      <div className={styles.Condiciones}>
        <h1 className={styles.TCondiciones}>Términos y Condiciones</h1>
        <h2>1. Aceptación de Términos</h2>
        <p>Al utilizar nuestro sitio web, acepta los términos y condiciones establecidos en este documento. Si no está de acuerdo con alguno de estos términos, por favor no utilice nuestro sitio.</p>
        <h2>2. Uso del Sitio</h2>
        <p>Usted se compromete a usar nuestro sitio web de manera legal y de acuerdo con todas las leyes aplicables. No debe utilizar el sitio para cualquier propósito ilegal o prohibido.</p>
        <h2>3. Propiedad Intelectual</h2>
        <p>Todo el contenido de nuestro sitio web, incluyendo texto, gráficos y software, está protegido por derechos de autor y otras leyes de propiedad intelectual. No puede reproducir, distribuir o modificar ningún contenido sin nuestra autorización.</p>
        <h2>4. Responsabilidad</h2>
        <p>No seremos responsables por cualquier daño que pueda resultar del uso o la incapacidad de usar nuestro sitio web.</p>
        <h2>5. Modificaciones</h2>
        <p>Podemos modificar estos términos y condiciones en cualquier momento. Cualquier cambio se publicará en esta página.</p>
      </div>
    </div>
  );
}

export default Condiciones;