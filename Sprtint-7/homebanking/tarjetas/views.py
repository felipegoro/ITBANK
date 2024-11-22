from django.shortcuts import render
from .models import Tarjeta  

def tarjetas_list(request):
    tarjetas = Tarjeta.objects.all()  
    return render(request, 'tarjetas/tarjetas_list.html', {'tarjetas': tarjetas})
