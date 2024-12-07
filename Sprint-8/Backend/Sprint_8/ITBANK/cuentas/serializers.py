from rest_framework import serializers
from .models import Cuenta, TipoCuenta, MovimientoCuenta

class TipoCuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCuenta
        fields = '__all__'

class MovimientoCuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovimientoCuenta
        fields = '__all__'

class CuentaSerializer(serializers.ModelSerializer):
    tipo_cuenta = TipoCuentaSerializer(read_only=True)
    movimientos = MovimientoCuentaSerializer(many=True, read_only=True)

    class Meta:
        model = Cuenta
        fields = '__all__'