"""
URL configuration for hombanking project.

The `urlpatterns` list routes URLs to views. For more information please see:
https://docs.djangoproject.com/en/5.1/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('', include('login.urls')),
    path('admin/', admin.site.urls),
    path('clientes/', include('clientes.urls')),
    path('empleados/', include('empleados.urls')),
    path('prestamos/', include('prestamos.urls')),
    path('tarjetas/', include('tarjetas.urls')),
    path('cuentas/', include('cuentas.urls')),
]
