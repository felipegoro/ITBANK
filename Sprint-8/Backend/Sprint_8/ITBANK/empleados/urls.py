from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmpleadoViewSet, CargoViewSet, TurnoViewSet, AusenciaViewSet

router = DefaultRouter()
router.register(r'empleados', EmpleadoViewSet)
router.register(r'cargos', CargoViewSet)
router.register(r'turnos', TurnoViewSet)
router.register(r'ausencias', AusenciaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]