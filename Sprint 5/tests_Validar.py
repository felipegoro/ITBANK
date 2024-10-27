import json
import unittest
from Class_bank.Transaction import Transaction
from Class_bank.Client import Client

class TestTransactionProcessing(unittest.TestCase):
    def test_transaction_creation(self):
        transaction = Transaction("ACEPTADA", "RETIRO_EFECTIVO_CAJERO_AUTOMATICO", 190, 1000, "10/10/2022 16:00:55")
        self.assertEqual(transaction.status, "ACEPTADA")
        self.assertEqual(transaction.transaction_type, "RETIRO_EFECTIVO_CAJERO_AUTOMATICO")

    def test_load_json(self):
        with open('transacciones.json', 'r') as file:
            data = json.load(file)
        self.assertIsInstance(data, list)

    def test_client_summary(self):
        client = Client(100001, "Nicolas", "Gastón", "29494777", "Calle Falsa 123")
        transaction = Transaction("ACEPTADA", "RETIRO_EFECTIVO_CAJERO_AUTOMATICO", 190, 1000, "10/10/2022 16:00:55")
        client.add_transaction(transaction)
        summary = client.get_summary()
        self.assertEqual(len(summary["transactions"]), 1)

if __name__ == "__main__":
    unittest.main()
