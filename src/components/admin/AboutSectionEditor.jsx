import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminContent } from '@/hooks/useAdminContent';
import { Loader2, Check, AlertCircle, Bold, Italic, Underline } from 'lucide-react';

// Función para comprimir imagen antes de guardar
const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Redimensionar a 400px ancho x 600px alto
        const TARGET_WIDTH = 400;
        const TARGET_HEIGHT = 600;
        
        // Calcular escala manteniendo aspecto
        const aspectRatio = width / height;
        
        if (aspectRatio > TARGET_WIDTH / TARGET_HEIGHT) {
          // Imagen más ancha que el target
          height = TARGET_HEIGHT;
          width = TARGET_HEIGHT * aspectRatio;
        } else {
          // Imagen más alta que el target
          width = TARGET_WIDTH;
          height = TARGET_WIDTH / aspectRatio;
        }
        
        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;
        
        const ctx = canvas.getContext('2d');
        
        // Centrar la imagen en el canvas
        const offsetX = (TARGET_WIDTH - width) / 2;
        const offsetY = (TARGET_HEIGHT - height) / 2;
        
        ctx.drawImage(img, offsetX, offsetY, width, height);
        
        // Comprimir agresivamente
        let quality = 0.6;
        let compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        
        // Reducir más si es necesario
        while (compressedBase64.length > 1000000 && quality > 0.2) {
          quality -= 0.05;
          compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        }
        
        const originalSize = (file.size / 1024 / 1024).toFixed(2);
        const compressedSize = (compressedBase64.length / 1024 / 1024).toFixed(2);
        
        console.log(`🖼️ Compresión: ${originalSize}MB → ${compressedSize}MB (calidad: ${(quality * 100).toFixed(0)}%, tamaño: 400x600px)`);
        resolve(compressedBase64);
      };
      
      img.onerror = () => reject(new Error('No se pudo cargar la imagen'));
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsDataURL(file);
  });
};

