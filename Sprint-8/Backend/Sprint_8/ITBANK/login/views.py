from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, get_user_model
from django.db import transaction
from datetime import datetime
from .serializers import (
    LoginSerializer, 
    ClienteRegisterSerializer,
    EmpleadoRegisterSerializer,
    ClienteSerializer,
    EmpleadoSerializer
)
from clientes.models import Cliente, TipoCliente
from empleados.models import Empleado

Usuario = get_user_model()

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)

            if user:
                # Obtener el perfil correspondiente
                try:
                    if user.is_staff:
                        profile = Empleado.objects.get(usuario=user)
                        profile_serializer = EmpleadoSerializer(profile)
                    else:
                        profile = Cliente.objects.get(usuario=user)
                        profile_serializer = ClienteSerializer(profile)

                    return Response({
                        'message': 'Login exitoso',
                        'user': {
                            'id': user.id,
                            'username': user.username,
                            'email': user.email,
                            'first_name': user.first_name,
                            'last_name': user.last_name,
                            'is_staff': user.is_staff,
                            **profile_serializer.data
                        }
                    })
                except (Cliente.DoesNotExist, Empleado.DoesNotExist):
                    return Response({
                        'error': 'Perfil no encontrado'
                    }, status=status.HTTP_404_NOT_FOUND)
            
            return Response({
                'error': 'Credenciales inválidas'
            }, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request):
        print("Datos recibidos:", request.data)
        serializer = ClienteRegisterSerializer(data=request.data)
        
        if not serializer.is_valid():
            print("Errores de validación:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = serializer.save()
            return Response({
                'message': 'Cliente registrado exitosamente',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'is_staff': False
                }
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            print("Error durante el registro:", str(e))
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class RegisterEmployeeView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        if not request.user.is_staff:
            return Response({
                'error': 'No tiene permisos para registrar empleados'
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = EmpleadoRegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                return Response({
                    'message': 'Empleado registrado exitosamente',
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'is_staff': True
                    }
                }, status=status.HTTP_201_CREATED)

            except Exception as e:
                return Response({
                    'error': str(e)
                }, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response({
                'message': 'Sesión cerrada exitosamente'
            })
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)