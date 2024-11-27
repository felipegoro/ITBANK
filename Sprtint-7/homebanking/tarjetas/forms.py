from django import forms
from .models import Tarjeta

class TarjetaForm(forms.ModelForm):
    class Meta:
        model = Tarjeta
        fields = ['numero', 'cvv', 'fecha_expiracion', 'fecha_otorgamiento', 'tipo', 'marca']
        widgets = {
            'fecha_expiracion': forms.DateInput(attrs={'type': 'date'}),
            'fecha_otorgamiento': forms.DateInput(attrs={'type': 'date'}),
        }