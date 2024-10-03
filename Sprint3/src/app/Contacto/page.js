import Head from 'next/head';
import Contacto from '../components/Contacto';
import Formulario from '../components/Formulario';

const Contactoo = () => (
  <>
    <Head />
      <title>Contacto - BANK-ITO</title>
      <meta name="description" content="Ponte en contacto con BANK-ITO. Completa nuestro formulario para resolver tus dudas, consultas o comentarios sobre nuestros servicios." />
    
    <Formulario />
    <Contacto />
  </>
);

export default Contactoo;
