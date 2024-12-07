from rest_framework import serializers
from .models import Usuario, Transaccion

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        read_only_fields = ('fecha_registro',)

    def validate_numero_documento(self, value):
        if self.instance and self.instance.numero_documento == value:
            return value
        if Usuario.objects.filter(numero_documento=value).exists():
            raise serializers.ValidationError("Este número de documento ya está registrado")
        return value

class TransaccionSerializer(serializers.ModelSerializer):
    emisor_nombre = serializers.CharField(source='emisor.nombre', read_only=True)
    receptor_nombre = serializers.CharField(source='receptor.nombre', read_only=True)

    class Meta:
        model = Transaccion
        fields = '__all__'
        read_only_fields = ('fecha', 'estado')

    def validate(self, data):
        if data['emisor'] == data['receptor']:
            raise serializers.ValidationError("El emisor y receptor no pueden ser el mismo")
        if data['monto'] <= 0:
            raise serializers.ValidationError("El monto debe ser mayor a 0")
        return data