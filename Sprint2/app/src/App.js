import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Fondo from './components/Fondo';
import Header from './components/Header';
import Login from './components/Login';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Home from './components/Home';
import Seguros from './components/Seguros';
import { Cuentas } from './components/Cuentas';
import Inversiones from './components/Inversiones';
import TarjetasContainer from './components/Tarjetas';
import Privacidad from './components/Privacidad';
import Condiciones from './components/Condiciones';
import Contacto from './components/Contacto';
import Confirmacion from './components/Confirmacion'; 
import Operaciones from './components/Operaciones'; 
import Transferencias from './components/Transferencias';
import { CuentasProvider } from './context/CuentasContext'; 

function App() {
  return (
    <CuentasProvider>
    <Router>
      <Routes>
        <Route path="/login" element={
          <>
            <Fondo />
            <Header />
            <Login />
            <LoginForm />
            <Footer />
          </>
        } />
        <Route path="/home" element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        } />
    
        <Route path="/" element={
          <>
            <Fondo />
            <Header />
            <Login />
            <LoginForm />
            <Footer />
          </>
        } />

        <Route path="Personas" element={
          <>
            <Header />
            <Footer />
          </>
        } />

        <Route path="Empresas" element={
          <>
            <Header />
            <Footer />
          </>
        } />

        <Route path="BancaOnline" element={
          <>
            <Header />
            <Footer />
          </>
        } />

        <Route path="Privacidad" element={
          <>
            <Header />
            <Privacidad />
            <Footer />
          </>
        } />

        <Route path="Condiciones" element={
          <>
            <Header />
            <Condiciones />
            <Footer />
          </>
        } />

        <Route path="Contacto" element={
          <>
            <Header />
            <Contacto />
            <Footer />
          </>
        } />

        <Route path="Cuentas" element={
          <>
            <Header />
            <Cuentas />
            <Footer />
          </>
        } />

        <Route path="Seguros" element={
          <>
            <Header />
            <Seguros />
            <Footer />
          </>
        } />

        <Route path="confirmacion" element={
          <>
            <Header />
            <Confirmacion />
            <Footer />
          </>
        } />

        <Route path="Operaciones" element={
          <>
            <Header />
            <Operaciones />
            <Footer />
          </>
        } />

        <Route path="Inversiones" element={
          <>
            <Header />
            <Inversiones />
            <Footer />
          </>
        } />

        <Route path="TarjetasContainer" element={
          <>
            <Header />
            <TarjetasContainer/>
            <Footer />
          </>
        } />

        <Route path="Transferencias" element={
          <>
            <Header />
            <Transferencias />
            <Footer />
          </>
        } />
        
      </Routes>
    </Router>
    </CuentasProvider>
  );
}

export default App;
