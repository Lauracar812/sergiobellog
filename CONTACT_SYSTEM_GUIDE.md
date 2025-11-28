# 📧 Guía de Sistema de Contacto y Mensajes

## 📝 Descripción General

Se ha implementado un sistema completo de gestión de contactos que incluye:

1. **Modal de Contacto** - Formulario minimalista en el sitio web
2. **Servidor Backend** - API Node.js para procesar mensajes
3. **Panel de Admin** - Interfaz para gestionar mensajes recibidos
4. **Base de Datos** - Tabla en Supabase para almacenar mensajes

---

## 🚀 Instalación y Configuración

### 1. Instalar Dependencias

```bash
npm install
```

El `package.json` se ha actualizado con las nuevas dependencias:
- `dotenv` - Para variables de entorno
- `concurrently` - Para ejecutar frontend y backend en paralelo

### 2. Configurar Variables de Entorno

Edita `.env.local` y asegúrate de tener:

```env
# Supabase
VITE_SUPABASE_URL=tu_url_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima

# Backend (opcional, por defecto es localhost:5000)
REACT_APP_BACKEND_URL=http://localhost:5000
BACKEND_PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 3. Crear Tabla en Supabase

Ejecuta el SQL contenido en `SQL_CONTACT_MESSAGES.sql` en el Supabase SQL Editor:

```sql
-- Tabla para almacenar mensajes de contacto
CREATE TABLE contact_messages (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived', 'deleted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  archived_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Índices y políticas RLS...
```

---

## 🎯 Cómo Usar

### Para Usuarios del Sitio Web

**Acceder al formulario de contacto:**

1. Haz clic en cualquier botón "Hablemos" en:
   - Sección Hero (Principal)
   - Sección de Libros
   - Sección de Servicios
   - Sección de Blog

2. Se abrirá un modal con campos para:
   - **Nombre** (requerido)
   - **Email** (requerido)
   - **Teléfono** (opcional)
   - **Mensaje** (requerido)

3. Haz clic en "Enviar Mensaje"

4. Verás un mensaje de confirmación si se envió correctamente

### Para Administrador

**Acceder al panel de mensajes:**

1. Ve a `http://localhost:3000/admin`
2. Inicia sesión con:
   - **Usuario:** `admin`
   - **Contraseña:** `admin123`

3. En el sidebar izquierdo, haz clic en "Mensajes" (icono de sobre)

**Gestionar mensajes:**

- **Ver lista:** Se muestran todos los mensajes recibidos
- **Buscar:** Usa el buscador para filtrar por nombre o email
- **Filtrar por estado:**
  - **Nuevos** (sin leer)
  - **Leídos** (ya revisados)
  - **Archivados** (para mantener, pero fuera de la vista)

- **Ver detalle:** Haz clic en un mensaje para ver el contenido completo

- **Acciones:**
  - 👁️ **Marcar como leído** - Marca un mensaje nuevo como leído
  - 📁 **Archivar** - Mueve el mensaje a archivos
  - 🗑️ **Eliminar** - Elimina el mensaje (soft delete)

**Estadísticas:**

En la parte superior hay un resumen con:
- Total de mensajes
- Mensajes nuevos
- Mensajes leídos
- Mensajes archivados

---

## 🖥️ Ejecutar el Proyecto

### Opción 1: Solo Frontend (sin backend)

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Los mensajes NO se guardarán (el backend no está activo)

### Opción 2: Frontend + Backend

```bash
npm run dev:full
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- Los mensajes se guardarán en Supabase

### Opción 3: Solo Backend

```bash
npm run server
```

- Backend: `http://localhost:5000`
- Útil para testing de la API

---

## 📁 Estructura de Archivos Nuevos

```
src/
├── components/
│   ├── ContactModal.jsx              # Modal de formulario de contacto
│   └── admin/
│       └── MessagesSectionEditor.jsx # Panel de gestión de mensajes
├── context/
│   └── ContactModalContext.jsx       # Context para el modal
├── hooks/
│   └── useContactMessages.js         # Hook para gestionar mensajes
└── routes/
    └── contact.js                    # (Deprecated - usar server.js)

server.js                              # Servidor backend Node.js
SQL_CONTACT_MESSAGES.sql              # Script SQL para la tabla
```

---

## 🔌 API Endpoints

### POST /api/contact-messages

Enviar un nuevo mensaje de contacto.

**Payload:**
```json
{
  "name": "Nombre del usuario",
  "email": "email@example.com",
  "phone": "+1234567890",
  "message": "Contenido del mensaje"
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Mensaje enviado correctamente",
  "data": {
    "id": 1,
    "name": "Nombre",
    "email": "email@example.com",
    "phone": "+1234567890",
    "message": "Contenido",
    "status": "new",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### GET /api/contact-messages

Obtener todos los mensajes (requiere autenticación).

**Respuesta (200):**
```json
[
  { id: 1, name: "...", email: "...", ... },
  { id: 2, name: "...", email: "...", ... }
]
```

### PATCH /api/contact-messages/:id

Actualizar el estado de un mensaje.

**Payload:**
```json
{
  "status": "read",
  "archived": false
}
```

### DELETE /api/contact-messages/:id

Eliminar un mensaje (soft delete).

---

## 🎨 Diseño del Modal

El modal tiene las siguientes características:

- **Header gradiente** - De color `#ECBE8F` a `#D4A574`
- **Campos con iconos** - Lucide Icons para Name, Email, Phone, Message
- **Validación** - Verifica campos requeridos antes de enviar
- **Estados:**
  - **Loading** - Muestra spinner mientras se envía
  - **Success** - Mensaje verde de confirmación
  - **Error** - Mensaje rojo con detalles del error
- **Animaciones** - Framer Motion para apertura/cierre

---

## 🛠️ Solución de Problemas

### El modal no abre

- Verifica que `ContactModalProvider` esté en `App.jsx`
- Asegúrate de que `useContactModal()` se está usando correctamente

### Los mensajes no se envían

**Paso 1:** Verifica que el backend esté corriendo
```bash
npm run server
```

**Paso 2:** Verifica la consola del navegador para errores de red

**Paso 3:** Asegúrate de que Supabase está configurado correctamente en `.env.local`

**Paso 4:** Comprueba que la tabla `contact_messages` existe en Supabase

### Panel de admin no muestra mensajes

- Verifica que estés logueado como admin
- Asegúrate de que las políticas RLS están configuradas en Supabase
- Comprueba la consola del navegador para errores de conexión a Supabase

---

## 📋 Checklist de Verificación

- [ ] Variables de entorno configuradas en `.env.local`
- [ ] Tabla `contact_messages` creada en Supabase
- [ ] Dependencias instaladas (`npm install`)
- [ ] Backend corriendo (`npm run server`)
- [ ] Frontend corriendo (`npm run dev`)
- [ ] Modal de contacto visible en el sitio
- [ ] Botones "Hablemos" funcionando
- [ ] Mensajes llegando a la base de datos
- [ ] Panel admin mostrando mensajes
- [ ] Filtros de estado funcionando

---

## 🚀 Próximos Pasos

1. **Notificaciones por email** - Enviar email al admin cuando hay nuevo mensaje
2. **Respuestas automáticas** - Email automático al usuario confirmando recepción
3. **Exportar mensajes** - Descargar mensajes en formato CSV/Excel
4. **Plantillas de respuesta** - Guardar respuestas automáticas
5. **Integración con sistemas CRM** - Conectar con herramientas de gestión

---

## 📞 Soporte

Para preguntas o problemas:
1. Revisa los logs en la consola del navegador (F12)
2. Verifica el terminal donde está corriendo el backend
3. Comprueba que Supabase está disponible
4. Recarga la página (Ctrl+Shift+R para limpiar cache)

---

**Última actualización:** 2024-01-15
**Versión:** 1.0.0
