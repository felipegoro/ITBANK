from django.urls import path
from . import views

app_name = 'tarjetas'

urlpatterns = [
    path('editar/<int:tarjeta_id>/', views.editar_tarjeta, name='editar_tarjeta'),
    path('eliminar/<int:tarjeta_id>/', views.eliminar_tarjeta, name='eliminar_tarjeta'),
]