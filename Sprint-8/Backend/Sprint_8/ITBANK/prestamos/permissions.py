from rest_framework.permissions import BasePermission
from empleados.models import Empleado

class IsEmpleado(BasePermission):
    def has_permission(self, request, view):
        return Empleado.objects.filter(user=request.user).exists()