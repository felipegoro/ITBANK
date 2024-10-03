import Head from 'next/head';
import Seguros from '../components/Seguros';

const SegurosPage = () => (
  <>
    <Head />
      <title>Seguros - BANK-ITO</title>
      <meta name="description" content="Descubre nuestros seguros disponibles en BANK-ITO. Ofrecemos opciones de seguros de vida, salud, hogar y más para protegerte a ti y a tu familia." />
    
    <Seguros />
  </>
);

export default SegurosPage;
