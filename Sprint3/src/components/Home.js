import React from 'react';
import '../app/styles/Home.css'; 



export const Home = () => {
  return (
    <div>
      <main>
        <div className="container">

            <div className="account-info">
                <div className="account-number">008-67894/2</div>
                <div className="account-type">CAJA DE AHORROS EN PESOS</div>
                <div className="balance">$ 750.000,00</div>
            </div>

            <div className="services">
                <div className="service">
                    <span className="service-name">servicio-telecentro</span>
                    <span className="service-amount">$ 12.575,99</span>
                    <span className="due-date">Vence el 17/09</span>
                    <button className="pay-button">Pagar</button>
                </div>
                <div className="service">
                    <span className="service-name">SUBE</span>
                    <button className="reload-button">cargar</button>
                </div>
            </div>

            <div className="shortcuts">
                <button className="shortcut">Transferencias</button>
                <button className="shortcut">Pago de servicios</button>
                <button className="shortcut">Inversiones</button>
                <button className="shortcut">Préstamos</button>
            </div>

            <div className="recent-movements">
                <h2>Últimos movimientos</h2>
                <ul>
                    <li>Compra con tarjeta de credito - Mercado Libre - 26 agosto 16:20hs</li>
                    <li>Transferencia recibida - De Mateo Orellana - 21 agosto 10:45hs</li>
                    <li>Constitución de plazo fijo UVA - 31 julio 08:00hs</li>
                </ul>
                <button className="view-all">Ver todos</button>
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