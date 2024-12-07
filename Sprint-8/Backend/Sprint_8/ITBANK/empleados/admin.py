from django.contrib import admin
from .models import Empleado, Cargo, Turno, Ausencia

@admin.register(Cargo)
class CargoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'area', 'nivel', 'salario_base')
    list_filter = ('area', 'nivel')
    search_fields = ('nombre', 'descripcion')
    ordering = ('area', 'nivel')

@admin.register(Turno)
class TurnoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'hora_inicio', 'hora_fin')
    search_fields = ('nombre', 'descripcion')

@admin.register(Empleado)
class EmpleadoAdmin(admin.ModelAdmin):
    list_display = ('get_nombre_completo', 'cargo', 'sucursal', 'turno', 
                   'fecha_contratacion', 'activo', 'evaluacion_desempeño')
    list_filter = ('activo', 'cargo', 'sucursal', 'turno')
    search_fields = ('user__first_name', 'user__last_name', 'dni', 'numero_legajo')
    date_hierarchy = 'fecha_contratacion'
    fieldsets = (
        ('Información Personal', {
            'fields': ('user', 'dni', 'telefono', 'fecha_nacimiento', 'direccion')
        }),
        ('Información Laboral', {
            'fields': ('cargo', 'sucursal', 'turno', 'numero_legajo', 'fecha_contratacion')
        }),
        ('Estado', {
            'fields': ('activo', 'vacaciones_disponibles', 'evaluacion_desempeño')
        }),
    )

    def get_nombre_completo(self, obj):
        return obj.user.get_full_name()
    get_nombre_completo.short_description = 'Nombre Completo'

@admin.register(Ausencia)
class AusenciaAdmin(admin.ModelAdmin):
    list_display = ('empleado', 'tipo', 'fecha_inicio', 'fecha_fin', 'aprobada')
    list_filter = ('tipo', 'aprobada')
    search_fields = ('empleado__user__first_name', 'empleado__user__last_name', 'justificacion')
    date_hierarchy = 'fecha_inicio'