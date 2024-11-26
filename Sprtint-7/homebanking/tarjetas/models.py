from django.db import models
from clientes.models import Cliente

class TipoTarjeta(models.Model): ## Entidad Tipo de Tarjeta.
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.nombre} '

class MarcaTarjeta(models.Model): ## Entidad Marca de Tarjeta.
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.nombre} '
    
class Tarjeta(models.Model):
    numero = models.CharField(max_length=16)
    fecha_expiracion = models.DateField()
    fecha_otorgamiento = models.DateField()
    cvv = models.CharField(max_length=3)
    tipo = models.ForeignKey(TipoTarjeta, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, related_name='tarjetas', on_delete=models.CASCADE)
    marca = models.ForeignKey(MarcaTarjeta, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.numero} - {self.fecha_expiracion} - {self.tipo} - {self.cliente}'


