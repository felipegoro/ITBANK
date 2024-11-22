from django.shortcuts import render, redirect, get_object_or_404
from django.views import generic
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from .models import Cliente
from tarjetas.models import Tarjeta  
from .forms import CustomerForm, CardForm

@method_decorator(login_required, name='dispatch')
class CustomersListView(generic.ListView):
    model = Cliente
    template_name = "clientes/lista_clientes.html"
    context_object_name = "customers"

@login_required
def register_customer(request):
    if request.method == "POST":
        form = CustomerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('clientes:home')
    else:
        form = CustomerForm()
    return render(request, 'clientes/registro_cliente.html', {'form': form})

@method_decorator(login_required, name='dispatch')
class CustomerDetailView(generic.DetailView):
    model = Cliente
    template_name = "clientes/detalle_cliente.html"
    context_object_name = "customer"

@login_required
def delete_card(request, card_id):
    tarjeta = get_object_or_404(Tarjeta, id=card_id)  
    customer_id = tarjeta.cliente.id 
    tarjeta.delete()  
    return redirect('clientes:detail', pk=customer_id)

@login_required
def add_card(request, pk):
    customer = get_object_or_404(Cliente, pk=pk)
    if request.method == "POST":
        form = CardForm(request.POST)
        if form.is_valid():
            tarjeta = form.save(commit=False) 
            tarjeta.cliente = customer  
            tarjeta.save()  
            return redirect('clientes:detail', pk=customer.id)
    else:
        form = CardForm()
    return render(request, 'clientes/agregar_tarjeta.html', {'form': form, 'customer': customer})
