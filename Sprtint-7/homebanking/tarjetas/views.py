from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Tarjeta
from .forms import TarjetaForm

@login_required
def editar_tarjeta(request, tarjeta_id):
    tarjeta = get_object_or_404(Tarjeta, id=tarjeta_id)
    if request.method == "POST":
        form = TarjetaForm(request.POST, instance=tarjeta)
        if form.is_valid():
            form.save()
            return redirect('clientes:detalle', pk=tarjeta.cliente.id)
    else:
        form = TarjetaForm(instance=tarjeta)
    return render(request, 'tarjetas/editar_tarjeta.html', {
        'form': form,
        'tarjeta': tarjeta
    })

@login_required
def eliminar_tarjeta(request, tarjeta_id):
    tarjeta = get_object_or_404(Tarjeta, id=tarjeta_id)
    cliente_id = tarjeta.cliente.id
    if request.method == "POST":
        tarjeta.delete()
        return redirect('clientes:detalle', pk=cliente_id)
    return render(request, 'tarjetas/eliminar_tarjeta.html', {'tarjeta': tarjeta})