import React from 'react';
import Link from 'next/link';
import '../styles/Header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <Link href="/login"><h1>BANK-&nbsp;ITO</h1></Link>
            </div>
            <nav className="main-nav">
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="../Personas">Personas</Link></li>
                    <li><Link href="../Empresas">Empresas</Link></li>
                    <li><Link href="../BancaOnline">Banca Online</Link></li>
                    <li className="dropdown">
                        <a href="#" className="dropbtn">Menu</a>
                        <div className="dropdown-content">
                            <Link href="../tarjetas">tarjetas</Link>
                            {/* <Link href="../Jubilados">Jubilados</Link> */}
                            {/* <Link href="../Emprendedores">Emprendedores</Link> */}
                            {/* <Link href="../Comercios">Comercios</Link> */}
                            <Link href="../Préstamos">Préstamos Online</Link>
                            <Link href="../Inversiones">Inversiones</Link>
                            <Link href="../Cuentas">Cuentas</Link>
                            <Link href="../Seguros">Seguros</Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
