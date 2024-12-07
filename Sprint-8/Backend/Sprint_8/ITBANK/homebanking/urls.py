from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

# Configuración mejorada de Swagger
schema_view = get_schema_view(
   openapi.Info(
      title="ITBANK API",
      default_version='v1',
      description="API Documentation for ITBANK Homebanking System",
      terms_of_service="https://www.itbank.com/terms/",
      contact=openapi.Contact(email="contact@itbank.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
   authentication_classes=(),
)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # API Endpoints
    path('api/auth/', include('login.urls')),  # Autenticación
    path('api/clientes/', include('clientes.urls')),
    path('api/empleados/', include('empleados.urls')),
    path('api/tarjetas/', include('tarjetas.urls')),
    path('api/cuentas/', include('cuentas.urls')),
    path('api/prestamos/', include('prestamos.urls')),
    
    # JWT Authentication endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # API Documentation
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
    # Debug Toolbar (solo en desarrollo)
    path('__debug__/', include('debug_toolbar.urls')) if settings.DEBUG else None,
]

# Servir archivos media en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Personalización del admin
admin.site.site_header = 'ITBANK Administración'
admin.site.site_title = 'ITBANK Admin Portal'
admin.site.index_title = 'Bienvenido al Portal de Administración de ITBANK'