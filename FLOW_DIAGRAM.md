# 🎯 Flujo del Sistema de Administrador

## Diagrama de Flujo General

```
┌─────────────────────────────────────────────────────────────────┐
│                         LANDING PAGE                             │
│                  http://localhost:3000/                          │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Header                                                   │   │
│  │ (Logo, Navegación, etc.)                               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Hero Section                                             │   │
│  │ ├─ Logo                                                  │   │
│  │ ├─ Descripción (editable desde admin)                   │   │
│  │ ├─ Background Image (editable desde admin)              │   │
│  │ └─ Botón "Hablemos"                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Acceso al Panel Admin:                                  │   │
│  │ http://localhost:3000/admin/login                       │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                      LOGIN PANEL                                 │
│              http://localhost:3000/admin/login                   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Email: admin@sergiobellog.com                            │   │
│  │ Password: sergiobellog2024                               │   │
│  │                                                          │   │
│  │ ┌────────────────────────────────────────────────────┐  │   │
│  │ │ [Iniciar Sesión]                                   │  │   │
│  │ └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│ Si credenciales son correctas → Va al Dashboard ↓              │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    ADMIN DASHBOARD                               │
│            http://localhost:3000/admin/dashboard                 │
│                                                                   │
│ ┌────────────────┬──────────────────────────────────────────┐   │
│ │  SIDEBAR       │         CONTENIDO PRINCIPAL               │   │
│ │  ────────────  │  ─────────────────────────────────────   │   │
│ │ 🖼️ Hero       │  ┌──────────────────────────────────┐    │   │
│ │   Section    │  │ Hero Section Editor              │    │   │
│ │              │  │                                  │    │   │
│ │ 📌 Header    │  │ ┌─────────────────────────────┐  │    │   │
│ │   (Pronto)   │  │ │ Descripción:                │  │    │   │
│ │              │  │ │ "Autor de ficción..."       │  │    │   │
│ │ 🎯 CTA       │  │ └─────────────────────────────┘  │    │   │
│ │   (Pronto)   │  │                                  │    │   │
│ │              │  │ ┌──────┐ ┌──────┐               │    │   │
│ │              │  │ │PC Bg │ │Mobile│               │    │   │
│ │ [Cerrar]     │  │ │[📤] │ │[📤]  │               │    │   │
│ │              │  │ └──────┘ └──────┘               │    │   │
│ │              │  │                                  │    │   │
│ │              │  │ [💾 Guardar cambios]            │    │   │
│ │              │  └──────────────────────────────────┘    │   │
│ └────────────────┴──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
        ↓                                              ↓
        ↓                                              ↓
    [Edita]                                      [Guarda en
     Campos                                      localStorage]
        ↓                                              ↓
        └──────────────────────┬───────────────────────┘
                               ↓
                    ┌───────────────────────┐
                    │  localStorage keys:   │
                    │                       │
                    │ admin_session: {...}  │
                    │                       │
                    │ hero_section_admin: { │
                    │   description,        │
                    │   backgroundImagePC,  │
                    │   backgroundImageMob  │
                    │ }                     │
                    └───────────────────────┘
                               ↓
            ┌──────────────────┴──────────────────┐
            ↓                                      ↓
    [Vuelve a Home]                      [O accede a Home]
    Hero Section carga                   Hero Section carga
    contenido de                         contenido de
    localStorage                         localStorage
            ↓                                      ↓
            └──────────────────┬──────────────────┘
                               ↓
            [Landing actualizada con nuevo contenido]
```

---

## Flujo de Edición - Hero Section

```
1. ADMINISTRADOR
   └─ Inicia sesión
      └─ Va al Admin Dashboard
         └─ Selecciona "Hero Section"
            └─ Ve formulario de edición
               ├─ Campo de Descripción (textarea)
               ├─ Upload Image PC (con preview)
               └─ Upload Image Mobile (con preview)
                  └─ Haz click [Guardar cambios]
                     └─ Datos se guardan en localStorage
                        └─ Toast: "✅ Guardado"

2. USUARIO VISITANTE
   └─ Accede a http://localhost:3000/
      └─ HeroSection.jsx carga
         └─ useEffect → getFromLocalStorage('hero_section_admin')
            └─ Si existe → Usa contenido guardado
            └─ Si no existe → Usa valores por defecto
               └─ Página se renderiza con contenido actual
```

---

## Almacenamiento en localStorage

### Estructura de Datos

```javascript
// Clave: 'hero_section_admin'
// Valor:
{
  description: "\"Autor de ficción y no ficción...\"",
  backgroundImagePC: "data:image/png;base64,iVBORw0KGgoAAAANS...",
  backgroundImageMobile: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}

// Clave: 'admin_session'
// Valor:
{
  email: "admin@sergiobellog.com",
  name: "Administrador"
}
```

