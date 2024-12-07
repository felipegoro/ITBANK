from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CuentaViewSet, TipoCuentaViewSet, MovimientoCuentaViewSet

router = DefaultRouter()
router.register(r'cuentas', CuentaViewSet, basename='cuenta')
router.register(r'tipos', TipoCuentaViewSet, basename='tipo-cuenta')
router.register(r'movimientos', MovimientoCuentaViewSet, basename='movimiento')

urlpatterns = [
    path('', include(router.urls)),
]