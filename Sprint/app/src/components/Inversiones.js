import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './Inversiones.module.css';

const Inversiones = () => {
  const navigate = useNavigate(); 

  const handleContratar = () => {
    navigate('/Operaciones'); 
  };

  return (
    <div className={styles.inversiones_container}>
      <div className={styles.inicio}>
        <h1 className={styles.inversiones_title}>Inversiones</h1>
        <p className='descripcion'>Hacé crecer tu plata con BANK-ITO.</p>
      </div>
  
      <div className={styles.inversiones_content}>
        <div className={styles.inversion_card}>
          <h2>Plazo Fijo</h2>
          <p>Obtené intereses sobre tu inversión a un plazo fijo y asegurado.</p>
          <button className={styles.inversion_button} onClick={handleContratar}>Invertir</button>
        </div>
  
        <div className={styles.inversion_card}>
          <h2>Fondo Común de Inversión</h2>
          <p>Participa en un portafolio diversificado manejado por expertos.</p>
          <button className={styles.inversion_button} onClick={handleContratar}>Invertir</button>
        </div>
  
        <div className={styles.inversion_card}>
          <h2>Comprar Dolares</h2>
          <p>Protege tu dinero invirtiendo en una moneda extranjera segura.</p>
          <button className={styles.inversion_button} onClick={handleContratar}>Invertir</button>
        </div>
      </div>
    </div>
  );
};
export default Inversiones;