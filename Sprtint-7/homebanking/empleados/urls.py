from django.urls import path
from .views import (
    TrabajadorListView,
    TrabajadorCreateView,
    TrabajadorUpdateView,
    TrabajadorDetailView,
    TrabajadorDeleteView
)

app_name = 'empleados'

urlpatterns = [
    path('', TrabajadorListView.as_view(), name='lista_trabajadores'),
    path('crear/', TrabajadorCreateView.as_view(), name='crear_trabajador'),
    path('editar/<int:pk>/', TrabajadorUpdateView.as_view(), name='editar_trabajador'),
    path('detalle/<int:pk>/', TrabajadorDetailView.as_view(), name='detalle_trabajador'),
    path('eliminar/<int:pk>/', TrabajadorDeleteView.as_view(), name='eliminar_trabajador'),
]
