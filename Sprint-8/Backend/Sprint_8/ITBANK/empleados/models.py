from django.db import models
from django.core.validators import RegexValidator, MinValueValidator
from django.core.exceptions import ValidationError
from django.conf import settings
from datetime import date, timedelta
from clientes.models import Sucursal

class Cargo(models.Model):
    NIVEL_CHOICES = [
        ('JUNIOR', 'Junior'),
        ('SEMI_SENIOR', 'Semi Senior'),
        ('SENIOR', 'Senior'),
        ('SUPERVISOR', 'Supervisor'),
        ('GERENTE', 'Gerente'),
    ]
    
    AREA_CHOICES = [
        ('ATENCION_CLIENTE', 'Atención al Cliente'),
        ('CAJA', 'Caja'),
        ('PRESTAMOS', 'Préstamos'),
        ('INVERSIONES', 'Inversiones'),
        ('ADMINISTRACION', 'Administración'),
        ('GERENCIA', 'Gerencia'),
    ]
    
    nombre = models.CharField(max_length=100)
    area = models.CharField(max_length=50, choices=AREA_CHOICES)
    nivel = models.CharField(max_length=20, choices=NIVEL_CHOICES)
    salario_base = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    descripcion = models.TextField()
    requisitos = models.TextField()

    class Meta:
        unique_together = ['nombre', 'nivel']
        ordering = ['area', 'nivel']

    def __str__(self):
        return f"{self.nombre} - {self.nivel} ({self.area})"

class Turno(models.Model):
    TURNO_CHOICES = [
        ('MAÑANA', '8:00 - 13:00'),
        ('TARDE', '13:00 - 18:00'),
        ('COMPLETO', '9:00 - 18:00'),
    ]
    
    nombre = models.CharField(max_length=50, choices=TURNO_CHOICES)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    descripcion = models.TextField()

    def __str__(self):
        return f"{self.nombre} ({self.hora_inicio} - {self.hora_fin})"

    def clean(self):
        if self.hora_fin <= self.hora_inicio:
            raise ValidationError("La hora de fin debe ser posterior a la hora de inicio")

class Empleado(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cargo = models.ForeignKey(Cargo, on_delete=models.PROTECT)
    turno = models.ForeignKey(Turno, on_delete=models.PROTECT)
    sucursal = models.ForeignKey(
        Sucursal,
        on_delete=models.PROTECT,
        related_name='empleados'
    )
    dni = models.CharField(
        max_length=10,
        validators=[
            RegexValidator(
                regex=r'^\d{8}$',
                message='DNI debe contener 8 dígitos'
            )
        ],
        unique=True
    )
    telefono = models.CharField(
        max_length=15,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message="Formato de teléfono inválido"
            )
        ]
    )
    fecha_nacimiento = models.DateField()
    fecha_contratacion = models.DateField(default=date.today)
    direccion = models.CharField(max_length=200)
    numero_legajo = models.CharField(max_length=20, unique=True)
    activo = models.BooleanField(default=True)
    vacaciones_disponibles = models.IntegerField(default=15)
    evaluacion_desempeño = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        validators=[MinValueValidator(0)],
        null=True,
        blank=True
    )

    class Meta:
        ordering = ['-fecha_contratacion']
        verbose_name_plural = "Empleados"
        permissions = [
            ("can_evaluate", "Puede evaluar empleados"),
            ("can_assign_vacation", "Puede asignar vacaciones"),
        ]

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.cargo.nombre}"

    @property
    def edad(self):
        today = date.today()
        return today.year - self.fecha_nacimiento.year - (
            (today.month, today.day) < 
            (self.fecha_nacimiento.month, self.fecha_nacimiento.day)
        )

    @property
    def antiguedad(self):
        return (date.today() - self.fecha_contratacion).days // 365

    def calcular_salario(self):
        antiguedad_bonus = (self.antiguedad * 0.02) * self.cargo.salario_base
        return self.cargo.salario_base + antiguedad_bonus

class Ausencia(models.Model):
    TIPO_CHOICES = [
        ('VACACIONES', 'Vacaciones'),
        ('ENFERMEDAD', 'Enfermedad'),
        ('PERSONAL', 'Personal'),
        ('OTROS', 'Otros'),
    ]
    
    empleado = models.ForeignKey(
        Empleado,
        on_delete=models.CASCADE,
        related_name='ausencias'
    )
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    justificacion = models.TextField(blank=True)
    aprobada = models.BooleanField(default=False)

    def clean(self):
        if self.fecha_fin < self.fecha_inicio:
            raise ValidationError("La fecha de fin no puede ser anterior a la fecha de inicio")
        
        if self.tipo == 'VACACIONES':
            dias = (self.fecha_fin - self.fecha_inicio).days + 1
            if dias > self.empleado.vacaciones_disponibles:
                raise ValidationError("No hay suficientes días de vacaciones disponibles")

    def save(self, *args, **kwargs):
        if self.tipo == 'VACACIONES' and self.aprobada:
            dias = (self.fecha_fin - self.fecha_inicio).days + 1
            self.empleado.vacaciones_disponibles -= dias
            self.empleado.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.empleado} - {self.tipo} ({self.fecha_inicio} a {self.fecha_fin})"

    class Meta:
        ordering = ['-fecha_inicio']
        verbose_name_plural = "Ausencias"