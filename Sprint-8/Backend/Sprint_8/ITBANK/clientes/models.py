from django.db import models
from django.core.validators import RegexValidator, MinValueValidator
from django.contrib.auth.models import AbstractUser, UserManager

# Añadimos el CustomUserManager
class CustomUserManager(UserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)

class Usuario(AbstractUser):
    dni = models.CharField(max_length=8, unique=True)
    fecha_nacimiento = models.DateField(null=True)
    
    # Añadimos el manager personalizado
    objects = CustomUserManager()
    
    class Meta:
        db_table = 'auth_user'

    def __str__(self):
        return self.get_full_name() or self.username

    def save(self, *args, **kwargs):
        if self.email:
            self.email = self.email.lower()
        super().save(*args, **kwargs)

class Sucursal(models.Model):
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=200)
    numero = models.CharField(max_length=4)
    telefono = models.CharField(max_length=15)

    class Meta:
        verbose_name_plural = "Sucursales"

    def __str__(self):
        return self.nombre

class TipoCliente(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True)
    limite_transferencia = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=50000
    )

    class Meta:
        verbose_name_plural = "Tipos de Cliente"

    def __str__(self):
        return self.nombre

class Cliente(models.Model):
    usuario = models.OneToOneField(
        'Usuario', 
        on_delete=models.CASCADE,
        related_name='cliente'
    )
    tipo = models.ForeignKey('TipoCliente', on_delete=models.PROTECT)
    sucursal = models.ForeignKey('Sucursal', on_delete=models.PROTECT)
    dni = models.CharField(
        max_length=8,
        validators=[RegexValidator(r'^\d{8}$', 'DNI debe tener 8 dígitos')]
    )
    telefono = models.CharField(
        max_length=15,
        validators=[RegexValidator(r'^\+?1?\d{9,15}$', 'Ingrese un número válido')]
    )
    direccion = models.CharField(max_length=200)
    fecha_nacimiento = models.DateField()
    saldo_pesos = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )
    saldo_dolares = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )
    cvu = models.CharField(
        max_length=22,
        unique=True,
        validators=[RegexValidator(r'^\d{22}$', 'CVU debe tener 22 dígitos')]
    )
    foto_perfil = models.ImageField(
        upload_to='perfiles/',
        null=True,
        blank=True
    )

    class Meta:
        verbose_name_plural = "Clientes"

    def __str__(self):
        return f"{self.usuario.get_full_name()} - {self.dni}"

class Transaccion(models.Model):
    ESTADO_CHOICES = [
        ('PENDIENTE', 'Pendiente'),
        ('COMPLETADA', 'Completada'),
        ('RECHAZADA', 'Rechazada')
    ]
    
    TIPO_CHOICES = [
        ('TRANSFERENCIA', 'Transferencia'),
        ('DEPOSITO', 'Depósito'),
        ('RETIRO', 'Retiro')
    ]

    cliente = models.ForeignKey(
        Cliente,
        on_delete=models.CASCADE,
        related_name='transacciones'
    )
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    monto = models.DecimalField(max_digits=12, decimal_places=2)
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(
        max_length=20,
        choices=ESTADO_CHOICES,
        default='PENDIENTE'
    )
    descripcion = models.CharField(max_length=200, blank=True)

    class Meta:
        verbose_name_plural = "Transacciones"
        ordering = ['-fecha']

    def __str__(self):
        return f"{self.cliente} - {self.tipo} - {self.monto}"