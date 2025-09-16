# 🔐 Sistema de Autenticación Administrativo - KIA Sevilla

## Descripción
Sistema de autenticación robusto implementado para proteger el panel administrativo del concesionario KIA Sevilla.

## Características de Seguridad

### Backend (Node.js + Express)
- **JWT Tokens**: Autenticación basada en tokens JWT con expiración de 24 horas
- **Middleware de Autenticación**: Protección de rutas administrativas
- **Logs de Seguridad**: Registro detallado de intentos de login y acceso
- **Variables de Entorno**: Configuración segura de contraseñas y secretos

### Frontend (React + TypeScript)
- **Servicio de Autenticación**: Gestión centralizada de tokens y sesiones
- **Persistencia Local**: Almacenamiento seguro en localStorage
- **Verificación Automática**: Validación de tokens al cargar la aplicación
- **Headers Automáticos**: Inyección automática de tokens en peticiones

## Endpoints de Autenticación

### POST `/api/auth/login`
**Descripción**: Autenticación de administrador
**Body**:
```json
{
  "password": "kia-sevilla-2024"
}
```
**Respuesta Exitosa**:
```json
{
  "success": true,
  "message": "Autenticación exitosa",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "admin",
    "role": "administrator"
  },
  "expiresIn": "24h"
}
```

### GET `/api/auth/verify`
**Descripción**: Verificación de token válido
**Headers**: `Authorization: Bearer <token>`
**Respuesta**:
```json
{
  "success": true,
  "message": "Token válido",
  "user": {
    "username": "admin",
    "role": "administrator",
    "loginTime": "2024-01-15T10:30:00.000Z"
  }
}
```

## Rutas Protegidas

Las siguientes rutas requieren autenticación válida:

- `GET /api/appointments` - Lista de citas
- `GET /api/stats` - Estadísticas del sistema
- `PUT /api/appointments/:id/leido` - Marcar como leído/no leído
- `DELETE /api/appointments/:id` - Eliminar cita
- `DELETE /api/appointments/clear-all` - Limpiar base de datos

## Configuración

### Variables de Entorno (Backend)
```env
JWT_SECRET=kia-sevilla-2024-secret-key
ADMIN_PASSWORD=kia-sevilla-2024
```

### Configuración del Frontend
```typescript
// Configuración automática en authService.ts
const authService = new AuthService();
```

## Flujo de Autenticación

1. **Login Inicial**:
   - Usuario ingresa contraseña
   - Frontend envía petición a `/api/auth/login`
   - Backend valida contraseña y genera JWT
   - Token se almacena en localStorage

2. **Verificación Automática**:
   - Al cargar la aplicación, se verifica el token
   - Si es válido, se mantiene la sesión
   - Si es inválido, se redirige al login

3. **Peticiones Protegidas**:
   - Headers de autorización se inyectan automáticamente
   - Backend valida token en cada petición
   - Si token expira, se solicita nuevo login

## Seguridad Implementada

### Backend
- ✅ Validación de contraseñas
- ✅ Tokens JWT con expiración
- ✅ Middleware de autenticación
- ✅ Logs de seguridad detallados
- ✅ Manejo de errores robusto

### Frontend
- ✅ Gestión segura de tokens
- ✅ Verificación automática de sesión
- ✅ Limpieza de datos al logout
- ✅ Headers de autorización automáticos
- ✅ Manejo de errores de autenticación

## Uso del Panel Administrativo

1. **Acceso**: `http://localhost:3000/admin`
2. **Contraseña**: `kia-sevilla-2024`
3. **Funcionalidades**:
   - Ver todas las citas registradas
   - Estadísticas en tiempo real
   - Marcar citas como leídas/no leídas
   - Filtrar por estado de lectura
   - Información detallada de cada cliente

## Logs de Seguridad

El sistema registra automáticamente:
- Intentos de login (exitosos y fallidos)
- Verificaciones de tokens
- Acceso a rutas protegidas
- Errores de autenticación

Ejemplo de log:
```
🔐 [AUTH] Intento de login [abc123]: {
  timestamp: "2024-01-15T10:30:00.000Z",
  ip: "192.168.1.100",
  userAgent: "Mozilla/5.0..."
}
```

## Mantenimiento

### Renovar Contraseña
1. Actualizar variable `ADMIN_PASSWORD` en el backend
2. Reiniciar el servidor backend
3. Los usuarios deberán hacer login nuevamente

### Cambiar JWT Secret
1. Actualizar variable `JWT_SECRET` en el backend
2. Reiniciar el servidor backend
3. Todos los tokens existentes se invalidarán

## Estado del Sistema

- ✅ **Backend**: Autenticación implementada y funcionando
- ✅ **Frontend**: Servicio de autenticación integrado
- ✅ **Protección**: Todas las rutas administrativas protegidas
- ✅ **Logs**: Sistema de logging de seguridad activo
- ✅ **Testing**: Sistema probado y funcionando

---

**Fecha de implementación**: 16 de septiembre de 2024  
**Desarrollado para**: Nuevo Concesionario KIA Sevilla  
**Estado**: ✅ FUNCIONANDO CORRECTAMENTE
