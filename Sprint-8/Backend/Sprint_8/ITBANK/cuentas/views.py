from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum
from django.utils import timezone
from datetime import timedelta
from decimal import Decimal
from .models import Cuenta, TipoCuenta, MovimientoCuenta
from .serializers import (
    CuentaSerializer,
    TipoCuentaSerializer,
    MovimientoCuentaSerializer,
)

class TipoCuentaViewSet(viewsets.ModelViewSet):
    queryset = TipoCuenta.objects.all()
    serializer_class = TipoCuentaSerializer
    permission_classes = [IsAuthenticated]

class CuentaViewSet(viewsets.ModelViewSet):
    serializer_class = CuentaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Cuenta.objects.all()
        return Cuenta.objects.filter(cliente__user=self.request.user)

    @action(detail=True, methods=['get'])
    def balance(self, request, pk=None):
        cuenta = self.get_object()
        return Response({
            'saldo': cuenta.saldo,
            'tipo_cuenta': cuenta.tipo_cuenta.nombre,
            'limite_extraccion': cuenta.tipo_cuenta.limite_extraccion_diario,
            'theme': {
                'color': '#1976d2'
            }
        })

    @action(detail=True, methods=['post'])
    def transferir(self, request, pk=None):
        cuenta_origen = self.get_object()
        monto = Decimal(request.data.get('monto', 0))
        cuenta_destino_id = request.data.get('cuenta_destino')

        try:
            cuenta_destino = Cuenta.objects.get(id=cuenta_destino_id)
            if cuenta_origen.saldo >= monto:
                # Crear movimientos
                MovimientoCuenta.objects.create(
                    cuenta=cuenta_origen,
                    tipo='RETIRO',
                    monto=monto,
                    descripcion=f'Transferencia a cuenta {cuenta_destino.numero}'
                )
                MovimientoCuenta.objects.create(
                    cuenta=cuenta_destino,
                    tipo='DEPOSITO',
                    monto=monto,
                    descripcion=f'Transferencia desde cuenta {cuenta_origen.numero}'
                )
                
                # Actualizar saldos
                cuenta_origen.saldo -= monto
                cuenta_destino.saldo += monto
                cuenta_origen.save()
                cuenta_destino.save()

                return Response({
                    'message': 'Transferencia exitosa',
                    'status': 'success',
                    'theme': {
                        'color': '#1976d2'
                    }
                })
            else:
                return Response({
                    'message': 'Saldo insuficiente',
                    'status': 'error',
                    'theme': {
                        'color': '#9c27b0'
                    }
                }, status=status.HTTP_400_BAD_REQUEST)
        except Cuenta.DoesNotExist:
            return Response({
                'message': 'Cuenta destino no encontrada',
                'status': 'error',
                'theme': {
                    'color': '#9c27b0'
                }
            }, status=status.HTTP_404_NOT_FOUND)

class MovimientoCuentaViewSet(viewsets.ModelViewSet):
    serializer_class = MovimientoCuentaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = MovimientoCuenta.objects.all()
        if not self.request.user.is_staff:
            queryset = queryset.filter(cuenta__cliente__user=self.request.user)

        # Filtros
        cuenta_id = self.request.query_params.get('cuenta_id')
        tipo = self.request.query_params.get('tipo')
        desde = self.request.query_params.get('desde')
        hasta = self.request.query_params.get('hasta')

        if cuenta_id:
            queryset = queryset.filter(cuenta_id=cuenta_id)
        if tipo:
            queryset = queryset.filter(tipo=tipo)
        if desde:
            queryset = queryset.filter(fecha__gte=desde)
        if hasta:
            queryset = queryset.filter(fecha__lte=hasta)

        return queryset

    @action(detail=False, methods=['get'])
    def resumen(self, request):
        cuenta_id = request.query_params.get('cuenta_id')
        desde = timezone.now() - timedelta(days=30)
        
        movimientos = self.get_queryset().filter(
            fecha__gte=desde,
            cuenta_id=cuenta_id
        )

        ingresos = movimientos.filter(
            tipo='DEPOSITO'
        ).aggregate(total=Sum('monto'))['total'] or 0

        egresos = movimientos.filter(
            tipo='RETIRO'
        ).aggregate(total=Sum('monto'))['total'] or 0

        return Response({
            'ingresos': ingresos,
            'egresos': egresos,
            'balance': ingresos - egresos,
            'theme': {
                'ingresos': '#1976d2',
                'egresos': '#9c27b0',
                'background': '#f5f5f5'
            }
        })