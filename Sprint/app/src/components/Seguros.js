import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from "./Seguros.module.css"

const Seguros = () => {
  const navigate = useNavigate(); 

  const handleContratar = () => {
    navigate('/confirmacion'); 
  };

  return (
    <div className={styles.seguros_container}>
      <div className={styles.inicio}>
        <h1 className={styles.seguros_title}>Seguros BANK-ITO</h1>
        <p className={styles.descripcion}>Conta con un respaldo digno y seguro para usted y su familia. Conta con nosotros, conta con BANK-ITO.</p>
        <p className={styles.descripcion}>Estos son nuestros seguros que tenemos disponibles:</p>
      </div>

      <div className={styles.seguros_list}>
        <div className={styles.seguro_card}>
          <h2>Seguro de Vida</h2>
          <p>Cubre a tu familia en caso de algún imprevisto grave.</p>
          <button className={styles.seguro_button} onClick={handleContratar}>Contratar</button>
        </div>

        <div className={styles.seguro_card}>
          <h2>Seguro de Salud</h2>
          <p>Te cubre de algún accidente muy grave en tu salud o la de otra persona.</p>
          <button className={styles.seguro_button} onClick={handleContratar}>Contratar</button>
        </div>

        <div className={styles.seguro_card}>
          <h2>Seguro de Hogar</h2>
          <p>Protege tu vivienda contra robos, incendios y daños.</p>
          <button className={styles.seguro_button} onClick={handleContratar}>Contratar</button>
        </div>

        <div className={styles.seguro_card}>
          <h2>Seguro de Desempleo</h2>
          <p>Te cubre de un desempleo inesperado en tu vida.</p>
          <button className={styles.seguro_button} onClick={handleContratar}>Contratar</button>
        </div>

        <div className={styles.seguro_card}>
          <h2>Seguro de Auto</h2>
          <p>Garantiza la protección de tu vehículo en caso de accidente o robo.</p>
          <button className={styles.seguro_button} onClick={handleContratar}>Contratar</button>
        </div>

        <div className={styles.seguro_card}>
          <h2>Seguro de Responsabilidad Civil</h2>
          <p>Cubre daños que una persona pueda causar a terceros.</p>
          <button className={styles.seguro_button} onClick={handleContratar}>Contratar</button>
        </div>

        <div className={styles.seguro_card}>
          <h2>Seguro de Viaje</h2>
          <p>Cubre incidentes relacionados con viajes.</p>
          <button className={styles.seguro_button} onClick={handleContratar}>Contratar</button>
        </div>

        <div className={styles.seguro_card}>
          <h2>Seguro de Accidentes Personales</h2>
          <p>Cubre lesiones por accidentes.</p>
          <button className={styles.seguro_button} onClick={handleContratar}>Contratar</button>
        </div>
      </div>
    </div>
  );
};

export default Seguros;
