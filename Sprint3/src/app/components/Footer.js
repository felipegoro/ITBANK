import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className='all'>
            <div className="left">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <Image
                        loading="lazy"
                        src="/instagram.png"
                        alt="Botón: Enlace a Instagram"
                        width={24}
                        height={24}
                    />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <Image
                        loading="lazy"
                        src="/x.png"
                        alt="Botón: Enlace a X (Twitter)"
                        width={24}
                        height={24}
                    />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                    <Image
                        loading="lazy"
                        src="/youtube.png"
                        alt="Botón: Enlace a YouTube"
                        width={24}
                        height={24}
                    />
                </a>
            </div>

            <div className="center">
                <Link href="/Privacidad">Políticas de privacidad</Link>
                <Link href="/Condiciones">Términos y condiciones</Link>
                <Link href="/Contacto">Información de contacto</Link>
                <p>&copy; 2024 BANK-ITO. Todos los derechos reservados.</p>
            </div>

            <div className="right">
                <a href="https://www.googleplay.com" target="_blank" rel="noopener noreferrer">
                    <Image
                        loading="lazy"
                        src="/google_play.png"
                        alt="Botón: Descargar en Google Play"
                        width={100}
                        height={30}
                    />
                </a>
                <a href="https://www.appstore.com" target="_blank" rel="noopener noreferrer">
                    <Image
                        loading="lazy"
                        src="/apple_store.png"
                        alt="Botón: Descargar en App Store"
                        width={100}
                        height={30}
                    />
                </a>
            </div>
        </footer>
    );
}

export default Footer;