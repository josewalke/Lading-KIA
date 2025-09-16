# Configuración para Netlify - Variables de Entorno

## 🔧 **Variable Requerida en Netlify:**

### ✅ **Variable de Entorno:**
```
VITE_BACKEND_URL=https://tu-backend-en-produccion.com
```

## 🚀 **Cómo Configurar en Netlify:**

### 1️⃣ **Desde el Dashboard de Netlify:**
1. Ir a tu sitio en Netlify
2. Ir a **Site settings** → **Environment variables**
3. Hacer clic en **Add variable**
4. **Key:** `VITE_BACKEND_URL`
5. **Value:** `https://tu-backend-en-produccion.com`
6. Hacer clic en **Save**

### 2️⃣ **Desde netlify.toml:**
```toml
[build.environment]
  VITE_BACKEND_URL = "https://tu-backend-en-produccion.com"
```

### 3️⃣ **Desde CLI de Netlify:**
```bash
netlify env:set VITE_BACKEND_URL "https://tu-backend-en-produccion.com"
```

## 📋 **Ejemplos de URLs para Producción:**

### ✅ **Heroku:**
```
VITE_BACKEND_URL=https://tu-app.herokuapp.com
```

### ✅ **Railway:**
```
VITE_BACKEND_URL=https://tu-app.railway.app
```

### ✅ **Render:**
```
VITE_BACKEND_URL=https://tu-app.onrender.com
```

### ✅ **Vercel:**
```
VITE_BACKEND_URL=https://tu-app.vercel.app
```

### ✅ **DigitalOcean App Platform:**
```
VITE_BACKEND_URL=https://tu-app.ondigitalocean.app
```

## 🔍 **Verificación:**

### ✅ **En el Frontend:**
```javascript
console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);
```

### ✅ **En la Consola del Navegador:**
- Abrir DevTools (F12)
- Ir a Console
- Verificar que la URL del backend sea correcta

## 🎯 **Configuración Actual:**

### ✅ **Desarrollo Local:**
```bash
# frontend/.env
VITE_BACKEND_URL=http://localhost:3001
```

### ✅ **Producción (Netlify):**
```bash
# Variable de entorno en Netlify
VITE_BACKEND_URL=https://tu-backend-en-produccion.com
```

## 🚀 **Pasos para Deploy:**

### 1️⃣ **Configurar Variable en Netlify:**
- Ir a Site settings → Environment variables
- Agregar `VITE_BACKEND_URL` con la URL de producción

### 2️⃣ **Hacer Deploy:**
- El frontend se construirá automáticamente
- Usará la variable de entorno configurada

### 3️⃣ **Verificar:**
- Abrir el sitio en producción
- Verificar que las llamadas al backend funcionen

## ✅ **Estado Actual:**

### ✅ **Frontend Configurado:**
- ✅ Archivo `.env` creado
- ✅ Variable `VITE_BACKEND_URL` configurada
- ✅ Configuración centralizada implementada
- ✅ Servidor de desarrollo funcionando

### ✅ **Listo para Netlify:**
- ✅ Variable de entorno preparada
- ✅ Configuración flexible implementada
- ✅ Fallback a localhost para desarrollo

**¡Frontend listo para configurar en Netlify!** 🎉
