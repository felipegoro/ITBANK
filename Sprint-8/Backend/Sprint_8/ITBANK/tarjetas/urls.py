from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TarjetaViewSet, TipoTarjetaViewSet, MarcaTarjetaViewSet  # Agregué los nuevos ViewSets

router = DefaultRouter()
router.register(r'tarjetas', TarjetaViewSet, basename='tarjetas')
router.register(r'tipos-tarjeta', TipoTarjetaViewSet)
router.register(r'marcas-tarjeta', MarcaTarjetaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]