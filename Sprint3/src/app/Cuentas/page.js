import Head from 'next/head';
import Confirmacion from '../components/Confirmacion';
import { Cuentas } from '../components/Cuentas';

const ConfirmacionPage = () => (
  <>
    <Head/>
      <title>Confirmación - BANK-ITO</title>
      <meta name="description" content="¡Contratación exitosa! Confirma que tu servicio ha sido contratado con éxito en BANK-ITO. Te mantendremos informado." />
    
    <Cuentas />
    <Confirmacion />
  </>
);

export default ConfirmacionPage;
