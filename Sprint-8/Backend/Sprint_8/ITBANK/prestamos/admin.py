from django.contrib import admin
from .models import Prestamo, TipoPrestamo

@admin.register(TipoPrestamo)
class TipoPrestamoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tasa_interes', 'plazo_maximo', 'monto_maximo')
    search_fields = ('nombre',)
    list_filter = ('tasa_interes',)

@admin.register(Prestamo)
class PrestamoAdmin(admin.ModelAdmin):
    list_display = ('cliente', 'tipo', 'valor', 'estado', 'fecha_solicitud', 'sucursal')
    list_filter = ('estado', 'tipo', 'sucursal', 'fecha_solicitud')
    search_fields = ('cliente__nombre', 'cliente__apellido', 'cliente__dni')
    date_hierarchy = 'fecha_solicitud'
    readonly_fields = ('cuota_mensual',)
    fieldsets = (
        ('Información Principal', {
            'fields': ('cliente', 'tipo', 'valor', 'plazo_meses')
        }),
        ('Estado', {
            'fields': ('estado', 'fecha_solicitud', 'fecha_aprobacion')
        }),
        ('Detalles', {
            'fields': ('sucursal', 'cuota_mensual', 'observaciones')
        }),
    )