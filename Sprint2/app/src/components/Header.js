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
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Personas</a></li>
                    <li><a href="#">Empresas</a></li>
                    <li><a href="#">Banca Online</a></li>
                    <li className="dropdown">
                        <a href="#" className="dropbtn">Menu</a>
                        <div className="dropdown-content">
                            <a href="#">Tarjetas</a>
                            <a href="#">Jubilados</a>
                            <a href="#">Emprendedores</a>
                            <a href="#">Comercios</a>
                            <a href="#">Préstamos Online</a>
                            <a href="#">Inversiones</a>
                            <a href="#">Cuentas</a>
                            <a href="#">Seguros</a>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;