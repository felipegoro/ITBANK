from django.db import models
from clientes.models import Cliente

class TipoCuenta(models.Model): 
    nombre = models.CharField(max_length=100)
    def __str__(self):
        return f'{self.nombre} ' 

class Cuenta(models.Model): 
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE) 
    sueldo = models.DecimalField(max_digits=10, decimal_places=2) 
    tipo = models.ForeignKey(TipoCuenta, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.cliente} - {self.sueldo} - {self.tipo}'
