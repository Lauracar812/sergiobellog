# 🚀 INICIO RÁPIDO - Administrador de Landing

## 3 Pasos para Empezar

### Paso 1: Inicia el servidor
```bash
npm run dev
```
La landing estará en: http://localhost:3000

### Paso 2: Accede al administrador
```
http://localhost:3000/admin
```

### Paso 3: Inicia sesión
```
Usuario: admin
Contraseña: admin123
```

---

## ¿Qué puedo hacer?

✅ Editar el texto principal  
✅ Cambiar el texto del botón  
✅ Subir imágenes de fondo (Desktop y Mobile)  
✅ Cambiar el logo  
✅ Ver cambios en tiempo real  
✅ Guardar cambios que persisten  

---

## Ubicaciones Importantes

| Elemento | URL |
|----------|-----|
| Landing Principal | http://localhost:3000/ |
| Página de Login | http://localhost:3000/admin |
| Dashboard Admin | http://localhost:3000/admin/dashboard |

---

## Datos Almacenados

- **Ubicación:** localStorage del navegador
- **Clave:** `admin-content`
- **Persistencia:** Se guardan entre sesiones
- **Sincronización:** Cambios instantáneos en la landing

---

## ❓ Preguntas Frecuentes

**¿Necesito backend?**  
No, todo se almacena localmente en el navegador.

**¿Puedo cambiar el usuario/contraseña?**  
Sí, edita `src/utils/auth.js`

**¿Se pierden los cambios si limpio el caché?**  
Sí, haz backup en DevTools antes.

**¿Qué formatos de imagen soporta?**  
JPG, PNG, WebP, GIF, SVG - cualquier tamaño.

---

## 📚 Más Información

- **Guía Completa:** Ver `ADMIN_GUIDE.md`
- **Resumen Técnico:** Ver `ADMIN_SETUP.md`
- **Código de Autenticación:** `src/utils/auth.js`
- **Contenido:** `src/hooks/useAdminContent.js`

---

## ¡Listo! 🎉

Ya puedes administrar tu landing. Cualquier cambio que hagas en el admin se reflejará instantáneamente en la landing.
