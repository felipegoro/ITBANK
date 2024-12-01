import React from 'react';
import styles from './LoginForm.module.css'; 

function LoginForm() {
    return (
        <div className={styles.login_container}>
            <form className={styles.login_form}>
                <h2>Iniciar sesión</h2>
                <label htmlFor="username">Usuario:</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default LoginForm;