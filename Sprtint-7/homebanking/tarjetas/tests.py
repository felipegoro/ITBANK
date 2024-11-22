from django.test import TestCase
from clientes.models import Cliente
from .models import Tarjeta, TipoTarjeta, MarcaTarjeta

class TarjetaModelTest(TestCase):

    def setUp(self):
        # Crear un cliente de ejemplo
        self.cliente = Cliente.objects.create(
            first_name="Juan", 
            last_name="Pérez", 
            id_number="123456789", 
            birth_date="1990-01-01"
        )
        
        # Crear un tipo de tarjeta
        self.tipo = TipoTarjeta.objects.create(nombre="Crédito")
        
        # Crear una marca de tarjeta
        self.marca = MarcaTarjeta.objects.create(nombre="VISA")
        
        # Crear una tarjeta
        self.tarjeta = Tarjeta.objects.create(
            numero="1234567812345678", 
            fecha_expiracion="2025-12-01", 
            fecha_otorgamiento="2021-01-01", 
            cvv="123", 
            tipo=self.tipo, 
            cliente=self.cliente, 
            marca=self.marca
        )

    def test_tarjeta_creation(self):
        tarjeta = self.tarjeta
        self.assertEqual(tarjeta.numero, "1234567812345678")
        self.assertEqual(tarjeta.tipo.nombre, "Crédito")
        self.assertEqual(tarjeta.cliente.first_name, "Juan")
        self.assertEqual(tarjeta.marca.nombre, "VISA")
