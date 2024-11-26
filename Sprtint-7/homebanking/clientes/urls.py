from django.urls import path
from .views import IndexView, alta, DetailView, eliminar_tarjeta, ayuda

from . import views

app_name = "clientes"

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('nuevo/', views.alta, name='nuevo_cliente'),
    path('<int:pk>/', views.DetailView.as_view(), name='detalle'),
    path('<int:pk>/nueva-tarjeta/', views.alta_tarjeta, name='nueva_tarjeta'),
    path('ayuda/', views.ayuda, name='ayuda'),
    path('tarjeta/<int:tarjeta_id>/eliminar/', views.eliminar_tarjeta, name='eliminar_tarjeta'),
]