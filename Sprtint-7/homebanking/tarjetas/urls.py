from django.urls import path
from . import views

urlpatterns = [
    path('tarjetas/', views.tarjetas_list, name='tarjetas_list'),  # Ruta para listar las tarjetas
]
