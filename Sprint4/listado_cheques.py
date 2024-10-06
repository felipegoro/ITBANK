import csv 
import time

# Abrir el archivo CSV en modo lectura
with open('cheques.csv', 'r') as f:
    csv_reader = csv.DictReader(f)
    data = list(csv_reader)

fieldnames = csv_reader.fieldnames

# Función para exportar cheques al csv
# Abrir el archivo CSV en modo escritura
def exportar_a_csv(data):
    timestamp = int(time.time())
    output_csv = f"{DNI}_{timestamp}.csv"

    with open(output_csv, "w") as f:
        csv_writer = csv.DictWriter(f, fieldnames=fieldnames)
        csv_writer.writeheader()
        csv_writer.writerows(data)

    print(f"Archivo exportado exitosamente: {output_csv}")

"""
# Tal vez hacerlo con funciones

def Tipo_de_Cheque (data):
      
def Estado_de_Cheque (data):
    
def Rango_de_Fechas (data):


# Realicen el README



menu"""

#HACER
# Se debe proporcionar el DNI del cliente para el cual se realizará la consulta.
# Validar tipo de dato
DNI=int(input("DNI: "))

#HACER BIEN
# El usuario debe especificar si desea consultar cheques emitidos o depositados.
# Validar datos
tipo_cheque=input("Tipo de Cheque (EMITIDO o DEPOSITADO): ")
while tipo_cheque.upper() != "EMITIDO" and tipo_cheque.upper() != "DEPOSITADO":
    print("El Tipo de Cheque debe ser EMITIDO o DEPOSITADO.")
    tipo_cheque=input("Tipo de Cheque (EMITIDO o DEPOSITADO): ")

if tipo_cheque.upper() == "EMITIDO":
    filter_data = [cheque for cheque in data if cheque['Estado'] == "EMITIDO"]
    print(filter_data)
      
elif tipo_cheque.upper() == "DEPOSITADO":
    filter_data = [cheque for cheque in data if cheque['Estado'] == "DEPOSITADO"]
    print(filter_data)


# Validación de estados
estado_cheque=input("Estado del Cheque (Opcional)(PENDIENTE o APROBADO o RECHAZADO): ")
while estado_cheque.upper() != "PENDIENTE" and estado_cheque.upper() != "APROBADO" and estado_cheque.upper() != "RECHAZADO":
             print("El estado debe ser PENDIENTE o APROBADO o RECHAZADO.")
             estado_cheque=input("Estado del Cheque (Opcional)(PENDIENTE o APROBADO o RECHAZADO): ")

# Mejorar
# (OPCIONAL) El usuario puede proporcionar un estado de cheque (PENDIENTE, APROBADO, RECHAZADO)
if estado_cheque.upper() == "PENDIENTE":
    filter_data = [cheque for cheque in data if cheque['Estado'] == "pendiente"]
      
elif estado_cheque.upper() == "APROBADO":
    filter_data = [cheque for cheque in data if cheque['Estado'] == "aprobado"]
     
elif estado_cheque.upper() == "RECHAZADO":
    filter_data = [cheque for cheque in data if cheque['Estado'] == "rechazado"]

print(filter_data)



#HACER
# (OPCIONAL) El usuario puede especificar un rango de fechas para filtrar los cheques.
# Validar datos
salida=input("Rango de Fechas (Opcional): ")





# Validación de tipo de salida
salida=input("Salida (PANTALLA o CSV): ")
while salida.upper() != "PANTALLA" and salida.upper() != "CSV":
        print("El parámetro de salida debe ser 'PANTALLA' o 'CSV'.")
        salida=input("Salida (PANTALLA o CSV): ")

# El usuario puede elegir si desea ver los resultados en la pantalla o exportarlos a un archivo CSV.
if salida.upper() == "PANTALLA":
    #Mostrar_en_pantalla(cheques_filtrados)
    print(data)
    # Mejorar
elif salida.upper() == "CSV":
    # Exportar_a_csv(cheques_filtrados)
    # Llamada a la función
    exportar_a_csv(data)