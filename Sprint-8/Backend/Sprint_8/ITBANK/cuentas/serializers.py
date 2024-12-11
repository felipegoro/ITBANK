from rest_framework import serializers
from .models import Cuenta, TipoCuenta, MovimientoCuenta
from decimal import Decimal

class TipoCuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCuenta
        fields = [
            'id', 
            'nombre', 
            'descripcion', 
            'tasa_interes',
            'mantenimiento_mensual',
            'limite_transferencia_diaria',
            'limite_retiro_diario',
            'saldo_minimo'
        ]

class MovimientoCuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovimientoCuenta
        fields = [
            'id',
            'cuenta',
            'fecha',
            'tipo',
            'monto',
            'saldo_anterior',
            'saldo_posterior',
            'descripcion',
            'referencia'
        ]
        read_only_fields = ['fecha', 'saldo_anterior', 'saldo_posterior', 'referencia']

class CuentaCreateSerializer(serializers.ModelSerializer):
    saldo_inicial = serializers.DecimalField(
        max_digits=12,
        decimal_places=2,
        required=False,
        default=Decimal('0.00')
    )

    class Meta:
        model = Cuenta
        fields = [
            'tipo_cuenta',
            'moneda',
            'saldo_inicial',
        ]

    def validate(self, data):
        tipo_cuenta = data.get('tipo_cuenta')
        saldo_inicial = data.get('saldo_inicial', Decimal('0.00'))

        # Validar saldo mínimo
        if saldo_inicial < tipo_cuenta.saldo_minimo:
            raise serializers.ValidationError(
                f"El saldo inicial debe ser mayor o igual a {tipo_cuenta.saldo_minimo}"
            )

        return data

class CuentaSerializer(serializers.ModelSerializer):
    tipo_cuenta = TipoCuentaSerializer(read_only=True)
    movimientos = MovimientoCuentaSerializer(many=True, read_only=True)
    ultimo_movimiento = serializers.SerializerMethodField()
    
    class Meta:
        model = Cuenta
        fields = [
            'id',
            'numero_cuenta',
            'cbu',
            'alias',
            'titular',
            'tipo_cuenta',
            'saldo',
            'moneda',
            'fecha_apertura',
            'estado',
            'ultima_actividad',
            'movimientos',
            'ultimo_movimiento'
        ]
        read_only_fields = [
            'numero_cuenta',
            'cbu',
            'alias',
            'fecha_apertura',
            'ultima_actividad'
        ]

    def get_ultimo_movimiento(self, obj):
        ultimo = obj.movimientos.first()
        if ultimo:
            return {
                'fecha': ultimo.fecha,
                'tipo': ultimo.tipo,
                'monto': ultimo.monto,
                'descripcion': ultimo.descripcion
            }
        return None

class CuentaResumenSerializer(serializers.ModelSerializer):
    tipo_cuenta = serializers.StringRelatedField()
    
    class Meta:
        model = Cuenta
        fields = [
            'id',
            'numero_cuenta',
            'tipo_cuenta',
            'saldo',
            'moneda',
            'estado'
        ]