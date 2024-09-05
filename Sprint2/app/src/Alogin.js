import React from 'react';
import Fondo from './components/Fondo';
import Header from './components/Header';
import Login from './components/Login';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';



function App() {
    return (
        <div className="App">
            <Fondo />
            <Header />
            <Login />
            <LoginForm />
            <Footer />
        </div>
    );
}

export default App;