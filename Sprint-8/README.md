# SPRINT 8

## Características Principales

### Sistema de Autenticación
- Login mediante username y contraseña
- Persistencia de sesión implementada con Redux y localStorage
- Sistema robusto de manejo de errores y validaciones
- Redirección automática al dashboard post-login
- Rutas protegidas para usuarios no autenticados

### Registro de Usuario
Formulario de registro que incluye:
- Nombre y Apellido
- DNI (validación de 8 dígitos)
- Correo electrónico
- Nombre de usuario
- Contraseña y su confirmación
- Fecha de nacimiento

Características del formulario:
- Validaciones en tiempo real
- Gestión de errores del servidor
- Redirección automática a la página de login tras registro exitoso

### Experiencia de Usuario
Tras completar el registro, los usuarios pueden visualizar su dashboard personalizado que incluye:
   - Resumen de cuenta
   - Últimos movimientos
   - Header con opciones de navegación
   - Botón de cierre de sesión para una salida segura.

