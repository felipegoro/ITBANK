import Head from 'next/head';
import Login from '../components/Login';
import LoginForm from '../components/LoginForm';
import Fondo from '../components/Fondo';

const Loginn = () => (
  <>
    <Head />
      <title>Iniciar Sesión - BANK-ITO</title>
      <meta name="description" content="Inicia sesión en tu cuenta de BANK-ITO y accede a todos tus servicios bancarios en línea de manera segura y rápida." />
      
    <Login />
    <LoginForm />
    <Fondo />
  </>
);

export default Loginn;
