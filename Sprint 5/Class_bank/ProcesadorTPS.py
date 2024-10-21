from Transacion import Transacion
from Validar import Validar

class ProcesadorTPS:
    def __init__(self, cliente):
        self.cliente = cliente
    
    def procesar_transacciones(self, datos_transacciones):
        for transaccion in datos_transacciones['transacciones']:
            t = Transacion(transaccion['estado'], transaccion['tipo'], transaccion['monto'])
            if Validar.validar_transaccion(self.cliente, t):
                self.cliente.agregar_transaccion(t)
