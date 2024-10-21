from Clien import Client
from ProcesadorTPS import ProcesadorTPS
from Report import Report
import json

def leer_json(ruta_archivo):
    with open(ruta_archivo, 'r') as archivo:
        return json.load(archivo)

def main():
    # Leer los datos del archivo JSON de un cliente, por ejemplo el cliente Classic
    datos_cliente = leer_json('transaciones_clasic.json')
    
    # Crear el cliente a partir de los datos
    cliente = Client(datos_cliente['nombre'], datos_cliente['apellido'], datos_cliente['DNI'], datos_cliente['tipo'])
    
    # Procesar las transacciones del cliente
    procesador = ProcesadorTPS(cliente)
    procesador.procesar_transacciones(datos_cliente['transacciones'])
    
    # Generar el reporte HTML
    reporte = Report(cliente)
    reporte.generar_html('reporte.html')

if __name__ == "__main__":
    main()

