class Validar:
    @staticmethod
    def validar_transaccion(cliente, transaccion):
        # Reglas de validación según tipo de cliente
        if cliente.tipo == 'Classic':
            return Validar.validar_classic(cliente, transaccion)
        elif cliente.tipo == 'Gold':
            return Validar.validar_gold(cliente, transaccion)
        elif cliente.tipo == 'Black':
            return Validar.validar_black(cliente, transaccion)
    
    @staticmethod
    def validar_classic(cliente, transaccion):
        # Ejemplo de validación: límite diario de extracción
        if transaccion.tipo == 'RETIRO_EFECTIVO_CAJERO_AUTOMATICO' and transaccion.monto > 10000:
            return False
        return True
