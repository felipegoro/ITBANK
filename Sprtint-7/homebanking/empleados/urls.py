from django.urls import path
from .views import EmpleadoListView, EmpleadoCreateView, EmpleadoUpdateView, EmpleadoDetailView, EmpleadoDeleteView

app_name = 'empleados'

urlpatterns = [
    path('', EmpleadoListView.as_view(), name='lista_empleados'),
    path('crear/', EmpleadoCreateView.as_view(), name='crear_empleado'),
    path('editar/<int:pk>/', EmpleadoUpdateView.as_view(), name='editar_empleado'),
    path('detalle/<int:pk>/', EmpleadoDetailView.as_view(), name='detalle_empleado'),
    path('eliminar/<int:pk>/', EmpleadoDeleteView.as_view(), name='eliminar_empleado'),
]