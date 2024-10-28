import React, { useState } from 'react';
import './Header.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPersonStanding } from 'react-icons/bs';
import { IoBusiness, IoCardOutline } from 'react-icons/io5';
import { TbOld } from 'react-icons/tb';
import { GrMoney } from 'react-icons/gr';
import { MdOutlineSecurity } from 'react-icons/md';

function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const toggleSubmenu = (menu) => {
        setOpenSubmenu(openSubmenu === menu ? null : menu);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <header className="header-top">
                <div className="desplegable">
                    <a href="#" onClick={toggleSidebar}><GiHamburgerMenu/></a>
                </div> 
                <a className="logo" href="/login">
                    <h1>BANK-&nbsp;ITO</h1>
                </a>
                <div className="ba">
                    <a href="/home">Banca Online</a>
                </div>
            </header>

            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <h3>Menu</h3>
                <ul className="menu">
                    <li>
                        <a href="/Seguros"><MdOutlineSecurity /> Seguros</a>
                    </li>
                    <li>
                        <a href="/Jubilados"><TbOld />Jubilados</a>
                    </li>
                    <li>
                        <a href="/Inversiones"><GrMoney /> Inversiones</a>
                    </li>
                    <li>
                        <a href="/tarjetas"><IoCardOutline /> Tarjetas</a>
                    </li>
                    <li>
                        <a href="/Cuentas"><BsPersonStanding /> Personas</a>
                    </li>
                    <li>
                        <a href="/Empresas"><IoBusiness /> Empresas</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
