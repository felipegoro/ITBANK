from django.db import models

class Sucursal(models.Model):
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=200)
    numero = models.IntegerField(unique=True, null=True, blank=True)  
    
    

    def __str__(self):
        return f"{self.nombre} ({self.numero})"

class TipoCliente(models.Model):
    CATEGORIAS = [
        ('BLACK', 'Black'),
        ('GOLD', 'Gold'),
        ('CLASSIC', 'Classic'),
    ]
    categoria = models.CharField(max_length=7, choices=CATEGORIAS, default='CLASSIC')
    limite_prestamo = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.categoria

class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    dni = models.CharField(max_length=10, unique=True)
    direccion = models.CharField(max_length=200, null=True, blank=True) 
    tipo = models.ForeignKey(TipoCliente, on_delete=models.CASCADE)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.apellido}, {self.nombre}"

    @property
    def categoria(self):
        return self.tipo.categoria

    @property
    def limite_prestamo(self):
        return self.tipo.limite_prestamo