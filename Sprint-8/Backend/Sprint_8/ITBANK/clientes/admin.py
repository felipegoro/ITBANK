from django.contrib import admin
from .models import Usuario, Cliente, Sucursal, TipoCliente, Transaccion

admin.site.register(Usuario)
admin.site.register(Cliente)
admin.site.register(Sucursal)
admin.site.register(TipoCliente)
admin.site.register(Transaccion)