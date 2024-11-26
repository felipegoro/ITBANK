from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Case, When, Value, IntegerField
from django.views import generic
from .models import Cliente
from tarjetas.models import Tarjeta
from .forms import ClienteForm, TarjetaForm
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

@method_decorator(login_required, name='dispatch')
class IndexView(generic.ListView):
    model = Cliente
    template_name = "clientes/index.html"
    context_object_name = "clientes"

    def get_queryset(self):
     return Cliente.objects.all().order_by(
        Case(
            When(tipo__categoria='BLACK', then=Value(1)),
            When(tipo__categoria='GOLD', then=Value(2)),
            When(tipo__categoria='CLASSIC', then=Value(3)),
            default=Value(4),
            output_field=IntegerField(),
        ),
        'dni'
    )

@login_required
def alta(request):
    if request.method == "POST":
        form = ClienteForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('clientes:index')
    else:
        form = ClienteForm()
    return render(request, 'clientes/nuevo_cliente.html', {'form': form})

@method_decorator(login_required, name='dispatch')
class DetailView(generic.DetailView):
    model = Cliente
    template_name = "clientes/detalle.html"
    context_object_name = "cliente"

@login_required
def eliminar_tarjeta(request, tarjeta_id):
    tarjeta = get_object_or_404(Tarjeta, id=tarjeta_id)
    cliente_id = tarjeta.cliente.id
    tarjeta.delete()
    return redirect('clientes:detalle', pk=cliente_id)  # Corregido de 'destalle' a 'detalle'

@login_required
def alta_tarjeta(request, pk):
    cliente = get_object_or_404(Cliente, pk=pk)
    if request.method == "POST":
        form = TarjetaForm(request.POST)
        if form.is_valid():
            tarjeta = form.save(commit=False)
            tarjeta.cliente = cliente 
            tarjeta.save()
            return redirect('clientes:detalle', pk=cliente.id)
    else:
        form = TarjetaForm()
    return render(request, 'clientes/alta_tarjeta.html', {'form': form, 'cliente': cliente})  # Cambiado de nueva_tarjeta.html a alta_tarjeta.html

@login_required
def ayuda(request):
    return render(request, 'clientes/ayuda.html')