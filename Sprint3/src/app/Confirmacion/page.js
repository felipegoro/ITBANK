import Head from 'next/head';
import Confirmacion from '../components/Confirmacion';

const ConfirmacionPage = () => (
  <>
    <Head />
      <title>Confirmación - BANK-ITO</title>
      <meta name="description" content="La contratación de tu seguro fue exitosa. Gracias por confiar en BANK-ITO." />

    <Confirmacion />
  </>
);

export default ConfirmacionPage;
