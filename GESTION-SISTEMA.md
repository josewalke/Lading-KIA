# 🚗 Sistema KIA - Gestión de Servicios

## 📋 Comandos Disponibles

### 🚀 Iniciar Servicios
```bash
# Iniciar backend (con logs visibles)
./kia.sh backend

# Iniciar frontend
./kia.sh frontend
```

### 📊 Ver Logs
```bash
# Ver logs del backend en tiempo real
./kia.sh logs
```

### 🛑 Control del Sistema
```bash
# Detener todos los procesos
./kia.sh stop

# Ver estado de los servicios
./kia.sh status

# Mostrar ayuda
./kia.sh help
```

## 🌐 URLs del Sistema

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Panel Admin**: http://localhost:3000/admin

## 🔐 Acceso Administrativo

- **URL**: http://localhost:3000/admin
- **Contraseña**: `kia-sevilla-2024`

## 📊 Flujo de Trabajo Recomendado

### 1. Iniciar Backend
```bash
./kia.sh backend
```
*Se abrirá en la terminal actual con logs visibles*

### 2. Iniciar Frontend (en otra terminal)
```bash
./kia.sh frontend
```
*Se abrirá en otra terminal*

### 3. Ver Logs (en una tercera terminal)
```bash
./kia.sh logs
```
*Para monitorear actividad del backend*

### 4. Acceder al Panel
- Abrir navegador: http://localhost:3000/admin
- Ingresar contraseña: `kia-sevilla-2024`

## 🔧 Configuración

### Variables de Entorno (Backend)
- `JWT_SECRET`: Clave secreta para tokens JWT
- `ADMIN_PASSWORD`: Contraseña del panel administrativo
- `DATABASE_URL`: URL de la base de datos (SQLite para desarrollo)

### Base de Datos
- **Desarrollo**: SQLite (`database.sqlite`)
- **Producción**: PostgreSQL (Neon)

## 📁 Estructura de Archivos

```
kia.sh              # Script maestro
backend/
  start.sh          # Iniciar backend
  logs.sh           # Ver logs
  server.js         # Servidor principal
  database.js       # Gestión de BD
  .env              # Variables de entorno
frontend/
  start.sh          # Iniciar frontend
  src/
    services/
      authService.ts # Servicio de autenticación
    components/
      AdminLogin.tsx # Componente de login
```

## 🚨 Solución de Problemas

### Backend no inicia
```bash
# Verificar estado
./kia.sh status

# Ver logs
./kia.sh logs

# Reiniciar
./kia.sh stop
./kia.sh backend
```

### Frontend no carga
```bash
# Verificar que el backend esté ejecutándose
./kia.sh status

# Reiniciar frontend
cd frontend && npm run dev
```

### Error de autenticación
- Verificar que la contraseña sea: `kia-sevilla-2024`
- Verificar que el backend esté ejecutándose en puerto 3001
- Revisar logs del backend: `./kia.sh logs`

---

**Desarrollado para**: Nuevo Concesionario KIA Sevilla  
**Fecha**: 16 de septiembre de 2024  
**Estado**: ✅ FUNCIONANDO
