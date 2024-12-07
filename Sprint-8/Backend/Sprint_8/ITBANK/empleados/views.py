from rest_framework import viewsets, permissions
from .models import Empleado, Cargo, Turno, Ausencia
from .serializers import EmpleadoSerializer, CargoSerializer, TurnoSerializer, AusenciaSerializer

class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Empleado.objects.all()
        return Empleado.objects.filter(user=self.request.user)

class CargoViewSet(viewsets.ModelViewSet):
    queryset = Cargo.objects.all()
    serializer_class = CargoSerializer
    permission_classes = [permissions.IsAuthenticated]

class TurnoViewSet(viewsets.ModelViewSet):
    queryset = Turno.objects.all()
    serializer_class = TurnoSerializer
    permission_classes = [permissions.IsAuthenticated]

class AusenciaViewSet(viewsets.ModelViewSet):
    queryset = Ausencia.objects.all()
    serializer_class = AusenciaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Ausencia.objects.all()
        return Ausencia.objects.filter(empleado__user=self.request.user)