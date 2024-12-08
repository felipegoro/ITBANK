import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/common/Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerWave}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#0066ff" fillOpacity="0.2" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <h4 className={styles.title}>ITBANK</h4>
                    <p className={styles.subtitle}>Tu banco digital de confianza</p>
                </div>
                
                <div className={styles.footerSection}>
                    <h4 className={styles.title}>Enlaces Rápidos</h4>
                    <ul className={styles.linkList}>
                        <li><Link to="/about">Sobre Nosotros</Link></li>
                        <li><Link to="/contact">Contacto</Link></li>
                        <li><Link to="/help">Ayuda</Link></li>
                    </ul>
                </div>
                
                <div className={styles.footerSection}>
                    <h4 className={styles.title}>Contacto</h4>
                    <div className={styles.contactInfo}>
                        <p>Email: contacto@itbank.com</p>
                        <p>Teléfono: 0800-999-BANK</p>
                    </div>
                </div>
            </div>
            
            <div className={styles.footerBottom}>
                <p>&copy; {new Date().getFullYear()} ITBANK. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;