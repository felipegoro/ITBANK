from django import forms
from .models import Cliente
from tarjetas.models import Tarjeta

from django import forms
from .models import Cliente

class ClienteForm(forms.ModelForm):
    class Meta:
        model = Cliente
        fields = ['nombre', 'apellido', 'dni', 'direccion', 'tipo', 'sucursal']

