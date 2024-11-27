from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Prestamo, TipoPrestamo
from clientes.models import Cliente

def lista_prestamos(request, cliente_id):
    cliente = get_object_or_404(Cliente, pk=cliente_id)
    prestamos = Prestamo.objects.filter(cliente=cliente)
    return render(request, 'prestamos/lista_prestamos.html', {'prestamos': prestamos, 'cliente': cliente})

def detalle_prestamo(request, prestamo_id):
    prestamo = get_object_or_404(Prestamo, pk=prestamo_id)
    return render(request, 'prestamos/detalle_prestamo.html', {'prestamo': prestamo})

def crear_prestamo(request, cliente_id):
    cliente = get_object_or_404(Cliente, pk=cliente_id)
    if request.method == 'POST':
        tipo_prestamo_id = request.POST['tipo_cliente']
        tipo_prestamo = TipoPrestamo.objects.get(id=tipo_prestamo_id)
        valor_solicitado = float(request.POST['valor'])

        
        prestamos_actuales = Prestamo.objects.filter(cliente=cliente)
        total_prestamos = sum(float(prestamo.valor) for prestamo in prestamos_actuales)
        
        
        if total_prestamos + valor_solicitado <= float(cliente.limite_prestamo):
            valor = valor_solicitado
        else:
            return HttpResponse(
                f"El monto solicitado excede el límite permitido. "
                f"Límite total: ${cliente.limite_prestamo}, "
                f"Préstamos actuales: ${total_prestamos}, "
                f"Disponible: ${float(cliente.limite_prestamo) - total_prestamos}"
            )

        nuevo_prestamo = Prestamo(
            valor=valor,
            tipo=tipo_prestamo,
            fecha=request.POST['fecha'],
            cliente=cliente
        )
        nuevo_prestamo.save()
        return redirect('prestamos:lista_prestamos', cliente_id=cliente.id)

    tipos_prestamo = TipoPrestamo.objects.all()
    prestamos_actuales = Prestamo.objects.filter(cliente=cliente)
    total_prestamos = sum(float(prestamo.valor) for prestamo in prestamos_actuales)
    disponible = float(cliente.limite_prestamo) - total_prestamos

    return render(request, 'prestamos/crear_prestamo.html', {
        'cliente': cliente, 
        'tipos_prestamo': tipos_prestamo,
        'limite_prestamo': cliente.limite_prestamo,
        'total_prestamos': total_prestamos,
        'disponible': disponible
    })

def pagar_prestamo(request, prestamo_id):
    prestamo = get_object_or_404(Prestamo, pk=prestamo_id)
    if request.method == 'POST':
        cliente_id = prestamo.cliente.id
        prestamo.delete()
        return redirect('prestamos:lista_prestamos', cliente_id=cliente_id)
    return render(request, 'prestamos/pagar_prestamo.html', {'prestamo': prestamo})
