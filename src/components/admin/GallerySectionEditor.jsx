import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminContent } from '@/hooks/useAdminContent';
import { Loader2, Plus, Trash2, AlertCircle } from 'lucide-react';

// Función para comprimir imagen
const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Limitar tamaño máximo
        const maxWidth = 1200;
        const maxHeight = 800;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        let quality = 0.7;
        let base64 = canvas.toDataURL('image/jpeg', quality);

        // Si aún es muy grande, reducir calidad
        while (base64.length > 2 * 1024 * 1024 && quality > 0.1) {
          quality -= 0.1;
          base64 = canvas.toDataURL('image/jpeg', quality);
        }

        resolve(base64);
      };
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsDataURL(file);
  });
};

export default function GallerySectionEditor() {
  const { content, saveContent } = useAdminContent();

  const [formData, setFormData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    console.log('📥 GallerySectionEditor: Cargando datos del contenido');
    console.log('📋 Contenido actual:', content);

    if (content?.gallerySection) {
      setFormData(content.gallerySection);
    } else {
      setFormData({
        title: 'Galería',
        images: [],
      });
    }
    setLoading(false);
  }, [content]);

  const handleImageUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    setError(null);
    console.log('📤 Cargando imagen:', file.name);

    try {
      const compressedBase64 = await compressImage(file);
      console.log('✅ Imagen comprimida y lista');

      const newImage = {
        id: formData.images.length > 0 ? Math.max(...formData.images.map(img => img.id || 0)) + 1 : 1,
        image: compressedBase64,
      };

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage],
      }));
      setUploading(false);
    } catch (err) {
      console.error('❌ Error uploading image:', err);
      setError('Error al cargar la imagen: ' + err.message);
      setUploading(false);
    }
  };

  const handleRemoveImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId),
    }));
  };

  const handleSectionTitleChange = (newTitle) => {
    setFormData(prev => ({
      ...prev,
      title: newTitle,
    }));
  };

  const handleSave = async () => {
    try {
      setError(null);
      console.log('💾 Guardando cambios...');

      // Calcular tamaño de los datos
      const jsonString = JSON.stringify({
        ...content,
        gallerySection: formData,
      });
      const sizeInMB = (jsonString.length / 1024 / 1024).toFixed(2);
      console.log(`📊 Tamaño total de datos: ${sizeInMB}MB`);

      if (sizeInMB > 5) {
        setError(`❌ Los datos son demasiado grandes (${sizeInMB}MB). Límite: 5MB. Intenta con imágenes más pequeñas.`);
        return;
      }

      const newContent = {
        ...content,
        gallerySection: formData,
      };

      console.log('📤 Guardando en Supabase...');
      await saveContent(newContent);

      alert('✅ Cambios guardados correctamente');
    } catch (err) {
      console.error('❌ Error saving:', err);
      setError('Error al guardar: ' + err.message);
    }
  };

  const handleReset = () => {
    if (content?.gallerySection) {
      setFormData(content.gallerySection);
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

        {/* Título de la sección */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Título de la Sección</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleSectionTitleChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            placeholder="Ej: Galería"
          />
          <p className="text-xs text-gray-500 mt-2">Tamaño: 30px, Alineación: Centrada, Fuente: Poppins</p>
        </div>

        {/* Vista previa de imágenes */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Imágenes en la Galería ({formData.images.length})</h3>

          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {formData.images.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={image.image}
                      alt="Galería"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveImage(image.id)}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload button */}
          <label className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer font-semibold w-fit">
            {uploading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Plus size={18} />
                <span>Agregar Imagen</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            💾 Guardar Cambios
          </button>
          <button
            onClick={handleReset}
            className="flex-1 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
          >
            🔄 Descartar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
