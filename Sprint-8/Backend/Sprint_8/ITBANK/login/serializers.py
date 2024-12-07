from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from clientes.models import Cliente, Usuario, Sucursal, TipoCliente
from empleados.models import Empleado
from datetime import date

# Obtener el modelo de usuario personalizado
Usuario = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        if not data.get('username') or not data.get('password'):
            raise serializers.ValidationError("Debe incluir 'username' y 'password'.")
        return data

class ClienteRegisterSerializer(serializers.Serializer):
    # Datos de usuario
    username = serializers.CharField(min_length=4, max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={'input_type': 'password'}
    )
    
    # Datos personales
    nombre = serializers.CharField(max_length=100)
    apellido = serializers.CharField(max_length=100)
    dni = serializers.CharField(
        validators=[
            RegexValidator(
                regex=r'^\d{8}$',
                message='El DNI debe contener exactamente 8 dígitos'
            )
        ]
    )
    fecha_nacimiento = serializers.DateField()

    def validate_username(self, value):
        if Usuario.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nombre de usuario ya está en uso")
        return value

    def validate_email(self, value):
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email ya está registrado")
        return value

    def validate_dni(self, value):
        if Cliente.objects.filter(dni=value).exists():
            raise serializers.ValidationError("Este DNI ya está registrado")
        return value

    def validate_fecha_nacimiento(self, value):
        today = date.today()
        age = today.year - value.year - ((today.month, today.day) < (value.month, value.day))
        if age < 18:
            raise serializers.ValidationError("Debe ser mayor de 18 años para registrarse")
        if age > 100:
            raise serializers.ValidationError("Fecha de nacimiento no válida")
        return value

    def validate_password(self, value):
        if value.isdigit():
            raise serializers.ValidationError("La contraseña no puede contener solo números")
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError("La contraseña debe contener al menos un número")
        if not any(char.isupper() for char in value):
            raise serializers.ValidationError("La contraseña debe contener al menos una mayúscula")
        return value

    def create(self, validated_data):
        try:
            # Obtener o crear tipo de cliente por defecto
            tipo_cliente, _ = TipoCliente.objects.get_or_create(
                nombre="Cliente Regular",
                defaults={
                    'descripcion': 'Cliente estándar',
                    'limite_transferencia': 50000.00
                }
            )

            # Obtener la primera sucursal (o crearla si no existe)
            sucursal, _ = Sucursal.objects.get_or_create(
                nombre="Sucursal Principal",
                defaults={
                    'direccion': 'Dirección Principal 123',
                    'numero': '0001',
                    'telefono': '1234567890'
                }
            )

            # Crear usuario
            user = Usuario.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password'],
                first_name=validated_data['nombre'],
                last_name=validated_data['apellido'],
                dni=validated_data['dni'],
                fecha_nacimiento=validated_data['fecha_nacimiento']
            )

            # Crear cliente
            Cliente.objects.create(
                usuario=user,
                tipo=tipo_cliente,
                sucursal=sucursal,
                dni=validated_data['dni'],
                fecha_nacimiento=validated_data['fecha_nacimiento'],
                telefono='0000000000',  # Valor por defecto
                direccion='Dirección por defecto',  # Valor por defecto
                cvu=''.join(['0' for _ in range(22)])  # CVU por defecto
            )

            return user
        except Exception as e:
            print(f"Error durante la creación del usuario: {str(e)}")
            raise serializers.ValidationError(f"Error al crear el usuario: {str(e)}")

class EmpleadoRegisterSerializer(serializers.Serializer):
    # Datos de usuario
    username = serializers.CharField(min_length=4, max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={'input_type': 'password'}
    )
    
    # Datos personales
    nombre = serializers.CharField(max_length=100)
    apellido = serializers.CharField(max_length=100)
    dni = serializers.CharField(
        validators=[
            RegexValidator(
                regex=r'^\d{8}$',
                message='El DNI debe contener exactamente 8 dígitos'
            )
        ]
    )
    fecha_nacimiento = serializers.DateField()
    cargo = serializers.CharField(max_length=100)
    sucursal = serializers.IntegerField()

    def validate_username(self, value):
        if Usuario.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nombre de usuario ya está en uso")
        return value

    def validate_email(self, value):
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email ya está registrado")
        return value

    def validate_dni(self, value):
        if Empleado.objects.filter(dni=value).exists():
            raise serializers.ValidationError("Este DNI ya está registrado")
        return value

    def validate_fecha_nacimiento(self, value):
        today = date.today()
        age = today.year - value.year - ((today.month, today.day) < (value.month, value.day))
        if age < 18:
            raise serializers.ValidationError("Debe ser mayor de 18 años para registrarse")
        if age > 70:
            raise serializers.ValidationError("La edad máxima para empleados es 70 años")
        return value

    def create(self, validated_data):
        try:
            # Crear usuario
            user = Usuario.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password'],
                first_name=validated_data['nombre'],
                last_name=validated_data['apellido'],
                dni=validated_data['dni'],
                fecha_nacimiento=validated_data['fecha_nacimiento'],
                is_staff=True
            )

            # Crear empleado
            Empleado.objects.create(
                usuario=user,
                dni=validated_data['dni'],
                fecha_nacimiento=validated_data['fecha_nacimiento'],
                cargo=validated_data['cargo'],
                sucursal_id=validated_data['sucursal']
            )

            return user
        except Exception as e:
            print(f"Error durante la creación del empleado: {str(e)}")
            raise serializers.ValidationError(f"Error al crear el empleado: {str(e)}")

class ClienteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Cliente
        fields = '__all__'

class EmpleadoSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Empleado
        fields = '__all__'