from django.db import models
from django.core.validators import MinValueValidator, RegexValidator
from django.core.exceptions import ValidationError
from clientes.models import Usuario
import uuid


class TipoCuenta(models.Model):
    CATEGORIA_CHOICES = [
        ('AHORRO', 'Cuenta de Ahorro'),
        ('CORRIENTE', 'Cuenta Corriente'),
        ('INVERSION', 'Cuenta de Inversión'),
        ('DIGITAL', 'Cuenta Digital'),
    ]
    
    nombre = models.CharField(max_length=50, choices=CATEGORIA_CHOICES, unique=True)
    descripcion = models.TextField()
    tasa_interes = models.DecimalField(
        max_digits=5, 
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    mantenimiento_mensual = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )
    limite_transferencia_diaria = models.DecimalField(
        max_digits=12, 
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    limite_retiro_diario = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    saldo_minimo = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )

    class Meta:
        verbose_name = "Tipo de Cuenta"
        verbose_name_plural = "Tipos de Cuenta"
        ordering = ['nombre']

    def __str__(self):
        return f"{self.nombre} - Tasa: {self.tasa_interes}%"

class Cuenta(models.Model):
    MONEDA_CHOICES = [
        ('ARS', 'Pesos Argentinos'),
        ('USD', 'Dólares Estadounidenses'),
        ('EUR', 'Euros'),
    ]
    
    ESTADO_CHOICES = [
        ('ACTIVA', 'Activa'),
        ('INACTIVA', 'Inactiva'),
        ('BLOQUEADA', 'Bloqueada'),
        ('EN_REVISION', 'En Revisión'),
    ]
    
    numero_cuenta = models.CharField(
        max_length=20,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^\d{10}$',
                message='El número de cuenta debe tener 10 dígitos'
            )
        ]
    )
    cbu = models.CharField(
        max_length=22,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^\d{22}$',
                message='El CBU debe tener 22 dígitos'
            )
        ]
    )
    alias = models.CharField(
        max_length=30,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^[a-zA-Z0-9.]+$',
                message='El alias solo puede contener letras, números y puntos'
            )
        ]
    )
    titular = models.ForeignKey(Usuario, on_delete=models.PROTECT, related_name='cuentas')
    tipo_cuenta = models.ForeignKey(TipoCuenta, on_delete=models.PROTECT)
    saldo = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )
    moneda = models.CharField(max_length=3, choices=MONEDA_CHOICES, default='ARS')
    fecha_apertura = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=15, choices=ESTADO_CHOICES, default='ACTIVA')
    ultima_actividad = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-fecha_apertura']
        unique_together = ['titular', 'tipo_cuenta', 'moneda']
        verbose_name = "Cuenta"
        verbose_name_plural = "Cuentas"

    def __str__(self):
        return f"{self.titular.nombre} - {self.tipo_cuenta.nombre} - {self.moneda}"

    def save(self, *args, **kwargs):
        if not self.numero_cuenta:
            self.numero_cuenta = str(uuid.uuid4().int)[:10]
        if not self.cbu:
            self.cbu = str(uuid.uuid4().int)[:22]
        if not self.alias:
            self.alias = f"{self.titular.nombre.lower()}.{self.tipo_cuenta.nombre.lower()}"
        super().save(*args, **kwargs)

    def validar_saldo(self, monto):
        if self.saldo - monto < self.tipo_cuenta.saldo_minimo:
            raise ValidationError("La operación excede el saldo mínimo permitido")
        return True
def generar_referencia():
    return str(uuid.uuid4())

class MovimientoCuenta(models.Model):
    TIPO_MOVIMIENTO = [
        ('DEPOSITO', 'Depósito'),
        ('RETIRO', 'Retiro'),
        ('TRANSFERENCIA_ENVIADA', 'Transferencia Enviada'),
        ('TRANSFERENCIA_RECIBIDA', 'Transferencia Recibida'),
        ('PAGO_SERVICIO', 'Pago de Servicio'),
        ('INTERES', 'Interés'),
        ('COMISION', 'Comisión'),
    ]
    
    cuenta = models.ForeignKey(
        Cuenta,
        on_delete=models.PROTECT,
        related_name='movimientos'
    )
    fecha = models.DateTimeField(auto_now_add=True)
    tipo = models.CharField(max_length=25, choices=TIPO_MOVIMIENTO)
    monto = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    saldo_anterior = models.DecimalField(max_digits=12, decimal_places=2)
    saldo_posterior = models.DecimalField(max_digits=12, decimal_places=2)
    descripcion = models.CharField(max_length=200)
    referencia = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        unique=True,
        default=generar_referencia  
    )

    class Meta:
        ordering = ['-fecha']
        verbose_name = "Movimiento"
        verbose_name_plural = "Movimientos"

    def __str__(self):
        return f"{self.fecha.strftime('%Y-%m-%d %H:%M')} - {self.tipo} - {self.monto}"

    def save(self, *args, **kwargs):
        if not self.saldo_anterior:
            self.saldo_anterior = self.cuenta.saldo
        if not self.saldo_posterior:
            if self.tipo in ['DEPOSITO', 'TRANSFERENCIA_RECIBIDA', 'INTERES']:
                self.saldo_posterior = self.saldo_anterior + self.monto
            else:
                self.saldo_posterior = self.saldo_anterior - self.monto
        super().save(*args, **kwargs)