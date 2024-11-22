from django.contrib import admin
from .models import Direccion, TipoCliente, Sucursal, Cliente

admin.site.register(Direccion)
admin.site.register(TipoCliente)
admin.site.register(Sucursal)
admin.site.register(Cliente)
