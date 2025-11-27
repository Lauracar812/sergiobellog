# 🎬 Demostración del Sistema Admin

## Flujo de Uso Visual

```
┌─────────────────────────────────────────────────┐
│                  LANDING PÚBLICA                 │
│  http://localhost:3000/                         │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │  HEADER (Logo, Navegación)                 │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │  HERO SECTION                              │ │
│  │  - Logo                                    │ │
│  │  - Descripción (editable desde admin)      │ │
│  │  - Fondo (versión Desktop/Mobile)          │ │
│  │  - Botón "Hablemos"                        │ │
│  │    (texto editable desde admin)            │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  [Ir a Admin] ← Botón para acceder al panel     │
└─────────────────────────────────────────────────┘
                         ↓
                   (Click "Ir a Admin")
                         ↓
┌─────────────────────────────────────────────────┐
│            ADMIN LOGIN PAGE                      │
│   http://localhost:3000/admin                   │
│                                                  │
│   ┌──────────────────────────────────────────┐  │
│   │         [LOGO]                           │  │
│   │      Administrador                       │  │
│   │  "Inicia sesión para administrar"        │  │
│   │                                          │  │
│   │  Usuario: [_______________]              │  │
│   │  Contraseña: [_____________]             │  │
│   │                                          │  │
│   │  [Iniciar Sesión]                        │  │
│   │                                          │  │
│   │  Por defecto: admin / admin123           │  │
│   └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                         ↓
         (Login exitoso con admin/admin123)
                         ↓
┌─────────────────────────────────────────────────┐
│         ADMIN DASHBOARD                         │
│  http://localhost:3000/admin/dashboard          │
│                                                  │
│  ┌──────────────┐  ┌─────────────────────────┐ │
│  │  SIDEBAR     │  │  CONTENIDO PRINCIPAL    │ │
│  │              │  │                         │ │
│  │ 📸 Principal │  │  EDITOR - SECCIÓN       │ │
│  │              │  │  PRINCIPAL              │ │
│  │ ✍️ Blog      │  │                         │ │
│  │ (Próximo)    │  │ ┌─────────────────────┐ │ │
│  │              │  │ │ DESCRIPCIÓN:       │ │ │
│  │ 📚 Galería   │  │ │ [Área de Texto]    │ │ │
│  │ (Próximo)    │  │ │                    │ │ │
│  │              │  │ │ TEXTO DEL BOTÓN:  │ │ │
│  │ ⚙️ Config    │  │ │ [Hablemos]         │ │ │
│  │ (Próximo)    │  │ │                    │ │ │
│  │              │  │ │ IMAGEN DESKTOP:    │ │ │
│  │ [Ir Landing] │  │ │ [📤 Seleccionar]   │ │ │
│  │              │  │ │                    │ │ │
│  │ [Salir]      │  │ │ IMAGEN MOBILE:     │ │ │
│  │              │  │ │ [📤 Seleccionar]   │ │ │
│  │              │  │ │                    │ │ │
│  │              │  │ │ LOGO:              │ │ │
│  │              │  │ │ [📤 Seleccionar]   │ │ │
│  │              │  │ │                    │ │ │
│  │              │  │ │ [💻 Desktop/📱 Mob]│ │ │
│  │              │  │ │ [Vista Previa]     │ │ │
│  │              │  │ │                    │ │ │
│  │              │  │ │ [💾 Guardar] [🔄] │ │ │
│  │              │  │ └─────────────────────┘ │ │
│  └──────────────┘  └─────────────────────────┘ │
│                                                  │
│  Información: Los cambios se guardan en         │
│  localStorage y se aplican inmediatamente       │
└─────────────────────────────────────────────────┘
                    ↓
         (Hace cambios y guarda)
                    ↓
         (Click "Ir Landing")
                    ↓
┌─────────────────────────────────────────────────┐
│         LANDING ACTUALIZADA                     │
│  http://localhost:3000/                         │
│                                                  │
│  ¡Los cambios se ven aplicados inmediatamente! │
│  - Nuevo texto de descripción                  │
│  - Nuevo botón de texto                        │
│  - Nuevas imágenes de fondo                    │
│  - Nuevo logo                                  │
└─────────────────────────────────────────────────┘
```

---

## 📊 Flujo de Datos

```
Admin Carga Imagen
       ↓
FileReader (Base64)
       ↓
localStorage['admin-content']
       ↓
useAdminContent Hook
       ↓
HeroSection Component
       ↓
Landing Actualizada
```

---

