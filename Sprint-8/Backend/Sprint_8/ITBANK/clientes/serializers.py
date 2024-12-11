from rest_framework import serializers
from .models import Usuario, Transaccion
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Usuario
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'dni', 'fecha_nacimiento')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Usuario(**validated_data)
        user.set_password(password)
        user.save()
        return user
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