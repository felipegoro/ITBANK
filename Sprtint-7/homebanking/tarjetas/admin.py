from django.contrib import admin
from .models import TipoTarjeta, Tarjeta, MarcaTarjeta


admin.site.register(TipoTarjeta)
admin.site.register(Tarjeta)
admin.site.register(MarcaTarjeta)
