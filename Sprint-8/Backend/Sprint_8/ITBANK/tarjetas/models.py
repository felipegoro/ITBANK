from django.db import models
from django.core.validators import RegexValidator, MinValueValidator
from clientes.models import Cliente
from datetime import date

class TipoTarjeta(models.Model):
    nombre = models.CharField(max_length=100)
    limite_credito = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    beneficios = models.TextField(blank=True)

    class Meta:
        verbose_name = "Tipo de Tarjeta"
        verbose_name_plural = "Tipos de Tarjetas"
        ordering = ['nombre']

    def __str__(self):
        return self.nombre

class MarcaTarjeta(models.Model):
    nombre = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='marcas/', blank=True)
    descripcion = models.TextField(blank=True)

    class Meta:
        verbose_name = "Marca de Tarjeta"
        verbose_name_plural = "Marcas de Tarjetas"
        ordering = ['nombre']

    def __str__(self):
        return self.nombre
    
class Tarjeta(models.Model):
    numero = models.CharField(
        max_length=16,
        validators=[
            RegexValidator(
                regex=r'^\d{16}$',
                message='El número debe contener 16 dígitos'
            )
        ]
    )
    fecha_expiracion = models.DateField()
    fecha_otorgamiento = models.DateField(default=date.today)
    cvv = models.CharField(
        max_length=3,
        validators=[
            RegexValidator(
                regex=r'^\d{3}$',
                message='El CVV debe contener 3 dígitos'
            )
        ]
    )
    tipo = models.ForeignKey(TipoTarjeta, on_delete=models.PROTECT)
    cliente = models.ForeignKey(
        Cliente,
        related_name='tarjetas', 
        on_delete=models.PROTECT
    )
    marca = models.ForeignKey(MarcaTarjeta, on_delete=models.PROTECT)
    tarjeta_principal = models.BooleanField(default=False)
    background = models.CharField(
        max_length=1, 
        default='1',
        choices=[('1', 'Estilo 1'), ('2', 'Estilo 2'), ('3', 'Estilo 3')]
    )
    activa = models.BooleanField(default=True)
    limite_actual = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    class Meta:
        verbose_name = "Tarjeta"
        verbose_name_plural = "Tarjetas"
        ordering = ['-fecha_otorgamiento']
        unique_together = ['numero', 'marca']

    def __str__(self):
        return f'{self.marca} **** {self.numero[-4:]} - {self.cliente}'

    def save(self, *args, **kwargs):
        if not self.limite_actual:
            self.limite_actual = self.tipo.limite_credito
        super().save(*args, **kwargs)