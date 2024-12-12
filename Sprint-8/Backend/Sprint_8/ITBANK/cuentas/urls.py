from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CuentaViewSet, TipoCuentaViewSet, MovimientoCuentaViewSet

router = DefaultRouter()
router.register(r'cuentas', CuentaViewSet, basename='cuenta')
router.register(r'tipos-cuenta', TipoCuentaViewSet, basename='tipo-cuenta')  # Asegúrate de que esta línea esté presente
router.register(r'movimientos', MovimientoCuentaViewSet, basename='movimiento')

urlpatterns = [
    path('', include(router.urls)),
]