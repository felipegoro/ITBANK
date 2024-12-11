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
    CuentaCreateSerializer,
    CuentaResumenSerializer,
    TipoCuentaSerializer,
    MovimientoCuentaSerializer,
)

class TipoCuentaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TipoCuenta.objects.all()
    serializer_class = TipoCuentaSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def disponibles(self, request):
        """Retorna los tipos de cuenta disponibles para crear"""
        tipos = self.get_queryset()
        serializer = self.get_serializer(tipos, many=True)
        return Response(serializer.data)

class CuentaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return CuentaCreateSerializer
        if self.action == 'list':
            return CuentaResumenSerializer
        return CuentaSerializer

    def get_queryset(self):
        return Cuenta.objects.filter(titular=self.request.user)

    def create(self, request, *args, **kwargs):
        """Crear una nueva cuenta"""
        try:
            # Agregar el titular automáticamente
            data = request.data.copy()
            data['titular'] = request.user.id
            
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            cuenta = serializer.save(titular=request.user)

            # Crear el primer movimiento como depósito inicial si existe
            saldo_inicial = Decimal(data.get('saldo_inicial', '0'))
            if saldo_inicial > 0:
                MovimientoCuenta.objects.create(
                    cuenta=cuenta,
                    tipo='DEPOSITO',
                    monto=saldo_inicial,
                    descripcion='Depósito inicial',
                    saldo_anterior=0,
                    saldo_posterior=saldo_inicial
                )
                cuenta.saldo = saldo_inicial
                cuenta.save()

            # Devolver la cuenta creada con el serializer completo
            response_serializer = CuentaSerializer(cuenta)
            return Response({
                'message': 'Cuenta creada exitosamente',
                'cuenta': response_serializer.data
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                'message': 'Error al crear la cuenta',
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def resumen(self, request):
        """Obtener resumen de todas las cuentas del usuario"""
        cuentas = self.get_queryset()
        resumen = {
            'total_pesos': sum(c.saldo for c in cuentas if c.moneda == 'ARS'),
            'total_dolares': sum(c.saldo for c in cuentas if c.moneda == 'USD'),
            'total_euros': sum(c.saldo for c in cuentas if c.moneda == 'EUR'),
            'cantidad_cuentas': cuentas.count(),
            'cuentas': CuentaResumenSerializer(cuentas, many=True).data
        }
        return Response(resumen)

    @action(detail=True, methods=['get'])
    def movimientos(self, request, pk=None):
        """Obtener movimientos de una cuenta específica"""
        cuenta = self.get_object()
        movimientos = cuenta.movimientos.all()[:10]  # Últimos 10 movimientos
        serializer = MovimientoCuentaSerializer(movimientos, many=True)
        return Response(serializer.data)

class MovimientoCuentaViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MovimientoCuentaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = MovimientoCuenta.objects.filter(
            cuenta__titular=self.request.user
        )

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

        return queryset.select_related('cuenta')

    @action(detail=False, methods=['get'])
    def resumen(self, request):
        """Obtener resumen de movimientos"""
        cuenta_id = request.query_params.get('cuenta_id')
        desde = timezone.now() - timedelta(days=30)
        
        movimientos = self.get_queryset().filter(
            fecha__gte=desde,
            cuenta_id=cuenta_id
        )

        ingresos = movimientos.filter(
            tipo__in=['DEPOSITO', 'TRANSFERENCIA_RECIBIDA']
        ).aggregate(total=Sum('monto'))['total'] or 0

        egresos = movimientos.filter(
            tipo__in=['RETIRO', 'TRANSFERENCIA_ENVIADA', 'PAGO_SERVICIO']
        ).aggregate(total=Sum('monto'))['total'] or 0

        return Response({
            'ingresos': ingresos,
            'egresos': egresos,
            'balance': ingresos - egresos,
            'periodo': {
                'desde': desde,
                'hasta': timezone.now()
            }
        })