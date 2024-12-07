from django.contrib import admin
from .models import Cuenta, TipoCuenta, MovimientoCuenta

@admin.register(TipoCuenta)
class TipoCuentaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion', 'tasa_interes', 'mantenimiento_mensual', 'limite_transferencia_diaria')
    list_filter = ('nombre',)
    search_fields = ('nombre', 'descripcion')
    ordering = ('nombre',)

@admin.register(Cuenta)
class CuentaAdmin(admin.ModelAdmin):
    list_display = ('numero_cuenta', 'titular', 'tipo_cuenta', 'moneda', 'saldo', 'estado', 'fecha_apertura')
    list_filter = ('tipo_cuenta', 'moneda', 'estado')
    search_fields = ('numero_cuenta', 'cbu', 'alias', 'titular__nombre')
    date_hierarchy = 'fecha_apertura'
    readonly_fields = ('fecha_apertura', 'ultima_actividad')
    fieldsets = (
        ('Información Principal', {
            'fields': ('numero_cuenta', 'titular', 'tipo_cuenta')
        }),
        ('Detalles de Cuenta', {
            'fields': ('cbu', 'alias', 'moneda', 'saldo')
        }),
        ('Estado y Fechas', {
            'fields': ('estado', 'fecha_apertura', 'ultima_actividad')
        }),
    )

@admin.register(MovimientoCuenta)
class MovimientoCuentaAdmin(admin.ModelAdmin):
    list_display = ('fecha', 'cuenta', 'tipo', 'monto', 'saldo_anterior', 'saldo_posterior')
    list_filter = ('tipo', 'fecha', 'cuenta__tipo_cuenta')
    search_fields = ('cuenta__numero_cuenta', 'descripcion', 'referencia')
    date_hierarchy = 'fecha'
    readonly_fields = ('fecha', 'saldo_anterior', 'saldo_posterior')