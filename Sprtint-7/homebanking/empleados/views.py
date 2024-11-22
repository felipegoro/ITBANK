from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Trabajador
from .forms import TrabajadorForm
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

@method_decorator(login_required, name='dispatch')
class TrabajadorListView(ListView):
    model = Trabajador
    context_object_name = 'trabajadores'

@method_decorator(login_required, name='dispatch')
class TrabajadorDetailView(DetailView):
    model = Trabajador
    template_name = 'empleados/detalle_trabajador.html'

@method_decorator(login_required, name='dispatch')
class TrabajadorCreateView(CreateView):
    model = Trabajador
    form_class = TrabajadorForm
    template_name = 'empleados/crear_trabajador.html'
    success_url = reverse_lazy('empleados:lista_trabajadores')

@method_decorator(login_required, name='dispatch')
class TrabajadorUpdateView(UpdateView):
    model = Trabajador
    form_class = TrabajadorForm
    template_name = 'empleados/editar_trabajador.html'
    success_url = reverse_lazy('empleados:lista_trabajadores')

@method_decorator(login_required, name='dispatch')
class TrabajadorDeleteView(DeleteView):
    model = Trabajador
    template_name = 'empleados/eliminar_trabajador.html'
    success_url = reverse_lazy('empleados:lista_trabajadores')
