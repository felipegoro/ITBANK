import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className='all'>
            <div className="left">
                <a href="https://www.instagram.com" target="_blank" >
                    <img src="assets/instagram.png" alt="Botón: Enlace a Instagram"/>
                </a>
                <a href="https://www.twitter.com" target="_blank" >
                    <img src="assets/x.png" alt="Botón: Enlace a X (Twitter)"/>
                </a>
                <a href="https://www.youtube.com" target="_blank" >
                    <img className="yt" src="assets/youtube.png" alt="Botón: Enlace a YouTube"/>
                </a>
            </div>

            <div className="center">
                <a href="pdp.html">Políticas de privacidad</a>
                <a href="tc.html">Términos y condiciones</a>
                <a href="ic.html">Información de contacto</a>
                <p>&copy; 2024 BANK-ITO. Todos los derechos reservados.</p>
            </div>

            <div className="right">
                <a href="https://www.googleplay.com" target="_blank" >
                    <img className="google_play" src="assets/google_play.png" alt="Botón: Descargar en Google Play"/>
                </a>
                <a href="https://www.appstore.com" target="_blank" >
                    <img className="apple_store" src="assets/apple_store.png" alt="Botón: Descargar en App Store"/>
                </a>
            </div>
        </footer>
    );
}

export default Footer;