## 🔄 Ciclo de Edición

```
1️⃣  Admin Inicia Sesión
    └─→ Token guardado en localStorage

2️⃣  Admin Accede al Dashboard
    └─→ Contenido cargado de localStorage

3️⃣  Admin Edita Contenido
    └─→ Cambios en tiempo real en preview

4️⃣  Admin Guarda Cambios
    └─→ localStorage actualizado

5️⃣  Landing Detecta Cambios
    └─→ HeroSection re-renderiza

6️⃣  Usuario ve Cambios
    └─→ Landing actualizada sin refresh
```

---

## 💾 Estructura localStorage

```javascript
// Clave: admin-content
{
  "heroSection": {
    "title": "",
    "description": "Tu descripción aquí",
    "backgroundImageDesktop": "data:image/png;base64,iVBORw0...",
    "backgroundImageMobile": "data:image/png;base64,iVBORw0...",
    "logoImage": "data:image/png;base64,iVBORw0...",
    "buttonText": "Hablemos"
  }
}

// Tamaño máximo: ~5-10MB (depende del navegador)
// Persistencia: ✅ Entre sesiones
// Sincronización: ✅ Inmediata en landing
```

---

## 🎯 Casos de Uso

### Caso 1: Cambiar Descripción
```
1. Ir a /admin/dashboard
2. Editar campo "Descripción Principal"
3. Ver cambio en preview
4. Guardar
5. Ir a landing → texto actualizado ✓
```

### Caso 2: Cambiar Imagen de Fondo
```
1. Ir a /admin/dashboard
2. Click en "Seleccionar Imagen Desktop"
3. Elegir archivo JPG/PNG
4. Ver preview actualizado
5. Guardar
6. Ir a landing → fondo actualizado ✓
```

### Caso 3: Cambiar Versión Mobile
```
1. Ir a /admin/dashboard
2. Click en "Seleccionar Imagen Mobile"
3. Subir imagen optimizada para móvil
4. Click en tab "📱 Mobile" en preview
5. Ver en 375x667px
6. Guardar
7. En móvil → verá la imagen correcta ✓
```

---

## 🔐 Seguridad

```
Admin Login
    ↓
Valida Credenciales
    ↓
[Si correcto] → Token guardado en localStorage
    ↓
ProtectedRoute verifica token
    ↓
[Si existe] → Acceso a Dashboard
[Si NO existe] → Redirect a /admin
```

---

## 📱 Responsive en Admin

```
Desktop (≥1024px)
┌──────────────────────────────────────┐
│ Logo  │  Panel Admin    │  Preview   │
│       │                 │   100%     │
└──────────────────────────────────────┘

Tablet (768px - 1023px)
┌──────────────────────────┐
│ Sidebar (Colapsable)     │
├──────────────────────────┤
│ Panel Admin               │
├──────────────────────────┤
│ Preview                  │
└──────────────────────────┘

Mobile (<768px)
┌──────────────┐
│ Logo | Menu  │
├──────────────┤
│ Panel Admin  │
├──────────────┤
│ Preview      │
└──────────────┘
```

---

## ✨ Flujo Completo de Ejemplo

```
1. Usuario abre landing: http://localhost:3000/
   → Ve: Logo, Descripción, Botón (contenido por defecto)

2. Usuario notan que quiere cambiar algo
   → Noticiosos hay opción admin en header

3. Usuario accede a admin: http://localhost:3000/admin
   → Ve: Formulario de login

4. Usuario inicia sesión: admin / admin123
   → Ve: Dashboard admin

5. Usuario edita descripción
   → Preview se actualiza al escribir

6. Usuario carga nueva imagen de fondo
   → Preview muestra nueva imagen

7. Usuario guarda cambios
   → localStorage actualizado
   → Dashboard muestra confirmación

8. Usuario va a landing: http://localhost:3000/
   → ¡SORPRESA! La landing tiene los nuevos cambios

9. Listo para compartir con el mundo 🌍
```

---

## 🎁 Bonificaciones Implementadas

✅ Vista previa en tiempo real  
✅ Simulación de móvil (375x667px)  
✅ Persistencia sin backend  
✅ Carga de imágenes sin límite  
✅ Base64 encoding automático  
✅ Interfaz intuitiva  
✅ Animaciones suaves  
✅ Sistema de alertas (toast)  
✅ Rutas protegidas  
✅ Responsive design  

---

**Estado:** ✅ Completamente Funcional  
**Versión:** 1.0.0  
**Fecha:** 27 de noviembre de 2025
