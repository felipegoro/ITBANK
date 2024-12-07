from django.contrib import admin
from .models import Tarjeta, TipoTarjeta, MarcaTarjeta

@admin.register(TipoTarjeta)
class TipoTarjetaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'limite_credito')
    search_fields = ('nombre',)

@admin.register(MarcaTarjeta)
class MarcaTarjetaAdmin(admin.ModelAdmin):
    list_display = ('nombre',)
    search_fields = ('nombre',)

@admin.register(Tarjeta)
class TarjetaAdmin(admin.ModelAdmin):
    list_display = ('numero_enmascarado', 'cliente', 'marca', 'tipo', 'activa', 'tarjeta_principal')
    list_filter = ('marca', 'tipo', 'activa', 'tarjeta_principal')
    search_fields = ('numero', 'cliente__nombre', 'cliente__apellido')
    date_hierarchy = 'fecha_otorgamiento'
    readonly_fields = ('fecha_otorgamiento',)

    def numero_enmascarado(self, obj):
        return f"**** **** **** {obj.numero[-4:]}"
    numero_enmascarado.short_description = "Número de Tarjeta"