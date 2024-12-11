import React from 'react';
import styles from '../../styles/pages/SharedStyles.module.css';

const Contact = () => {
    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <h1 className={styles.title}>Contacto</h1>

                <div className={styles.card}>
                    <h2 className={styles.sectionTitle}>Información de Contacto</h2>
                    <div>
                        <h3>Teléfono</h3>
                        <p>0800-999-BANK (2265)</p>
                        
                        <h3>Email</h3>
                        <p>contacto@itbank.com</p>
                        
                        <h3>Horario de Atención</h3>
                        <p>Lunes a Viernes: 8:00 - 20:00</p>
                        <p>Sábados: 9:00 - 13:00</p>
                    </div>
                </div>

                <div className={styles.card}>
                    <h2 className={styles.sectionTitle}>Redes Sociales</h2>
                    <div>
                        <p>Síguenos en nuestras redes sociales:</p>
                        <ul>
                            <li>Facebook: /ITBANKoficial</li>
                            <li>Twitter: @ITBANK</li>
                            <li>Instagram: @ITBANK_ar</li>
                            <li>LinkedIn: ITBANK</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;