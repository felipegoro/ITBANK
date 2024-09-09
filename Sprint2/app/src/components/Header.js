import React from 'react';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">
            <a href="/login"><h1>BANK-&nbsp;ITO</h1></a>
            </div>
            <nav className="main-nav">
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/Personas">Personas</a></li>
                    <li><a href="/Empresas">Empresas</a></li>
                    <li><a href="/BancaOnline">Banca Online</a></li>
                    <li className="dropdown">
                        <a href="#" className="dropbtn">Menu</a>
                        <div className="dropdown-content">
                            <a href="/TarjetasContainer">Tarjetas</a>
                            <a href="/Jubilados">Jubilados</a>
                            <a href="/Emprendedores">Emprendedores</a>
                            <a href="/Comercios">Comercios</a>
                            <a href="/Préstamos">Préstamos Online</a>
                            <a href="/Inversiones">Inversiones</a>
                            <a href="/Cuentas">Cuentas</a>
                            <a href="/Seguros">Seguros</a>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;