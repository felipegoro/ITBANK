from django import forms
from .models import Cliente
from tarjetas.models import Tarjeta

class CustomerForm(forms.ModelForm):
    class Meta:
        model = Cliente
        fields = ['nombre', 'apellido', 'numero_identificacion', 'fecha_nacimiento', 'categoria', 'direcciones']
        widgets = {
            'fecha_nacimiento': forms.DateInput(attrs={'type': 'date'}),
        }

class CardForm(forms.ModelForm):
    class Meta:
        model = Tarjeta
        fields = ['numero', 'fecha_expiracion', 'fecha_otorgamiento', 'cvv', 'tipo', 'marca']
        widgets = {
            'fecha_expiracion': forms.DateInput(attrs={'type': 'date'}),
            'fecha_otorgamiento': forms.DateInput(attrs={'type': 'date'}),
        }
