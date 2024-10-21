import unittest
from Validar import Validar
from Client import Client
from Transacion import Transacion

class TestValidar(unittest.TestCase):
    def test_validar_classic(self):
        cliente = Client('Juan', 'Perez', '12345678', 'Classic')
        transaccion = Transacion('RECHAZADA', 'RETIRO_EFECTIVO_CAJERO_AUTOMATICO', 15000)
        self.assertFalse(Validar.validar_classic(cliente, transaccion))

if __name__ == '__main__':
    unittest.main()
