import React from 'react';
import styles from './Footer.module.css';
import { FaInstagram } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.grupo_1}>
            <div className={styles.box}>
                <figure>
                    <a href='#'>
                        <img src="/assets/logo3.png" alt="logo de BANK-ITO"></img>
                    </a>
                </figure>
            </div>
            
            <div className={styles.box}>
                <div className={styles.red_social}>
                <a href="https://www.instagram.com" target="_blank" className="ins">
                <FaInstagram />
                </a>
                <a href="https://www.twitter.com" target="_blank" className="tw">
                <FaTwitter />
                </a>
                <a href="https://www.googleplay.com" target="_blank" className="google_play">
                <FaGooglePlay />
                </a>
               <a href="https://www.appstore.com" target="_blank" className="apple_store">
               <FaApple />
                </a>
              </div> 
            </div>
            </div>
            <div className={styles.grupo_2}>
                <small>&copy; 2024 <b>BANK-ITO</b> - Todos los Derechos Reservados</small>
            </div>
        </footer>
    );
}

export default Footer;
