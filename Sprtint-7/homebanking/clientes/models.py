from django.db import models

class Direccion(models.Model):  
    calle = models.CharField(max_length=100)
    numero = models.CharField(max_length=50)
    ciudad = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)
    codigo_postal = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.calle}, {self.ciudad}, {self.estado}, {self.codigo_postal}'


class TipoCliente(models.Model): 
    nombre_tipo = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre_tipo


class Sucursal(models.Model):  
    nombre_sucursal = models.CharField(max_length=100)
    ubicacion = models.ForeignKey(Direccion, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nombre_sucursal}, {self.ubicacion}'


class Cliente(models.Model):  
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    numero_identificacion = models.CharField(max_length=15)
    fecha_nacimiento = models.DateField()
    direcciones = models.ManyToManyField(Direccion)  
    categoria = models.ForeignKey(TipoCliente, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nombre} {self.apellido} ({self.numero_identificacion})'
