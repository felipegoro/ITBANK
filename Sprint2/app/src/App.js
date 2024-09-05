import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Fondo from './components/Fondo';
import Header from './components/Header';
import Login from './components/Login';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Home from './components/Home';



function App() {
  return (
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
      </Routes>
    </Router>
  );
}

export default App;