### Límites
- localStorage típicamente soporta 5-10 MB
- Cada imagen en base64 pesa ~1.3x más que el original
- Máximo: 50 MB por imagen (pero con base64 se reducirá el límite)

---

## Estados y Transiciones

```
USUARIO SIN SESIÓN
    ↓
[Click en /admin/dashboard]
    ↓
ProtectedRoute detecta no autenticado
    ↓
Redirecciona a /admin/login
    ↓
Muestra formulario de login
    ↓
[Usuario entra credenciales]
    ↓
AdminContext.login() valida
    ↓
├─ Si es correcto:
│  └─ localStorage['admin_session'] = {...}
│  └─ Redirecciona a /admin/dashboard
│
└─ Si es incorrecto:
   └─ Toast error
   └─ Limpia password
   └─ Mantiene en login


USUARIO CON SESIÓN (localStorage existe)
    ↓
App.jsx monta
    ↓
AdminProvider useEffect verifica localStorage
    ↓
setIsAuthenticated(true)
    ↓
Acceso completo a /admin/dashboard
```

---

## Ciclo de Vida de una Imagen

```
1. SELECCIÓN
   └─ Usuario hace click en input file
   └─ Selecciona imagen de su PC

2. VALIDACIÓN
   └─ validateFileSize(file, 50) → OK?
   └─ isValidImageFormat(file) → OK?
   └─ Si falla → Toast error

3. CONVERSIÓN
   └─ fileToBase64(file)
   └─ FileReader.readAsDataURL()
   └─ Resultado: "data:image/png;base64,..."

4. ALMACENAMIENTO
   └─ Guarda en state (React)
   └─ Muestra preview
   └─ Usuario hace click [Guardar cambios]

5. PERSISTENCIA
   └─ saveToLocalStorage('hero_section_admin', {...})
   └─ localStorage actualiza
   └─ Toast: ✅ Guardado

6. LECTURA (Por HeroSection.jsx)
   └─ getFromLocalStorage('hero_section_admin')
   └─ Lee backgroundImagePC o backgroundImageMobile
   └─ Establece como backgroundImage en CSS
   └─ Se muestra en la landing
```

---

## Flujo de Sesión

```
PRIMERA VEZ (Nuevo usuario)
    ↓
localStorage['admin_session'] no existe
    ↓
App.jsx → AdminProvider → useEffect
    ├─ Intenta leer localStorage
    ├─ No encuentra nada
    ├─ setIsAuthenticated(false)
    ↓
Usuario ve login
    ↓
[Ingresa credenciales correctas]
    ↓
login() ejecuta
    ├─ Valida credenciales
    ├─ localStorage['admin_session'] = {...}
    ├─ setIsAuthenticated(true)
    ├─ navigate('/admin/dashboard')
    ↓
Dashboard accesible


USUARIO VUELVE DESPUÉS
    ↓
localStorage['admin_session'] aún existe
    ↓
App.jsx → AdminProvider → useEffect
    ├─ Intenta leer localStorage
    ├─ Encuentra datos
    ├─ JSON.parse() → adminData
    ├─ setAdmin(adminData)
    ├─ setIsAuthenticated(true)
    ↓
Usuario ya está logueado
    ↓
Puede acceder directamente a dashboard


CERRAR SESIÓN
    ↓
[Click Cerrar sesión]
    ↓
logout() ejecuta
    ├─ localStorage.removeItem('admin_session')
    ├─ setAdmin(null)
    ├─ setIsAuthenticated(false)
    ├─ navigate('/admin/login')
    ↓
Usuario ve login nuevamente
```

---

## Componentes y Sus Responsabilidades

```
App.jsx
├─ Proporciona AdminProvider (contexto)
├─ Configura React Router
└─ Define rutas públicas y protegidas

AdminProvider (AdminContext.jsx)
├─ Gestiona estado de autenticación
├─ Verifica sesión en localStorage
├─ Proporciona login() y logout()
└─ Envuelve toda la app

ProtectedRoute.jsx
├─ Verifica isAuthenticated
├─ Si no autenticado → Redirecciona a login
└─ Si autenticado → Renderiza componente

AdminLogin.jsx
├─ Formulario de email/password
├─ Llama a login() del contexto
└─ Redirecciona a dashboard si exitoso

AdminDashboard.jsx
├─ Layout principal del admin
├─ Sidebar con secciones
├─ Renderiza editor según sección seleccionada
└─ Botón de logout

HeroSectionAdmin.jsx
├─ Editor de Hero Section
├─ Carga contenido de localStorage
├─ Maneja carga de archivos
├─ Convierte a base64
└─ Guarda en localStorage

HeroSection.jsx (público)
├─ Carga contenido de localStorage
├─ Usa imagen PC o Mobile según viewport
└─ Fallback a imágenes por defecto
```

---

Este diagrama muestra cómo toda la pieza encaja juntas en el sistema completo. ¿Tiene dudas sobre alguna parte específica?
