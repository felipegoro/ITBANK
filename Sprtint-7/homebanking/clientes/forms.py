from django import forms
from .models import Cliente, TipoCliente

class ClienteForm(forms.ModelForm):
    class Meta:
        model = Cliente
        fields = ['nombre', 'apellido', 'dni', 'direccion', 'tipo', 'sucursal']

class TarjetaForm(forms.Form):
    numero = forms.CharField(max_length=16)
    cvv = forms.CharField(max_length=3)
    fecha_otorgamiento = forms.DateField()
    fecha_expiracion = forms.DateField()
