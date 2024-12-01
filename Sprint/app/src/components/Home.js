import React from 'react';
import styles from './Home.module.css';

export const Home = () => {
  
  const redirigirServicios = () => {
    window.location.href = '/servicios'; // Cambia '/servicios' a la URL deseada
  };

  return (
    <div>
      <main>
        <div className="container">
          <div className={styles.account_info}>
            <div className={styles.account_number}>008-67894/2</div>
            <div className={styles.account_type}>CAJA DE AHORROS EN PESOS</div>
            <div className={styles.balance}>$ 750.000,00</div>
          </div>

          <div className={styles.services}>
            <div className={styles.service}>
              <span className={styles.service_name}>servicio-telecentro</span>
              <span className={styles.service_amount}>$ 12.575,99</span>
              <span className={styles.due_date}>Vence el 17/09</span>
              <button className={styles.pay_button}>Pagar</button>
            </div>
            <div className={styles.service}>
              <span className={styles.service_name}>SUBE</span>
              <button className={styles.reload_button}>cargar</button>
            </div>
          </div>

          <div className={styles.shortcuts}>
            <a className={styles.shortcut} href='/transferencias'>Transferencias</a>
            <a className={styles.shortcut} href="/Servicios">Servicios</a>
            <a className={styles.shortcut}>Inversiones</a>
            <a className={styles.shortcut}>Préstamos</a>
          </div>

          <div className={styles.recent_movements}>
            <h2>Últimos movimientos</h2>
            <ul>
              <li>Compra con tarjeta de credito - Mercado Libre - 26 agosto 16:20hs</li>
              <li>Transferencia recibida - De Mateo Orellana - 21 agosto 10:45hs</li>
              <li>Constitución de plazo fijo UVA - 31 julio 08:00hs</li>
            </ul>
            <button className={styles.view_all}>Ver todos</button>
          </div>

          <form id="interestForm">
            <label htmlFor="monto">Monto inicial:</label>
            <input type="text" id="monto" name="monto" placeholder="Ingrese el monto inicial" required />

            <label htmlFor="fecha">Fecha de pago:</label>
            <input type="date" id="fecha" name="fecha" required />

            <button type="submit">Calcular Interés</button>
          </form>
          <div id="resultadoPrestamo"></div>
          <br />
          <form id="currencyConverter">
            <label htmlFor="montopesos">Monto a convertir:</label>
            <input type="number" id="montopesos" step="0.01" required />

            <label htmlFor="moneda">Selecciona la moneda:</label>
            <select id="moneda" required>
              <option value="Dolar Oficial">Dólar Oficial</option>
              <option value="Dolar Blue">Dólar Blue</option>
              <option value="Euro Oficial">Euro Oficial</option>
              <option value="Euro Blue">Euro Blue</option>
            </select>

            <button type="submit">Convertir</button>
          </form>

          <div id="resultadoConversion"></div>
        </div>
      </main>
    </div>
  );
};

export default Home;
