"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; 
import '../styles/Inversiones.css';

const Inversiones = () => {
  const router = useRouter(); 

  const handleContratar = () => {
    router.push('/Operaciones');
  };

  return (
    <div className="inversiones-container">
      <div className='inicio'>
        <h1 className="inversiones-title">Inversiones</h1>
        <p className='descripcion'>Hacé crecer tu plata con BANK-ITO.</p>
      </div>
  
      <div className="inversiones-content">
        <div className="inversion-card">
          <h2>Plazo Fijo</h2>
          <p>Obtené intereses sobre tu inversión a un plazo fijo y asegurado.</p>
          <button className="inversion-button" onClick={handleContratar}>Invertir</button>
        </div>
  
        <div className="inversion-card">
          <h2>Fondo Común de Inversión</h2>
          <p>Participa en un portafolio diversificado manejado por expertos.</p>
          <button className='inversion-button' onClick={handleContratar}>Invertir</button>
        </div>
  
        <div className="inversion-card">
          <h2>Comprar Dolares</h2>
          <p>Protege tu dinero invirtiendo en una moneda extranjera segura.</p>
          <button className="inversion-button" onClick={handleContratar}>Invertir</button>
        </div>
      </div>
    </div>
  );
};
export default Inversiones;