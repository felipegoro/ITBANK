import React from 'react';
import styles from './Login.module.css'; 

function Login() {
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form}>
        <h2>Bienvenido a BANK-ITO</h2>
        <p>Maneja tus cuentas, transfiere tu dinero de forma segura, disponibilidad todos los días, justo desde aquí.</p>
      </div>
    </div>
  );
}

export default Login;