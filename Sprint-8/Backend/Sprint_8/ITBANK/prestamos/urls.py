from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PrestamoViewSet, TipoPrestamoViewSet  # Agregué TipoPrestamoViewSet

router = DefaultRouter()
router.register(r'prestamos', PrestamoViewSet, basename='prestamos')
router.register(r'tipos-prestamo', TipoPrestamoViewSet)  # Agregué esta ruta

urlpatterns = [
    path('', include(router.urls)),
]