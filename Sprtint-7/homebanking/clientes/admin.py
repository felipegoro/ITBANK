from django.contrib import admin
from .models import TipoCliente, Sucursal, Cliente
# Register your models here.

admin.site.register(TipoCliente)
admin.site.register(Sucursal)
admin.site.register(Cliente)

