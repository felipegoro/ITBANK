import Head from 'next/head';
import TarjetasContainer from '../components/Tarjetas';

const TarjetasPage = () => (
  <>
    <Head />
      <title>Tarjetas - BANK-ITO</title>
      <meta name="description" content="Explora las diferentes tarjetas de BANK-ITO, incluyendo tarjetas de crédito y débito, diseñadas para ofrecerte comodidad y seguridad en tus transacciones." />
   
    <TarjetasContainer />
  </>
);

export default TarjetasPage;
