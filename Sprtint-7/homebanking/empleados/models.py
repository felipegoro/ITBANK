# empleados/models.py

from django.db import models
from clientes.models import Sucursal

class Trabajador(models.Model):
    nombre_completo = models.CharField(max_length=200)
    identificacion = models.CharField(max_length=12, unique=True)
    fecha_ingreso = models.DateField()
    oficina = models.ForeignKey(Sucursal, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nombre_completo} - {self.identificacion} - {self.fecha_ingreso} - {self.oficina}'
