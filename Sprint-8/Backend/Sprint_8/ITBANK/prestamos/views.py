from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum
from django.utils import timezone
from .models import Prestamo, TipoPrestamo
from .serializers import PrestamoSerializer, TipoPrestamoSerializer
from .permissions import IsEmpleado

class PrestamoViewSet(viewsets.ModelViewSet):
    serializer_class = PrestamoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Prestamo.objects.all()
        return Prestamo.objects.filter(cliente__user=self.request.user)

    @action(detail=False, methods=['get'])
    def dashboard(self, request):
        """Obtener resumen de préstamos para el dashboard"""
        prestamos = self.get_queryset()
        total_prestamos = prestamos.count()
        monto_total = prestamos.aggregate(total=Sum('monto'))['total'] or 0
        
        prestamos_por_estado = {
            'PENDIENTE': prestamos.filter(estado='PENDIENTE').count(),
            'APROBADO': prestamos.filter(estado='APROBADO').count(),
            'RECHAZADO': prestamos.filter(estado='RECHAZADO').count()
        }

        return Response({
            'total_prestamos': total_prestamos,
            'monto_total': monto_total,
            'prestamos_por_estado': prestamos_por_estado,
            'theme': {
                'primary': '#1976d2',
                'secondary': '#9c27b0',
                'background': '#f5f5f5'
            }
        })

    @action(detail=True, methods=['post'])
    def aprobar(self, request, pk=None):
        """Aprobar un préstamo"""
        prestamo = self.get_object()
        if not request.user.is_staff:
            return Response({
                'error': 'No autorizado',
                'theme': {
                    'color': '#9c27b0'  # Color secundario para error
                }
            }, status=status.HTTP_403_FORBIDDEN)

        if prestamo.estado != 'PENDIENTE':
            return Response({
                'error': 'Solo se pueden aprobar préstamos pendientes',
                'theme': {
                    'color': '#9c27b0'
                }
            }, status=status.HTTP_400_BAD_REQUEST)

        prestamo.estado = 'APROBADO'
        prestamo.fecha_aprobacion = timezone.now()
        prestamo.save()

        return Response({
            'message': 'Préstamo aprobado exitosamente',
            'theme': {
                'color': '#1976d2'  # Color primario para éxito
            }
        })

    @action(detail=True, methods=['post'])
    def rechazar(self, request, pk=None):
        """Rechazar un préstamo"""
        prestamo = self.get_object()
        if not request.user.is_staff:
            return Response({
                'error': 'No autorizado',
                'theme': {
                    'color': '#9c27b0'
                }
            }, status=status.HTTP_403_FORBIDDEN)

        if prestamo.estado != 'PENDIENTE':
            return Response({
                'error': 'Solo se pueden rechazar préstamos pendientes',
                'theme': {
                    'color': '#9c27b0'
                }
            }, status=status.HTTP_400_BAD_REQUEST)

        prestamo.estado = 'RECHAZADO'
        prestamo.save()

        return Response({
            'message': 'Préstamo rechazado',
            'theme': {
                'color': '#1976d2'
            }
        })

class TipoPrestamoViewSet(viewsets.ModelViewSet):
    queryset = TipoPrestamo.objects.all()
    serializer_class = TipoPrestamoSerializer
    permission_classes = [IsAuthenticated, IsEmpleado]