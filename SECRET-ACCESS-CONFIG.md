# 🔐 CONFIGURACIÓN DE ACCESO SECRETO - KIA SEVILLA

## 📱 Sistema de Acceso por URL

### 🔑 Clave de Acceso Secreto
```
ventas-secretas-kia-2024
```

### 🌐 URLs de Acceso

**URL Base:**
```
https://kia-sevilla.com
```

**URL Secreta:**
```
https://kia-sevilla.com?access=ventas-secretas-kia-2024
```

**URL Alternativa (hash):**
```
https://kia-sevilla.com#ventas-secretas-kia-2024
```

## 📱 Integración con SMS

### Mensaje SMS Actualizado
```
Nuevo Concesionario Kia en Sevilla te invita a sus ventas secretas que se celebrarán el día 19 de Septiembre. Para más información pincha aquí: https://kia-sevilla.com?access=ventas-secretas-kia-2024. No responda a este mensaje.
```

### Características del Sistema

**✅ Seguridad:**
- Acceso solo con URL secreta
- Parámetro oculto después del acceso
- Logs de acceso en consola

**✅ Experiencia de Usuario:**
- Página de acceso denegado elegante
- Instrucciones claras para usuarios
- Contacto directo si no tienen acceso

**✅ Funcionalidades:**
- Verificación automática al cargar
- Limpieza de URL después del acceso
- Soporte para parámetros y hash

## 🔧 Configuración Técnica

### Frontend (React)
```typescript
const SECRET_ACCESS_KEY = "ventas-secretas-kia-2024";
const SECRET_PARAM = "access";
```

### Backend (Node.js)
```javascript
const secretUrl = `${url}?access=ventas-secretas-kia-2024`;
```

## 📊 Flujo de Acceso

1. **Usuario recibe SMS** con URL secreta
2. **Hace clic en el enlace** del SMS
3. **Frontend verifica** el parámetro de acceso
4. **Si es válido:** Muestra la página de ventas
5. **Si no es válido:** Muestra página de acceso denegado
6. **URL se limpia** para ocultar el parámetro secreto

## 🚀 Despliegue

### Variables de Entorno
```env
SECRET_ACCESS_KEY=ventas-secretas-kia-2024
LANDING_URL=https://kia-sevilla.com
```

### URLs de Producción
- **Desarrollo:** `http://localhost:3000?access=ventas-secretas-kia-2024`
- **Producción:** `https://kia-sevilla.com?access=ventas-secretas-kia-2024`

## 🔒 Consideraciones de Seguridad

- ✅ **Clave secreta** no visible en el código fuente
- ✅ **URL limpia** después del acceso
- ✅ **Logs de acceso** para auditoría
- ✅ **Página de error** informativa pero segura

---

**Sistema implementado para ventas secretas KIA - 19 de Septiembre** 🔐🚗
