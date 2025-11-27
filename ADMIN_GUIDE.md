# Administrador de Landing - Guía de Uso

## Acceso al Administrador

### URL
```
http://localhost:3000/admin
```

### Credenciales por Defecto
- **Usuario:** `admin`
- **Contraseña:** `admin123`

> 💡 **Nota:** En producción, cambia estas credenciales por valores seguros.

---

## Características del Administrador

### 1. **Editor de Sección Principal**
Accede desde el dashboard para editar:

#### Texto
- ✏️ **Descripción Principal:** Texto que aparece bajo el logo
- ✏️ **Texto del Botón:** Personaliza el texto del botón "Hablemos"

#### Imágenes
- 📤 **Imagen de Fondo (Desktop):** Para pantallas de escritorio (1024px+)
- 📤 **Imagen de Fondo (Mobile):** Para dispositivos móviles (< 1024px)
- 📤 **Logo/Imagen Principal:** Imagen que aparece sobre el texto

### 2. **Características de Carga de Imágenes**
- ✅ Cualquier formato de imagen (JPG, PNG, WebP, GIF, etc.)
- ✅ Cualquier tamaño de archivo
- ✅ Las imágenes se almacenan localmente en el navegador (Base64)
- ✅ Previsualizaciones en tiempo real
- ✅ Versiones separadas para Desktop y Mobile

### 3. **Vista Previa en Tiempo Real**
- 💻 **Vista Desktop:** Simula pantalla de 1024px+
- 📱 **Vista Mobile:** Simula pantalla de 375x667px

---

## Almacenamiento de Datos

### Ubicación
Los datos se guardan en **localStorage** del navegador:
- **Clave:** `admin-content`
- **Ubicación:** Developer Tools → Application → Local Storage

### Persistencia
✅ Los cambios se guardan automáticamente  
✅ Los datos persisten entre sesiones  
✅ No requiere backend o servidor  

### Backup/Exportar
Para hacer backup de tu contenido:
1. Abre DevTools (F12)
2. Ve a Console
3. Copia: `localStorage.getItem('admin-content')`
4. Guarda el JSON en un archivo seguro

---

## Flujo de Trabajo

### Paso 1: Iniciar Sesión
```
1. Ir a http://localhost:3000/admin
2. Ingresar usuario: admin
3. Ingresar contraseña: admin123
4. Hacer clic en "Iniciar Sesión"
```

### Paso 2: Acceder al Editor
```
1. Se abre el Dashboard Admin
2. En la barra lateral, hacer clic en "📸 Sección Principal"
3. Se muestra el editor con vista previa
```

### Paso 3: Editar Contenido
```
1. Modificar textos en los campos
2. Cargar imágenes haciendo clic en los botones
3. Ver cambios en tiempo real en la vista previa
```

### Paso 4: Guardar Cambios
```
1. Hacer clic en "💾 Guardar Cambios"
2. Aparecerá una notificación de confirmación
3. Los cambios se aplican inmediatamente en la landing
```

### Paso 5: Ver Cambios en Vivo
```
1. Hacer clic en "Ir a Landing" en la barra de navegación
2. O navegar a http://localhost:3000/
3. Ver los cambios reflejados en la landing
```

---

## Opciones Avanzadas

### Revertir Cambios
- 🔄 Botón **"Revertir"** devuelve al último estado guardado
- No afecta el contenido por defecto, solo los cambios actuales

### Contenido por Defecto
Si quieres resetear al contenido original:
1. Abre DevTools (F12)
2. Ve a Application → Local Storage
3. Busca la clave `admin-content`
4. Haz clic derecho y selecciona "Delete"
5. Recarga la página

---

## Integración en la Landing

### Cómo Funciona
1. El componente `HeroSection` detecta automáticamente si hay contenido en localStorage
2. Si existe, usa ese contenido
3. Si no, usa los valores por defecto
4. La página se actualiza inmediatamente al guardar cambios

### Responsive Design
- **Desktop (≥1024px):** Usa `backgroundImageDesktop`
- **Mobile (<1024px):** Usa `backgroundImageMobile`
- Los tamaños de texto se adaptan automáticamente

---

## Estructura de Datos

El contenido se almacena en este formato:

```json
{
  "heroSection": {
    "title": "",
    "description": "Tu descripción aquí",
    "backgroundImageDesktop": "data:image/...",
    "backgroundImageMobile": "data:image/...",
    "logoImage": "data:image/...",
    "buttonText": "Hablemos"
  }
}
```

---

## Próximas Mejoras

Secciones que se agregarán:
- ✍️ Editor de Blog
- 📚 Galería de Imágenes
- ⚙️ Configuración General
- 🔐 Panel de Usuarios

---

## Troubleshooting

### Los cambios no se guardan
- Verificar que localStorage no esté deshabilitado
- Limpiar cache del navegador
- Verificar en DevTools → Application

### Las imágenes no se cargan
- Verificar tamaño del archivo
- Intentar con otro formato (JPG, PNG)
- Limpiar localStorage y reintentar

### ¿Perdí mis cambios?
- Los cambios se guardan automáticamente
- Si se cierran cookies/localStorage, se pierde el contenido
- Hacer backup regularmente

---

## Soporte

Para cambiar credenciales o agregar más funcionalidades, consulta el código en:
- `src/utils/auth.js` - Sistema de autenticación
- `src/hooks/useAdminContent.js` - Sistema de almacenamiento
- `src/pages/AdminDashboard.jsx` - Panel de control
