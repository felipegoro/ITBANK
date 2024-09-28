import React from 'react';
import Image from 'next/image';
import '../styles/Fondo.css';

function Fondo() {
    return (
        <div>
            <div className="fondo">
                <Image 
                    priority
                    src="/fondito.jpg" 
                    alt="Fondo decorativo" 
                    quality={100}
                    fill
                    sizes="100vw"
                    style={{
                    objectFit: 'cover',
                    }}
                />
            </div>
            
            <div className="image-container">
            <Image 
                    src="/feliz.jpeg" 
                    alt="Imagen de un usuario del banco realizando un pago desde su casa" 
                    width={700} 
                    height={500} 
                    sizes="100vw"
                    style={{
                    width: '100',
                    height: 'auto',
                    }}
                    loading="lazy"
                />
            </div>
        </div>
    );
}

export default Fondo;

