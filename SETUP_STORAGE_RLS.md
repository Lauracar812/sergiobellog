# Configuración de Supabase Storage - Permisos RLS

## Paso 1: Crear el Bucket

1. Ve a **Supabase Dashboard** → **Storage**
2. Haz clic en **"New bucket"**
3. Nombre: `admin-uploads`
4. **Marca como PUBLIC** ✓
5. Haz clic en **Create bucket**

## Paso 2: Configurar Políticas RLS (Row Level Security)

El bucket se crió automáticamente con permisos limitados. Necesitamos crear políticas para permitir uploads.

### En Supabase SQL Editor, ejecuta esto:

```sql
-- Crear política para permitir que usuarios autenticados creen archivos
CREATE POLICY "Allow authenticated users to upload files" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'admin-uploads' 
    AND auth.role() = 'authenticated'
  );

-- Crear política para permitir lectura pública
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'admin-uploads');

-- Crear política para permitir que los usuarios eliminen sus propios archivos
CREATE POLICY "Allow users to delete their own files" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'admin-uploads' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
```

## Paso 3: Verificar

1. Vuelve a tu app en `/admin/dashboard`
2. Intenta subir una imagen
3. Si ves "⏳ Subiendo..." y luego "✅ Imagen subida", ¡funcionó!

## Troubleshooting

### Error: "Access denied"
- Verifica que el bucket sea **PUBLIC**
- Ejecuta las políticas SQL anteriores

### Error: "Permission denied"
- Confirma que estés logueado como `admin@sergiobellog.com`
- Verifica que el token de Supabase sea válido

### Las imágenes no se cargan
- Abre DevTools (F12) → Console
- Busca mensajes de error
- Verifica la URL de la imagen (debe ser de supabase.co)

## URL de Imágenes

Las imágenes subidas tendrán URLs como:
```
https://pkwmunpariyhiqltkmsg.supabase.co/storage/v1/object/public/admin-uploads/...
```

Estas URLs son públicas y permanentes.
