from django.urls import path
from . import views

app_name = 'prestamos'

urlpatterns = [
    path('<int:cliente_id>/', views.lista_prestamos, name='lista_prestamos'),
    path('crear/<int:cliente_id>/', views.crear_prestamo, name='crear_prestamo'),
    path('<int:prestamo_id>/', views.detalle_prestamo, name='detalle_prestamo'),
    path('<int:prestamo_id>/pagar/', views.pagar_prestamo, name='pagar_prestamo'),
]
