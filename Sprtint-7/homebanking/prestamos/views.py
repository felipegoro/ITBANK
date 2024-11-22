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
        tipo_prestamo_id = request.POST.get('tipo_cliente')
        tipo_prestamo = TipoPrestamo.objects.get(id=tipo_prestamo_id)
        valor = float(request.POST['valor'])

        # Validación según el tipo de cliente
        if tipo_prestamo.nombre == 'Classic' and valor > 100000:
            return HttpResponse("El monto excede el permitido para el tipo Classic.")
        if tipo_prestamo.nombre == 'Gold' and valor > 300000:
            return HttpResponse("El monto excede el permitido para el tipo Gold.")
        if tipo_prestamo.nombre == 'Black' and valor > 500000:
            return HttpResponse("El monto excede el permitido para el tipo Black.")

        prestamo = Prestamo(
            cliente=cliente,
            tipo=tipo_prestamo,
            valor=valor,
            fecha=request.POST['fecha']
        )
        prestamo.save()
        return redirect('prestamos:lista_prestamos', cliente_id=cliente.id)

    tipos_prestamo = TipoPrestamo.objects.all()
    return render(request, 'prestamos/crear_prestamo.html', {'cliente': cliente, 'tipos_prestamo': tipos_prestamo})


def pagar_prestamo(request, prestamo_id):
    prestamo = get_object_or_404(Prestamo, pk=prestamo_id)
    if request.method == 'POST':
        cliente_id = prestamo.cliente.id
        prestamo.delete()
        return redirect('prestamos:lista_prestamos', cliente_id=cliente_id)
    return render(request, 'prestamos/pagar_prestamo.html', {'prestamo': prestamo})
