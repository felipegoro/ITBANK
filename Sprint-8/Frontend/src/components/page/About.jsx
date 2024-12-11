import React from 'react';
import styles from '../../styles/pages/SharedStyles.module.css';

const About = () => {
    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <h1 className={styles.title}>Sobre Nosotros</h1>
                
                <div className={styles.card}>
                    <h2 className={styles.sectionTitle}>¿Quiénes Somos?</h2>
                    <p>ITBANK es un banco digital innovador comprometido con proporcionar servicios financieros modernos y accesibles. Fundado con la visión de transformar la banca tradicional, nos esforzamos por ofrecer soluciones financieras que se adapten al estilo de vida digital de nuestros clientes.</p>
                </div>

                <div className={styles.card}>
                    <h2 className={styles.sectionTitle}>Nuestra Misión</h2>
                    <p>Facilitar la vida financiera de nuestros clientes a través de tecnología innovadora y servicios bancarios transparentes, seguros y fáciles de usar.</p>
                </div>

                <div className={styles.card}>
                    <h2 className={styles.sectionTitle}>Nuestros Valores</h2>
                    <ul>
                        <li>Innovación Continua</li>
                        <li>Transparencia</li>
                        <li>Seguridad</li>
                        <li>Compromiso con el Cliente</li>
                        <li>Responsabilidad Social</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;