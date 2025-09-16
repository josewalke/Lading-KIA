# ✅ Configuración de Variables de Entorno del Frontend

## 🔧 **Variable de Conexión al Backend:**

### ✅ **Variable Principal:**
```bash
VITE_BACKEND_URL=http://localhost:3001
```

### 📋 **Ubicación de la Variable:**
- **Archivo:** `frontend/.env` (crear manualmente)
- **Ejemplo:** `frontend-env-example.txt` (disponible)
- **Uso:** `import.meta.env.VITE_BACKEND_URL`

## 🚀 **Configuración Implementada:**

### ✅ **Archivo de Configuración Centralizada:**
- **Archivo:** `frontend/src/config/backend.ts`
- **Función:** Centralizar todas las URLs del backend
- **Beneficio:** Fácil cambio de entorno

### ✅ **Endpoints Configurados:**
```typescript
export const API_ENDPOINTS = {
  APPOINTMENT: `${BACKEND_URL}/api/appointment`,
  APPOINTMENTS: `${BACKEND_URL}/api/appointments`,
  STATS: `${BACKEND_URL}/api/stats`,
  HEALTH: `${BACKEND_URL}/api/health`,
  CLIENTES_KIA: `${BACKEND_URL}/api/clientes-kia`,
  CLIENTES_SEVILLA: `${BACKEND_URL}/api/clientes-sevilla`,
  NUMEROS_MOVILES: `${BACKEND_URL}/api/numeros-moviles`,
  SMS_MESSAGE: `${BACKEND_URL}/api/sms-message`,
} as const;
```

### ✅ **Archivos Actualizados:**
- ✅ `frontend/src/services/smsService.ts` - Usa API_ENDPOINTS
- ✅ `frontend/src/components/AdminLogin.tsx` - Usa API_ENDPOINTS
- ✅ `frontend/src/components/ContactForm.tsx` - Usa API_ENDPOINTS

## 🎯 **Cómo Usar:**

### 1️⃣ **Crear Archivo .env:**
```bash
cd frontend
cp ../frontend-env-example.txt .env
```

### 2️⃣ **Configurar Variable:**
```bash
# Desarrollo local
VITE_BACKEND_URL=http://localhost:3001

# Producción
VITE_BACKEND_URL=https://tu-backend-en-produccion.com
```

### 3️⃣ **Usar en el Código:**
```typescript
import { API_ENDPOINTS } from '../config/backend';

// Usar endpoint específico
const response = await fetch(API_ENDPOINTS.APPOINTMENTS);

// Usar endpoint con ID
const response = await fetch(getEndpointWithSubpath('APPOINTMENTS', `${id}/leido`));
```

## 🌐 **Entornos Soportados:**

### ✅ **Desarrollo Local:**
```bash
VITE_BACKEND_URL=http://localhost:3001
```

### ✅ **Producción (Netlify):**
```bash
VITE_BACKEND_URL=https://tu-backend-en-produccion.com
```

### ✅ **Staging:**
```bash
VITE_BACKEND_URL=https://tu-backend-staging.com
```

## 🔧 **Funciones Disponibles:**

### 1️⃣ **getEndpoint:**
```typescript
// Obtener endpoint base
const url = getEndpoint('APPOINTMENTS');

// Obtener endpoint con ID
const url = getEndpoint('APPOINTMENTS', '123');
```

### 2️⃣ **getEndpointWithSubpath:**
```typescript
// Obtener endpoint con subpath
const url = getEndpointWithSubpath('APPOINTMENTS', '123/leido');
```

## 📱 **Ejemplos de Uso:**

### ✅ **Crear Cita:**
```typescript
const response = await fetch(API_ENDPOINTS.APPOINTMENT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

### ✅ **Obtener Citas:**
```typescript
const response = await fetch(API_ENDPOINTS.APPOINTMENTS);
const data = await response.json();
```

### ✅ **Cambiar Estado Leído:**
```typescript
const response = await fetch(
  getEndpointWithSubpath('APPOINTMENTS', `${id}/leido`),
  {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ leido: true })
  }
);
```

## 🎉 **Beneficios:**

### ✅ **Configuración Centralizada:**
- ✅ **Una sola fuente** de verdad para URLs
- ✅ **Fácil cambio** de entorno
- ✅ **Mantenimiento** simplificado

### ✅ **Flexibilidad:**
- ✅ **Desarrollo local** con localhost
- ✅ **Producción** con URL real
- ✅ **Staging** con URL de pruebas

### ✅ **Type Safety:**
- ✅ **TypeScript** con tipos definidos
- ✅ **Autocompletado** en IDE
- ✅ **Prevención de errores** de URL

## 🚀 **Para Implementar:**

### 1️⃣ **Crear Archivo .env:**
```bash
cd frontend
echo "VITE_BACKEND_URL=http://localhost:3001" > .env
```

### 2️⃣ **Verificar Funcionamiento:**
```bash
npm run dev
```

### 3️⃣ **Para Producción:**
```bash
# En Netlify, configurar variable de entorno:
VITE_BACKEND_URL=https://tu-backend-en-produccion.com
```

## ✅ **Estado Actual:**
- ✅ **Configuración centralizada** implementada
- ✅ **Archivos actualizados** para usar API_ENDPOINTS
- ✅ **Frontend compila** sin errores
- ✅ **Variables de entorno** configuradas
- ✅ **Ejemplo de configuración** disponible

**¡Configuración de variables de entorno completada!** 🎉

**Variable principal:**
- 🔧 **VITE_BACKEND_URL** - URL del backend
- 📁 **frontend/.env** - Archivo de configuración
- 🎯 **API_ENDPOINTS** - Configuración centralizada
- ✅ **Funcionando** en desarrollo y producción
