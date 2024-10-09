Una vez que se esté ejecutando el programa, aparecerá un menú de opciones.

---- Menú de opciones ----
1. Filtrar cheques
2. Exportar cheques a CSV
3. Salir del programa
Elige una opción:

Al seleccionar la opción 1 (Filtrar cheques):

 - Le pedirá al usuario su DNI.
   En caso de no poner 8 dígitos, mostrará por pantalla el siguiente mensaje:"El DNI debe contar con 8 dígitos, por favor vuelva a intentarlo."

 - El tipo de cheque.
   En caso de no poner si es EMITIDO o DEPOSITADO, se mostrará por pantalla el siguiente mensaje: "El tipo de cheque debe ser EMITIDO o DEPOSITADO."

 - El estado del cheque (este último lo puede omitir ingresando la letra "X").
   En caso de no poner (PENDIENTE, APROBADO, RECHAZADO o X), mostrará por pantalla el siguiente mensaje:"El estado debe ser PENDIENTE, APROBADO, RECHAZADO o X para omitir."

 - Por último, mostrará por pantalla el cheque filtrado con su DNI, el tipo de cheque y su estado.
   En caso de que los datos no coincidan con algunos de los cheques, imprimirá el siguiente mensaje: "No se encontraron cheques que coincidan con las características."

Al seleccionar la opción 2 (Exportar cheques a CSV):

 - Le pedirá al usuario su DNI.
 - En caso de no poner 8 dígitos, mostrará por pantalla el siguiente mensaje: "El DNI debe contar con 8 dígitos, por favor vuelva a intentarlo."

- El tipo de cheque.
  En caso de no poner si es EMITIDO o DEPOSITADO, se mostrará por pantalla el siguiente mensaje: "El tipo de cheque debe ser EMITIDO o DEPOSITADO."

 - El estado del cheque (este último lo puede omitir ingresando la letra "X").
   En caso de no poner (PENDIENTE, APROBADO, RECHAZADO o X), mostrará por pantalla el siguiente mensaje: "El estado debe ser PENDIENTE, APROBADO, RECHAZADO o X para omitir."

 - Por último, se exportarán los datos de los cheques en una nueva lista CSV.
   En caso de que los datos puestos anteriormente no coincidan, imprimirá este mensaje por pantalla: "No se encontraron cheques que coincidan con las características."

Al seleccionar la opción 3 (Salir del programa):
 - Saldrá del programa y dejará de ejecutarse.

Al seleccionar otra opción que no sea del menú, imprimirá este mensaje por pantalla: "Esa opción no es válida. Por favor elija una opción del menú."
