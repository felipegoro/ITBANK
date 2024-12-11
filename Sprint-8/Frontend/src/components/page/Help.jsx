import React from 'react';
import styles from '../../styles/pages/SharedStyles.module.css';

const Help = () => {
    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <h1 className={styles.title}>Centro de Ayuda</h1>

                <div className={styles.card}>
                    <h2 className={styles.sectionTitle}>Preguntas Frecuentes</h2>
                    <div>
                        <h3>¿Cómo puedo cambiar mi contraseña?</h3>
                        <p>Puede cambiar su contraseña desde la sección "Mi Perfil" en el menú principal.</p>

                        <h3>¿Cómo realizar una transferencia?</h3>
                        <p>Acceda a la sección "Transferencias" y siga los pasos indicados.</p>

                        <h3>¿Qué hacer si olvidé mi contraseña?</h3>
                        <p>Use la opción "Olvidé mi contraseña" en la página de inicio de sesión.</p>
                    </div>
                </div>

                <div className={styles.card}>
                    <h2 className={styles.sectionTitle}>Soporte Técnico</h2>
                    <p>Si necesita ayuda adicional, puede:</p>
                    <ul>
                        <li>Llamar al 0800-999-HELP (4357)</li>
                        <li>Enviar un email a soporte@itbank.com</li>
                        <li>Usar nuestro chat en línea</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Help;