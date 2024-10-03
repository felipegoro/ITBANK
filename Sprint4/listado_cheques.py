import csv
import sys
from datetime import datetime

# Función para leer los cheques desde el archivo CSV
def leer_cheques(archivo_csv):
    cheques = []
    with open(archivo_csv, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            cheques.append({
                'NroCheque': row['NroCheque'],
                'CodigoBanco': row['CodigoBanco'],
                'CodigoSucursal': row['CodigoSucursal'],
                'NumeroCuentaOrigen': row['NumeroCuentaOrigen'],
                'NumeroCuentaDestino': row['NumeroCuentaDestino'],
                'Valor': float(row['Valor']),
                'FechaOrigen': datetime.fromtimestamp(int(row['FechaOrigen'])),
                'FechaPago': datetime.fromtimestamp(int(row['FechaPago'])),
                'DNI': row['DNI'],
                'Estado': row['Estado']
            })
    return cheques

# Función para filtrar cheques por DNI, estado y rango de fechas
def filtrar_cheques(cheques, dni, estado=None, fecha_inicio=None, fecha_fin=None):
    filtrados = [c for c in cheques if c['DNI'] == dni]
    
    if estado:
        filtrados = [c for c in filtrados if c['Estado'].lower() == estado.lower()]

    if fecha_inicio and fecha_fin:
        fecha_inicio = datetime.strptime(fecha_inicio, '%Y-%m-%d')
        fecha_fin = datetime.strptime(fecha_fin, '%Y-%m-%d')
        filtrados = [c for c in filtrados if fecha_inicio <= c['FechaPago'] <= fecha_fin]

    return filtrados

# Función para validar si hay cheques repetidos
def validar_cheques_repetidos(cheques):
    vistos = set()
    for cheque in cheques:
        key = (cheque['NroCheque'], cheque['DNI'])
        if key in vistos:
            raise ValueError(f"Cheque repetido encontrado: NroCheque {cheque['NroCheque']} para DNI {cheque['DNI']}")
        vistos.add(key)

# Función para mostrar los cheques en pantalla
def mostrar_en_pantalla(cheques):
    print("NroCheque | CodigoBanco | CodigoSucursal | NumeroCuentaOrigen | NumeroCuentaDestino | Valor | FechaOrigen | FechaPago | DNI | Estado")
    for cheque in cheques:
        print(f"{cheque['NroCheque']} | {cheque['CodigoBanco']} | {cheque['CodigoSucursal']} | "
              f"{cheque['NumeroCuentaOrigen']} | {cheque['NumeroCuentaDestino']} | "
              f"{cheque['Valor']} | {cheque['FechaOrigen']} | {cheque['FechaPago']} | {cheque['DNI']} | {cheque['Estado']}")

# Función para exportar los cheques filtrados a un archivo CSV
def exportar_a_csv(cheques, dni):
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    nombre_archivo = f"{dni}_{timestamp}.csv"
    
    with open(nombre_archivo, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=cheques[0].keys())
        writer.writeheader()
        writer.writerows(cheques)
    
    print(f"Archivo CSV generado: {nombre_archivo}")

# Función principal
def main():
    # Comprobar que se pasen suficientes argumentos
    if len(sys.argv) < 4:
        print("Uso: python listado_cheques.py <archivo_csv> <DNI> <SALIDA> [<ESTADO>] [<FECHA_RANGO>]")
        sys.exit(1)

    # Leer argumentos desde la línea de comandos
    archivo_csv = sys.argv[1]
    dni = sys.argv[2]
    salida = sys.argv[3]
    estado = sys.argv[4] if len(sys.argv) > 4 else None
    fecha_rango = sys.argv[5] if len(sys.argv) > 5 else None

    # Leer los cheques desde el archivo CSV
    cheques = leer_cheques(archivo_csv)

    # Validar si hay cheques repetidos
    validar_cheques_repetidos(cheques)

    # Si se pasa un rango de fechas
    fecha_inicio, fecha_fin = None, None
    if fecha_rango:
        fecha_inicio, fecha_fin = fecha_rango.split(':')

    # Filtrar los cheques según los parámetros
    cheques_filtrados = filtrar_cheques(cheques, dni, estado, fecha_inicio, fecha_fin)

    # Salida según el parámetro especificado
    if salida.upper() == "PANTALLA":
        mostrar_en_pantalla(cheques_filtrados)
    elif salida.upper() == "CSV":
        exportar_a_csv(cheques_filtrados, dni)
    else:
        print("El parámetro de salida debe ser 'PANTALLA' o 'CSV'.")

if __name__ == "__main__":
    main()
