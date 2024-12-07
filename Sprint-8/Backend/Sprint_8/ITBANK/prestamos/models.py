from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from clientes.models import Cliente, Sucursal
from datetime import date
from decimal import Decimal

class TipoPrestamo(models.Model):
    nombre = models.CharField(max_length=100)
    tasa_interes = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Tasa de interés anual en porcentaje"
    )
    plazo_maximo = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(60)],
        help_text="Plazo máximo en meses"
    )
    monto_maximo = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text="Monto máximo permitido"
    )
    requisitos = models.TextField(blank=True)

    class Meta:
        verbose_name = "Tipo de Préstamo"
        verbose_name_plural = "Tipos de Préstamos"
        ordering = ['nombre']

    def __str__(self):
        return f"{self.nombre} - {self.tasa_interes}% anual"

class Prestamo(models.Model):
    ESTADO_CHOICES = [
        ('PENDIENTE', 'Pendiente'),
        ('APROBADO', 'Aprobado'),
        ('RECHAZADO', 'Rechazado'),
        ('CANCELADO', 'Cancelado'),
        ('FINALIZADO', 'Finalizado'),
    ]

    valor = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    tipo = models.ForeignKey(TipoPrestamo, on_delete=models.PROTECT)
    fecha_solicitud = models.DateField(default=date.today)
    fecha_aprobacion = models.DateField(null=True, blank=True)
    plazo_meses = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(60)]
    )
    cliente = models.ForeignKey(
        Cliente, 
        on_delete=models.PROTECT,
        related_name='prestamos'
    )
    estado = models.CharField(
        max_length=20,
        choices=ESTADO_CHOICES,
        default='PENDIENTE'
    )
    sucursal = models.ForeignKey(
        Sucursal, 
        on_delete=models.PROTECT,
        related_name='prestamos'
    )
    cuota_mensual = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )
    observaciones = models.TextField(blank=True)

    class Meta:
        verbose_name = "Préstamo"
        verbose_name_plural = "Préstamos"
        ordering = ['-fecha_solicitud']

    def __str__(self):
        return f"Préstamo {self.tipo} - {self.cliente} - ${self.valor}"

    def calcular_cuota_mensual(self):
        tasa_mensual = self.tipo.tasa_interes / Decimal('1200')  # Convertir tasa anual a mensual
        factor = (1 - (1 + tasa_mensual) ** -self.plazo_meses) / tasa_mensual
        return self.valor / factor

    def save(self, *args, **kwargs):
        if not self.cuota_mensual:
            self.cuota_mensual = self.calcular_cuota_mensual()
        super().save(*args, **kwargs)