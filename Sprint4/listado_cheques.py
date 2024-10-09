import csv
import time

# Abrir el archivo CSV en modo lectura
with open('cheques.csv', 'r') as f:
    csv_reader = csv.DictReader(f)
    data = list(csv_reader)

fieldnames = csv_reader.fieldnames

# Función para exportar cheques a CSV
def exportar_a_csv(data, DNI):
    timestamp = int(time.time())
    output_csv = f"{DNI}_{timestamp}.csv"
    
    with open(output_csv, "w") as f:
        csv_writer = csv.DictWriter(f, fieldnames=fieldnames)
        csv_writer.writeheader()
        csv_writer.writerows(data)
    
    print(f"Archivo exportado exitosamente: {output_csv}")

# Función para filtrar cheques
def filtrar_cheques(cheques, DNI, tipo_cheque, estado=None):
    filtrados = []
    
    for cheque in cheques:
        if cheque["DNI"] == str(DNI) and cheque["TipoCheque"].upper() == tipo_cheque.upper():
            if estado is None or cheque["Estado"].upper() == estado.upper():
                filtrados.append(cheque)
    
    return filtrados

# Función para ingresar los datos del filtro
def ingresar_datos_filtro():
    while True:
        DNI = input("Ingrese su DNI: ")
        if DNI.isdigit() and len(DNI) == 8:
            break
        else:
            print("El DNI debe contar con 8 dígitos, por favor vuelva a intentarlo.")
    
    while True:
        tipo_cheque = input("Tipo de Cheque (EMITIDO o DEPOSITADO): ")
        if tipo_cheque.upper() in ["EMITIDO", "DEPOSITADO"]:
            break
        else:
            print("El tipo de cheque debe ser EMITIDO o DEPOSITADO.")
    
    while True:
        estado = input("Estado del Cheque (PENDIENTE, APROBADO, RECHAZADO) o ingrese X para omitir: ")
        if estado.upper() in ["PENDIENTE", "APROBADO", "RECHAZADO", "X"]:
            if estado.upper() == "X":
                estado = None
            break
        else:
            print("El estado debe ser PENDIENTE, APROBADO, RECHAZADO o X para omitir.")
    
    return DNI, tipo_cheque, estado

# Función para mostrar el menú
def menu_de_opciones():
    print("---- Menú de opciones ----")
    print("1. Filtrar cheques")
    print("2. Exportar cheques a CSV")
    print("3. Salir del programa")
    return input("Elige una opción: ")

# Bucle del menú
while True:
    opcion = menu_de_opciones()
    
    if opcion == "1":
        # Filtrar cheques
        DNI, tipo_cheque, estado = ingresar_datos_filtro()
        filtrados = filtrar_cheques(data, DNI, tipo_cheque, estado)
        
        if filtrados:
            for cheque in filtrados:
                print(cheque)
        else:
            print("No se encontraron cheques que coincidan con las características.")
    
    elif opcion == "2":
        # Exportar cheques a CSV
        DNI, tipo_cheque, estado = ingresar_datos_filtro()
        filtrados = filtrar_cheques(data, DNI, tipo_cheque, estado)
        
        if filtrados:
            exportar_a_csv(filtrados, DNI)
        else:
            print("No se encontraron cheques que coincidan con las características.")
    
    elif opcion == "3":
        # Salir del programa
        print("Salió con éxito del programa.")
        break
    
    else:
        print("Esa opción no es válida. Por favor elija una opción del menú.")
