ITBANK - Proyecto de Reporte de Transacciones

Este proyecto procesa las transacciones que vienen del sistema TPS y genera un reporte en HTML.

Estructura del Proyecto:

main.py Este es el archivo principal que organiza el flujo general. Las trancacciones de un archivo JSON (transacciones.json), las procesa para identificar rechazos, y genera el reporte HTML. Al ejecutarlo, se crea el HTML automáticamente.

Client.py Define la clase Client, que representa a cada cliente del banco. Contiene datos del cliente (nombre, apellido, DNI, dirección) y una lista de transacciones. Sirve para agrupar las transacciones bajo el cliente correspondiente.

Account.py Representa una cuenta bancaria de un cliente. 

Card.py Define la clase Card para las tarjetas de crédito del clientee.

Transaction.py Contiene la clase Transaction, que representa cada transacción de un cliente. La clase guarda datos como el tipo de transacción, su estado (aceptada o rechazada), monto, cuenta y razón de rechazo si aplica. Esta clase se usa para construir el reporte HTML.

Tests_Validar.py Archivo de pruebas unitarias. Lo ejecutamos para confirmar que todo funciona sin errores.

transacciones.json Archivo de entrada en formato JSON que contiene las transacciones del TPS. Cada entrada representa un cliente con una lista de transacciones que tienen detalles como estado, tipo, monto y razón de rechazo.

init.py Este archivo permite que Class_bank sea un paquete, para importar clases de varios módulos.

Asi funciona el flujo de trabajo

Carga de Datos: main.py llama a load_transactions() para cargar los datos desde transacciones.json.
Procesamiento de Transacciones: Se procesa cada cliente y sus transacciones, creando instancias de Client y Transaction.
Generación del Reporte: generate_html_report() produce el reporte en HTML, resaltando en rojo las transacciones rechazadas y en verde las aceptadas