import unittest
from Class_bank.Validar import Validar
from Class_bank.Client import Client
from Class_bank.Transaction import Transacion

class TestValidar(unittest.TestCase):
    def test_validar_classic(self):
        cliente = Client('Juan', 'Perez', '12345678', 'Classic')
        transaccion = Transacion('RECHAZADA', 'RETIRO_EFECTIVO_CAJERO_AUTOMATICO', 15000)
        self.assertFalse(Validar.validar_classic(cliente, transaccion))

if __name__ == '__main__':
    unittest.main()
