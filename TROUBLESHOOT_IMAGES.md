# 🔧 Solución de Problemas - Carga de Imágenes

## ❌ "No me deja subir imágenes"

### Causas Comunes y Soluciones

#### 1️⃣ **Imágenes Demasiado Grandes**
- **Problema:** localStorage tiene límite de ~5-10MB
- **Solución:** Comprimir la imagen antes de subir

```
Tamaño máximo recomendado por imagen:
- Desktop: 1-2 MB
- Mobile: 500KB - 1MB
- Logo: 100-200 KB

Herramientas para comprimir:
✅ https://tinypng.com
✅ https://compressor.io
✅ Adobe Photoshop
✅ Online Image Compressor
```

#### 2️⃣ **Navegador Sin Espacio en localStorage**
- **Síntoma:** Error "QuotaExceededError"
- **Solución:** Limpiar localStorage

```javascript
// En DevTools Console:
localStorage.clear();
// O específicamente:
localStorage.removeItem('admin-content');
```

#### 3️⃣ **El Archivo No Es Válido**
- **Problema:** Formato no soportado
- **Solución:** Usar formatos estándar

```
✅ Soportados: JPG, PNG, WebP, GIF, SVG
❌ No soportados: PSD, AI, TIFF, etc.
```

#### 4️⃣ **Javascript Deshabilitado**
- **Síntoma:** Nada funciona en el admin
- **Solución:** Habilitar JavaScript en el navegador

#### 5️⃣ **Cache/Cookies Bloqueadas**
- **Síntoma:** localStorage no funciona
- **Solución:** Permitir cookies para este sitio

---

## 🛠️ Pasos para Resolver

### Paso 1: Verificar Tamaño del Archivo
```
1. Click derecho en imagen → Propiedades
2. Revisar tamaño
3. Si > 2MB → Comprimir
```

### Paso 2: Comprimir Imagen
```
Windows:
- https://tinypng.com (web)
- Paint: Guardar como → Ajustar calidad

Mac:
- Preview: Herramientas → Ajustar tamaño

Online:
- tinypng.com
- compressor.io
```

### Paso 3: Limpiar localStorage
```
1. Abrir DevTools (F12)
2. Application → Local Storage
3. Seleccionar dominio
4. Buscar 'admin-content'
5. Eliminar (Delete)
6. Recargar página
```

### Paso 4: Reintentar Subida
```
1. Click en "📤 Seleccionar Imagen"
2. Elegir imagen comprimida
3. Ver notificación "✅ Imagen cargada"
4. Click "💾 Guardar Cambios"
5. Ver confirmación "✅ Cambios guardados"
```

---

## 📊 Checklist de Diagnóstico

```
¿Es muy grande la imagen?
  → Sí: Comprimir y reintentar

¿El navegador soporta localStorage?
  → No: Usar Chrome, Firefox, Safari, Edge

¿localStorage está lleno?
  → Sí: Limpiar localStorage

¿El archivo está corrupto?
  → Sí: Usar otro archivo

¿JavaScript está deshabilitado?
  → Sí: Habilitar JavaScript

¿Las cookies están bloqueadas?
  → Sí: Permitir cookies

Todavía no funciona?
  → Ver console en DevTools (F12)
```

---

## 🖥️ Abrir DevTools para Ver Errores

### Chrome / Edge / Firefox
```
Presionar: F12 o Ctrl+Shift+I

Ir a: Console
Ver si hay mensajes de error rojos
```

### Safari
```
Safari → Preferencias → Pestaña Avanzadas
Habilitar "Mostrar menú Desarrollo"

Luego: Desarrollo → Mostrar JavaScript Console
```

---

## 🚀 Tamaños Recomendados

### Desktop Background
- **Tamaño:** 1920x1080px
- **Peso:** 1-2 MB
- **Formato:** JPG (mejor compresión)

### Mobile Background
- **Tamaño:** 750x1334px
- **Peso:** 500KB-1MB
- **Formato:** JPG o WebP

### Logo
- **Tamaño:** 200x200px
- **Peso:** 100-200 KB
- **Formato:** PNG (con transparencia)

---

## 📈 Monitoreo en Tiempo Real

### Ver Tamaño de Datos
```
1. Ir a http://localhost:3000/admin/dashboard
2. Abrir Console (F12)
3. Copiar: 
   localStorage.getItem('admin-content').length / 1024 / 1024

   Resultado: Tamaño en MB
```

### Límite Disponible
```
Máximo recomendado: 5MB
Máximo del navegador: ~10MB (varía)
Límite crítico: 5.5MB
```

---

## ✅ Éxito - Indicadores

✅ Ver notificación "✅ Imagen cargada"  
✅ Ver imagen en preview  
✅ Botón "💾 Guardar Cambios" activo  
✅ Notificación "✅ Cambios guardados"  
✅ Cambios visibles en la landing  

---

## 🎬 Video Tutorial (Pasos)

1. **Preparar Imagen**
   - Descargar imagen de 1920x1080
   - Ir a tinypng.com
   - Subir y descargar comprimida
   - Anota tamaño: debe ser < 2MB

2. **Acceder al Admin**
   - http://localhost:3000/admin
   - Login: admin / admin123

3. **Subir Imagen**
   - Click "📤 Seleccionar Imagen Desktop"
   - Seleccionar imagen comprimida
   - Esperar a "✅ Imagen cargada"

4. **Ver Preview**
   - Imagen aparece en preview
   - Click tab "💻 Desktop"

5. **Guardar**
   - Click "💾 Guardar Cambios"
   - Esperar a "✅ Cambios guardados"

6. **Verificar**
   - Click "Ir a Landing"
   - Ver imagen en la sección principal

---

## 🔧 Debug Avanzado

### Si aún no funciona, ejecuta en Console:

```javascript
// Ver localStorage:
console.log(localStorage.getItem('admin-content'));

// Ver tamaño:
const data = localStorage.getItem('admin-content');
console.log('Tamaño:', (data.length / 1024 / 1024).toFixed(2), 'MB');

// Limpiar todo:
localStorage.clear();
console.log('localStorage limpiado');

// Verificar browser:
console.log('User Agent:', navigator.userAgent);

// Verificar localStorage disponible:
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  console.log('✅ localStorage funciona');
} catch(e) {
  console.log('❌ localStorage no disponible');
}
```

---

## 📞 Si Nada Funciona

1. **Limpiar caché del navegador**
   - Ctrl+Shift+Del
   - Seleccionar "Todo"
   - Borrar

2. **Usar incógnito/privado**
   - Ctrl+Shift+N
   - Probar en ventana privada

3. **Usar otro navegador**
   - Chrome, Firefox, Safari, Edge

4. **Reiniciar el servidor**
   ```bash
   Ctrl+C (para el servidor)
   npm run dev (reiniciar)
   ```

5. **Verificar logs en terminal**
   - Ver si hay errores en el terminal donde corre `npm run dev`

---

**Versión:** 1.0  
**Última actualización:** 27 de noviembre de 2025

¡Con estos pasos deberías poder subir imágenes sin problemas! 🚀
