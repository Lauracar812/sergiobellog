# Guía de Configuración: Supabase + Sergiobellog.com

## Paso 1: Obtener Credenciales de Supabase

1. Ve a https://supabase.com/
2. Inicia sesión o crea una cuenta
3. Crea un nuevo proyecto (si no tienes uno)
4. Ve a **Settings > API** 
5. Copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Project API keys > anon public** → `VITE_SUPABASE_ANON_KEY`

## Paso 2: Actualizar `.env.local`

Abre el archivo `.env.local` en la raíz del proyecto y reemplaza:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Paso 3: Ejecutar la Migración SQL

1. En Supabase, ve a **SQL Editor**
2. Copia todo el contenido de `DATABASE_SCHEMA.sql`
3. Pega en el editor SQL
4. Ejecuta el script

**Esto creará:**
- 12 tablas para almacenar toda la información
- Índices para mejor rendimiento
- Vistas para consultas comunes
- Datos por defecto

## Paso 4: Probar la Conexión

1. En la terminal, ejecuta:
   ```bash
   npm install
   npm run dev
   ```

2. Abre el navegador en `http://localhost:3000/admin`
3. Inicia sesión con: `admin` / `admin123`
4. Intenta crear/editar contenido
5. **Verifica en Supabase → Table Editor que los datos se guardan**

## Paso 5: Cómo Funciona

### localStorage → Supabase

El hook `useAdminContent.js` ahora:

1. **Carga datos** desde Supabase (sin límite de 5MB)
2. **Guarda datos** automáticamente en Supabase
3. **Fallback automático** a localStorage si Supabase no está disponible
4. **Mismo comportamiento** - no cambia nada del diseño ni funcionalidad

### Estructura de Datos

Los datos se guardan en Supabase con esta estructura:

```
hero_section (encabezado del hero)
├── books, gallery_images, events, blog_posts (contenido dinámico)
├── services (5 servicios fijos)
about_section (biografía)
books_section
  └── books (tabla de libros)
gallery_section
  └── gallery_images (tabla de imágenes)
events_section
  └── events (tabla de eventos)
services_section
  └── services (tabla de servicios)
blog_section
  └── blog_posts (tabla de posts)
```

## Troubleshooting

### No se guarda contenido
- Verifica que `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` estén correctos en `.env.local`
- Reinicia el servidor: `Ctrl+C` y `npm run dev`
- Abre la consola del navegador (F12) y busca errores

### Error de conexión a Supabase
- Verifica que las credenciales sean correctas
- Comprueba que el proyecto de Supabase esté activo
- Intenta ejecutar el SQL script nuevamente

### Imágenes no se guardan
- Las imágenes se guardan como Base64
- Si son muy grandes, se comprimen automáticamente
- Máximo recomendado: 2MB por imagen

## Migración de Datos Locales

Si tienes datos en localStorage que quieres preservar:

1. En la consola del navegador (F12), ejecuta:
   ```javascript
   console.log(JSON.parse(localStorage.getItem('admin-content')))
   ```

2. Copia los datos y guárdalos en Supabase manualmente si es necesario

3. O contacta al soporte para ayuda con la migración

## Notas Importantes

✅ **No cambia el diseño ni funcionalidad**
✅ **Fallback automático a localStorage**
✅ **Datos sin límite de 5MB**
✅ **Persisten en producción**
✅ **Compatible con Hostinger**

## Próximos Pasos

1. ✅ Configurar Supabase
2. ✅ Ejecutar el SQL
3. ✅ Actualizar `.env.local`
4. ✅ Probar en desarrollo
5. → Desplegar a producción
