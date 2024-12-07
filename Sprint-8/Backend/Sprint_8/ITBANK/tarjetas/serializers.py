from rest_framework import serializers
from .models import Tarjeta, TipoTarjeta, MarcaTarjeta
from datetime import date

class MarcaTarjetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarcaTarjeta
        fields = '__all__'

class TipoTarjetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoTarjeta
        fields = '__all__'

class TarjetaSerializer(serializers.ModelSerializer):
    marca_nombre = serializers.CharField(source='marca.nombre', read_only=True)
    tipo_nombre = serializers.CharField(source='tipo.nombre', read_only=True)
    cliente_nombre = serializers.CharField(source='cliente.nombre', read_only=True)
    numero_enmascarado = serializers.SerializerMethodField()

    class Meta:
        model = Tarjeta
        fields = '__all__'
        read_only_fields = ('limite_actual',)

    def get_numero_enmascarado(self, obj):
        return f"**** **** **** {obj.numero[-4:]}"

    def validate(self, data):
        # Validar fecha de expiración
        if data.get('fecha_expiracion'):
            if data['fecha_expiracion'] <= date.today():
                raise serializers.ValidationError(
                    "La fecha de expiración debe ser futura"
                )

        # Validar tarjeta principal
        if data.get('tarjeta_principal'):
            cliente = data.get('cliente')
            if Tarjeta.objects.filter(
                cliente=cliente,
                tarjeta_principal=True
            ).exists():
                raise serializers.ValidationError(
                    "El cliente ya tiene una tarjeta principal"
                )

        return data