export default function AboutSectionEditor() {
  const { content, saveContent } = useAdminContent();
  
  const [formData, setFormData] = useState(null);
  const [bioHTML, setBioHTML] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bioEditorRef = React.useRef(null);
  const [bioLoaded, setBioLoaded] = useState(false);

  // Cargar datos iniciales de aboutSection
  useEffect(() => {
    console.log('📥 AboutSectionEditor: Cargando datos del contenido');
    console.log('📋 Contenido actual:', content);
    
    if (content?.aboutSection) {
      const aboutData = {
        title: content.aboutSection.title || 'Sobre mí',
        biography: content.aboutSection.biography || '',
        authorImage: content.aboutSection.authorImage || null,
      };
      console.log('✅ Datos cargados:', aboutData);
      setFormData(aboutData);
      setBioHTML(aboutData.biography);
    } else {
      console.log('⚠️ No hay aboutSection, usando valores por defecto');
      setFormData({
        title: 'Sobre mí',
        biography: '',
        authorImage: null,
      });
      setBioHTML('');
    }
    setLoading(false);
  }, [content]);

  // Sincronizar contenido al ref después del primer render
  useEffect(() => {
    if (bioEditorRef.current && !bioLoaded) {
      bioEditorRef.current.innerHTML = bioHTML;
      setBioLoaded(true);
    }
  }, [bioHTML, bioLoaded]);

  const handleImageUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    setError(null);
    console.log('📤 Cargando imagen:', file.name);

    try {
      const compressedBase64 = await compressImage(file);
      console.log('✅ Imagen comprimida y lista');
      setFormData(prev => ({
        ...prev,
        authorImage: compressedBase64
      }));
      setUploading(false);
      
      // Mostrar indicador de éxito
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('❌ Error uploading image:', err);
      setError('Error al cargar la imagen: ' + err.message);
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setError(null);
      console.log('💾 Guardando cambios...');
      
      const dataToSave = {
        ...formData,
        biography: bioHTML
      };
      
      console.log('📋 Datos a guardar:', dataToSave);
      
      // Calcular tamaño de los datos
      const jsonString = JSON.stringify({
        ...content,
        aboutSection: dataToSave
      });
      const sizeInMB = (jsonString.length / 1024 / 1024).toFixed(2);
      console.log(`📊 Tamaño total de datos: ${sizeInMB}MB`);
      
      if (sizeInMB > 5) {
        setError(`❌ Los datos son demasiado grandes (${sizeInMB}MB). Límite: 5MB. Intenta con una imagen más pequeña.`);
        return;
      }
      
      const newContent = {
        ...content,
        aboutSection: dataToSave
      };
      
      console.log('📤 Guardando en Supabase...');
      await saveContent(newContent);
      
      // Mostrar feedback de éxito
      alert('✅ Cambios guardados correctamente');
    } catch (err) {
      console.error('❌ Error saving:', err);
      setError('Error al guardar: ' + err.message);
    }
  };

  const handleReset = () => {
    if (content?.aboutSection) {
      setFormData({
        title: content.aboutSection.title || 'Sobre mí',
        biography: content.aboutSection.biography || '',
        authorImage: content.aboutSection.authorImage || null,
      });
      setBioHTML(content.aboutSection.biography || '');
      setBioLoaded(false);
      setError(null);
      alert('Cambios descartados');
    }
  };

  if (loading || !formData) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Mostrar errores */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          >
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Sección de título */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">📝 Información de la Sección</h2>
        
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Título de la Sección</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                console.log('Título actualizado:', e.target.value);
                setFormData(prev => ({ ...prev, title: e.target.value }));
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="Ej: Sobre mí"
            />
            <p className="text-xs text-gray-500 mt-2">Tamaño: 30px, Alineación: Centrada</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Biografía</label>

            {/* Toolbar */}
            <div className="flex gap-2 mb-2 p-2 bg-gray-700 rounded-t-lg border border-gray-300 border-b-0 flex-wrap">
              <button
                type="button"
                onClick={() => document.execCommand('bold')}
                className="p-2 hover:bg-gray-600 rounded transition-colors text-sm font-semibold text-white"
                title="Negrilla (Ctrl+B)"
              >
                <Bold size={18} className="inline" />
              </button>
              <button
                type="button"
                onClick={() => document.execCommand('italic')}
                className="p-2 hover:bg-gray-600 rounded transition-colors text-sm italic text-white"
                title="Itálica (Ctrl+I)"
              >
                <Italic size={18} className="inline" />
              </button>
              <button
                type="button"
                onClick={() => document.execCommand('underline')}
                className="p-2 hover:bg-gray-600 rounded transition-colors text-sm underline text-white"
                title="Subrayado (Ctrl+U)"
              >
                <Underline size={18} className="inline" />
              </button>
              <div className="border-l border-gray-500 mx-1"></div>
              <button
                type="button"
                onClick={() => document.execCommand('insertUnorderedList')}
                className="p-2 hover:bg-gray-600 rounded transition-colors text-sm text-white"
                title="Lista sin orden"
              >
                • Lista
              </button>
              <button
                type="button"
                onClick={() => document.execCommand('insertOrderedList')}
                className="p-2 hover:bg-gray-600 rounded transition-colors text-sm text-white"
                title="Lista ordenada"
              >
                1. Lista
              </button>
            </div>

            {/* Editor */}
            <div
              ref={bioEditorRef}
              contentEditable
              onInput={(e) => {
                console.log('Biografía actualizada');
                setBioHTML(e.currentTarget.innerHTML);
              }}
              onFocus={(e) => {
                if (!bioHTML || bioHTML === '<br>' || bioHTML === '') {
                  e.currentTarget.innerHTML = '';
                }
              }}
              suppressContentEditableWarning
              className="w-full px-4 py-4 border-2 border-blue-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-64 text-gray-900 bg-white shadow-sm"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '15px',
                lineHeight: '1.6',
                caretColor: '#3B82F6',
                display: 'block'
              }}
              data-placeholder="Escribe aquí la biografía..."
            />
            <p className="text-xs text-gray-500 mt-3">💡 Usa los botones de arriba para agregar formato (negrilla, itálica, subrayado, listas)</p>
          </div>
        </div>

        {/* Sección de imagen */}
        <h2 className="text-xl font-bold text-gray-800 mb-6 mt-8">📸 Imagen del Autor</h2>
        
        <div className="space-y-6">
          {/* Previsualización */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Previsualización (400px x 600px)</p>
            {formData.authorImage ? (
              <div style={{ width: '400px', height: '600px' }} className="overflow-hidden rounded-lg border border-gray-300 shadow-md">
                <img 
                  src={formData.authorImage} 
                  alt="Autor"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div style={{ width: '400px', height: '600px' }} className="bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <p className="text-3xl mb-2">📷</p>
                  <p className="text-sm">Sin imagen del autor</p>
                </div>
              </div>
            )}
          </div>

          {/* Upload button */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer font-semibold">
              {uploading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Comprimiendo...
                </>
              ) : (
                <>
                  <span>📤 Seleccionar Imagen</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                disabled={uploading}
              />
            </label>

            {saved && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-lg font-semibold"
              >
                <Check size={18} />
                Imagen cargada
              </motion.div>
            )}
          </div>

          {formData.authorImage && (
            <button
              onClick={() => {
                console.log('Eliminando imagen');
                setFormData(prev => ({ ...prev, authorImage: null }));
              }}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
            >
              ❌ Eliminar imagen
            </button>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
          >
            💾 Guardar Cambios
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
          >
            ↻ Descartar Cambios
          </motion.button>
        </div>

        {/* Información útil */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 mb-2">
            <strong>💡 Nota:</strong> Las imágenes se comprimen automáticamente. Los cambios se aplicarán inmediatamente en la página principal.
          </p>
          <p className="text-xs text-blue-700">
            📊 Límite de almacenamiento: 5MB. Si la imagen es muy grande, intenta con una foto más pequeña.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
