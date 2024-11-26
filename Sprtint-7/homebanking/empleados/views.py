# views.py
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Empleado
from .forms import EmpleadoForm
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

# Vista para listar empleados
@method_decorator(login_required, name='dispatch')
class EmpleadoListView(ListView):
    model = Empleado
    context_object_name = 'empleados'

# Vista para ver el detalle de un empleado
@method_decorator(login_required, name='dispatch')
class EmpleadoDetailView(DetailView):
    model = Empleado
    template_name = 'empleados/detalle_empleado.html'

# Vista para crear un nuevo empleado
@method_decorator(login_required, name='dispatch')
class EmpleadoCreateView(CreateView):
    model = Empleado
    form_class = EmpleadoForm
    template_name = 'empleados/crear_empleado.html'
    success_url = reverse_lazy('empleados:lista_empleados')

# Vista para editar un empleado existente
@method_decorator(login_required, name='dispatch')
class EmpleadoUpdateView(UpdateView):
    model = Empleado
    form_class = EmpleadoForm
    template_name = 'empleados/editar_empleado.html'
    success_url = reverse_lazy('empleados:lista_empleados')

# Vista para eliminar un empleado
@method_decorator(login_required, name='dispatch')
class EmpleadoDeleteView(DeleteView):
    model = Empleado
    template_name = 'empleados/eliminar_empleado.html'
    success_url = reverse_lazy('empleados:lista_empleados')
