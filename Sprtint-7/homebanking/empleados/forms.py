from django import forms
from .models import Trabajador

class TrabajadorForm(forms.ModelForm): 
    class Meta:
        model = Trabajador
        fields = ['nombre_completo', 'identificacion', 'fecha_ingreso', 'oficina']
