class Client:
    def __init__(self, nombre, apellido, dni, tipo):
        self.nombre = nombre
        self.apellido = apellido
        self.dni = dni
        self.tipo = tipo
        self.transacciones = []
    
    def agregar_transaccion(self, transaccion):
        self.transacciones.append(transaccion)
