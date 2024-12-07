from rest_framework import serializers
from .models import Prestamo, TipoPrestamo
from decimal import Decimal

class TipoPrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoPrestamo
        fields = '__all__'

class PrestamoSerializer(serializers.ModelSerializer):
    estado_display = serializers.CharField(source='get_estado_display', read_only=True)
    cliente_nombre = serializers.CharField(source='cliente.nombre', read_only=True)
    sucursal_nombre = serializers.CharField(source='sucursal.nombre', read_only=True)
    tipo_nombre = serializers.CharField(source='tipo.nombre', read_only=True)

    class Meta:
        model = Prestamo
        fields = '__all__'
        read_only_fields = ('cuota_mensual', 'fecha_solicitud', 'estado')

    def validate(self, data):
        tipo_prestamo = data['tipo']
        valor = data['valor']
        plazo_meses = data['plazo_meses']

        # Validar monto máximo
        if valor > tipo_prestamo.monto_maximo:
            raise serializers.ValidationError(
                f"El monto excede el máximo permitido para este tipo de préstamo ({tipo_prestamo.monto_maximo})"
            )

        # Validar plazo máximo
        if plazo_meses > tipo_prestamo.plazo_maximo:
            raise serializers.ValidationError(
                f"El plazo excede el máximo permitido para este tipo de préstamo ({tipo_prestamo.plazo_maximo} meses)"
            )

        # Validar capacidad de pago
        cuota_estimada = self.calcular_cuota_mensual(valor, tipo_prestamo.tasa_interes, plazo_meses)
        if cuota_estimada > data['cliente'].ingresos_mensuales * Decimal('0.30'):
            raise serializers.ValidationError(
                "La cuota mensual excede el 30% de los ingresos mensuales del cliente"
            )

        return data

    def calcular_cuota_mensual(self, valor, tasa_interes, plazo_meses):
        tasa_mensual = tasa_interes / Decimal('1200')
        factor = (1 - (1 + tasa_mensual) ** -plazo_meses) / tasa_mensual
        return valor / factor