from django.test import TestCase
from .models import Address, CustomerType, Branch, Customer

class ModelsTestCase(TestCase):
    def setUp(self):
        # Crear datos iniciales para probar
        self.address = Address.objects.create(
            street="Calle Falsa",
            number="123",
            city="Ciudad Ejemplo",
            state="Provincia Ejemplo",
            postal_code="12345"
        )
        self.customer_type = CustomerType.objects.create(type_name="Regular")
        self.branch = Branch.objects.create(branch_name="Sucursal Centro", location=self.address)
        self.customer = Customer.objects.create(
            first_name="Juan",
            last_name="Pérez",
            id_number="12345678",
            birth_date="1990-01-01",
            category=self.customer_type
        )
        self.customer.addresses.add(self.address)

    def test_address_str(self):
        self.assertEqual(str(self.address), "Calle Falsa, Ciudad Ejemplo, Provincia Ejemplo, 12345")

    def test_customer_type_str(self):
        self.assertEqual(str(self.customer_type), "Regular")

    def test_branch_str(self):
        self.assertEqual(str(self.branch), "Sucursal Centro, Calle Falsa, Ciudad Ejemplo, Provincia Ejemplo, 12345")

    def test_customer_str(self):
        self.assertEqual(str(self.customer), "Juan Pérez (12345678)")
