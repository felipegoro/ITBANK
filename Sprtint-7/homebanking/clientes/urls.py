from django.urls import path
from . import views

app_name = "clientes"

urlpatterns = [
    path('', views.CustomersListView.as_view(), name='home'),
    path('new/', views.register_customer, name='new_customer'),
    path('<int:pk>/', views.CustomerDetailView.as_view(), name='detail'),
    path('<int:pk>/add_card/', views.add_card, name='add_card'),
    path('<int:card_id>/delete/', views.delete_card, name='delete_card'),
]
