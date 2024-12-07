from rest_framework import serializers
from .models import Empleado, Cargo, Turno, Ausencia

class CargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargo
        fields = '__all__'

class TurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno
        fields = '__all__'

class AusenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ausencia
        fields = '__all__'

class EmpleadoSerializer(serializers.ModelSerializer):
    cargo = CargoSerializer(read_only=True)
    turnos = TurnoSerializer(many=True, read_only=True)
    ausencias = AusenciaSerializer(many=True, read_only=True)

    class Meta:
        model = Empleado
        fields = '__all__'