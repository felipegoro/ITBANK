from django.urls import path
from .views import LoginView, RegisterView, RegisterEmployeeView, LogoutView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('register/employee/', RegisterEmployeeView.as_view(), name='register-employee'),
    path('logout/', LogoutView.as_view(), name='logout'),
]