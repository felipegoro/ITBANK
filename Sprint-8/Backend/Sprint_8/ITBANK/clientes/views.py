from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Usuario, Transaccion
from .serializers import UsuarioSerializer, TransaccionSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filtrar usuarios según permisos
        if self.request.user.is_staff:
            return Usuario.objects.all()
        return Usuario.objects.filter(id=self.request.user.id)

    @action(detail=True, methods=['get'])
    def dashboard_info(self, request, pk=None):
        """Obtener información del dashboard del usuario"""
        usuario = self.get_object()
        return Response({
            'theme': {
                'primary': '#1976d2',
                'secondary': '#9c27b0',
                'background': '#f5f5f5'
            },
            'user_data': UsuarioSerializer(usuario).data
        })

class TransaccionViewSet(viewsets.ModelViewSet):
    queryset = Transaccion.objects.all()
    serializer_class = TransaccionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filtrar transacciones según el usuario
        if self.request.user.is_staff:
            return Transaccion.objects.all()
        return Transaccion.objects.filter(cliente__user=self.request.user)

    @action(detail=True, methods=['post'])
    def aprobar(self, request, pk=None):
        """Aprobar una transacción"""
        transaccion = self.get_object()
        transaccion.estado = 'APROBADA'
        transaccion.save()
        return Response({
            'message': 'Transacción aprobada',
            'status': 'success',
            'theme': {
                'color': '#1976d2'  # Usando el color primario del tema
            }
        })

    @action(detail=True, methods=['post'])
    def rechazar(self, request, pk=None):
        """Rechazar una transacción"""
        transaccion = self.get_object()
        transaccion.estado = 'RECHAZADA'
        transaccion.save()
        return Response({
            'message': 'Transacción rechazada',
            'status': 'error',
            'theme': {
                'color': '#9c27b0'  # Usando el color secundario del tema
            }
        })