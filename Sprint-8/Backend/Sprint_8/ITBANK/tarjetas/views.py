from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum
from django.utils import timezone
from datetime import timedelta
from .models import Tarjeta, TipoTarjeta, MarcaTarjeta
from .serializers import TarjetaSerializer, TipoTarjetaSerializer, MarcaTarjetaSerializer

class TarjetaViewSet(viewsets.ModelViewSet):
    serializer_class = TarjetaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Tarjeta.objects.all()
        return Tarjeta.objects.filter(cliente__user=self.request.user)

    @action(detail=False, methods=['get'])
    def dashboard(self, request):
        """Obtener resumen de tarjetas para el dashboard"""
        tarjetas = self.get_queryset()
        
        resumen = {
            'total_tarjetas': tarjetas.count(),
            'tarjetas_activas': tarjetas.filter(activa=True).count(),
            'limite_total': tarjetas.aggregate(total=Sum('limite_credito'))['total'] or 0,
            'consumo_total': tarjetas.aggregate(total=Sum('consumo_actual'))['total'] or 0
        }

        return Response({
            'resumen': resumen,
            'theme': {
                'primary': '#1976d2',
                'secondary': '#9c27b0',
                'background': '#f5f5f5'
            }
        })

    @action(detail=True, methods=['post'])
    def bloquear(self, request, pk=None):
        """Bloquear una tarjeta"""
        tarjeta = self.get_object()
        if not tarjeta.activa:
            return Response({
                'error': 'La tarjeta ya está bloqueada',
                'theme': {
                    'color': '#9c27b0'  # Color secundario para error
                }
            }, status=status.HTTP_400_BAD_REQUEST)

        tarjeta.activa = False
        tarjeta.fecha_baja = timezone.now()
        tarjeta.save()

        return Response({
            'message': 'Tarjeta bloqueada exitosamente',
            'theme': {
                'color': '#1976d2'  # Color primario para éxito
            }
        })

    @action(detail=True, methods=['post'])
    def renovar(self, request, pk=None):
        """Renovar una tarjeta"""
        tarjeta = self.get_object()
        if not request.user.is_staff:
            return Response({
                'error': 'No autorizado',
                'theme': {
                    'color': '#9c27b0'
                }
            }, status=status.HTTP_403_FORBIDDEN)

        # Calcular nueva fecha de vencimiento
        nueva_fecha = timezone.now() + timedelta(days=365*3)  # 3 años
        tarjeta.fecha_vencimiento = nueva_fecha
        tarjeta.save()

        return Response({
            'message': 'Tarjeta renovada exitosamente',
            'nueva_fecha': nueva_fecha,
            'theme': {
                'color': '#1976d2'
            }
        })

    @action(detail=True, methods=['get'])
    def consumos(self, request, pk=None):
        """Obtener resumen de consumos de la tarjeta"""
        tarjeta = self.get_object()
        
        # Aquí podrías agregar lógica para obtener consumos detallados
        resumen_consumos = {
            'limite_credito': tarjeta.limite_credito,
            'consumo_actual': tarjeta.consumo_actual,
            'disponible': tarjeta.limite_credito - tarjeta.consumo_actual,
            'estado': 'Activa' if tarjeta.activa else 'Bloqueada'
        }

        return Response({
            'consumos': resumen_consumos,
            'theme': {
                'primary': '#1976d2',
                'secondary': '#9c27b0',
                'background': '#f5f5f5'
            }
        })

class TipoTarjetaViewSet(viewsets.ModelViewSet):
    queryset = TipoTarjeta.objects.all()
    serializer_class = TipoTarjetaSerializer
    permission_classes = [IsAuthenticated]

class MarcaTarjetaViewSet(viewsets.ModelViewSet):
    queryset = MarcaTarjeta.objects.all()
    serializer_class = MarcaTarjetaSerializer
    permission_classes = [IsAuthenticated]