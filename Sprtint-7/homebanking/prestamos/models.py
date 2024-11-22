from django.db import models
from clientes.models import Cliente


class TipoPrestamo(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Prestamo(models.Model):
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.ForeignKey(TipoPrestamo, on_delete=models.CASCADE)
    fecha = models.DateField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.valor} - {self.tipo.nombre} - {self.fecha} - {self.cliente.nombre}"
