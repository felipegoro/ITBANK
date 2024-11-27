from django.urls import path
from .views import IndexView, DetailView, nueva_tarjeta, eliminar_tarjeta, ayuda, nuevo_cliente

app_name = 'clientes'

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('<int:pk>/', DetailView.as_view(), name='detalle'),
    path('<int:pk>/nueva-tarjeta/', nueva_tarjeta, name='nueva_tarjeta'),
    path('nuevo/', nuevo_cliente, name='nuevo_cliente'),
    path('tarjeta/<int:tarjeta_id>/eliminar/', eliminar_tarjeta, name='eliminar_tarjeta'),
    path('ayuda/', ayuda, name='ayuda'),
]