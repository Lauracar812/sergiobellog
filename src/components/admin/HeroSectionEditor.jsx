import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminContent } from '@/hooks/useAdminContent';
import { Check, Loader2 } from 'lucide-react';

export default function HeroSectionEditor() {
  const { content, saveContent } = useAdminContent();
  const [formData, setFormData] = useState({
    description: '',
    buttonText: 'Conoce más',
    backgroundImageDesktop: null,
    backgroundImageMobile: null,
    logoImage: null,
  });

  const [uploading, setUploading] = useState(null);
  const [saved, setSaved] = useState({});
  const [loading, setLoading] = useState(true);

  // Cargar datos iniciales
  useEffect(() => {
    if (content?.heroSection) {
      setFormData({
        description: content.heroSection.description || '',
        buttonText: content.heroSection.buttonText || 'Conoce más',
        backgroundImageDesktop: content.heroSection.backgroundImageDesktop || null,
        backgroundImageMobile: content.heroSection.backgroundImageMobile || null,
        logoImage: content.heroSection.logoImage || null,
      });
    }
    setLoading(false);
  }, [content]);

  const imageFields = [
    { id: 'backgroundImageDesktop', label: 'Imagen de Fondo - Desktop', width: 'w-32', height: 'h-16' },
    { id: 'backgroundImageMobile', label: 'Imagen de Fondo - Mobile', width: 'w-32', height: 'h-16' },
    { id: 'logoImage', label: 'Logo / Imagen Principal', width: 'w-32', height: 'h-16' },
  ];

  const handleImageUpload = async (fieldId, file) => {
    if (!file) return;

    setUploading(fieldId);

    try {
      // Convertir a Base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        setFormData(prev => ({
          ...prev,
          [fieldId]: base64
        }));
        setUploading(null);
        
        // Mostrar indicador de éxito
        setSaved(prev => ({ ...prev, [fieldId]: true }));
        setTimeout(() => {
          setSaved(prev => ({ ...prev, [fieldId]: false }));
        }, 2000);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(null);
    }
  };

  const handleSave = async () => {
    try {
      const newContent = {
        ...content,
        heroSection: formData
      };
      await saveContent(newContent);
      
      // Mostrar feedback de éxito
      alert('✅ Cambios guardados correctamente');
    } catch (error) {
      console.error('Error saving:', error);
      alert('❌ Error al guardar: ' + error.message);
    }
  };

  const handleReset = () => {
    if (content?.heroSection) {
      setFormData({
        description: content.heroSection.description || '',
        buttonText: content.heroSection.buttonText || 'Conoce más',
        backgroundImageDesktop: content.heroSection.backgroundImageDesktop || null,
        backgroundImageMobile: content.heroSection.backgroundImageMobile || null,
        logoImage: content.heroSection.logoImage || null,
      });
      alert('Cambios descartados');
    }
  };

  if (loading) {
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
        {/* Sección de imágenes */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">📸 Gestión de Imágenes</h2>
        
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Campo</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Previsualización</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Acción</th>
              </tr>
            </thead>
            <tbody>
              {imageFields.map(field => (
                <tr key={field.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-gray-700 font-medium">{field.label}</td>
                  
                  <td className="px-4 py-4">
                    {formData[field.id] ? (
                      <div className={`${field.width} ${field.height} overflow-hidden rounded-md border border-gray-300`}>
                        <img 
                          src={formData[field.id]} 
                          alt={field.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`${field.width} ${field.height} bg-gray-200 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm`}>
                        Sin imagen
                      </div>
                    )}
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer text-sm font-medium">
                        {uploading === field.id ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Subiendo...
                          </>
                        ) : (
                          <>
                            <span>📤 Seleccionar</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleImageUpload(field.id, e.target.files[0])}
                          disabled={uploading === field.id}
                        />
                      </label>
                      
                      {saved[field.id] && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium"
                        >
                          <Check size={16} />
                          Guardado
                        </motion.div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sección de texto */}
        <h2 className="text-xl font-bold text-gray-800 mb-6 mt-8">📝 Contenido de Texto</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción Principal</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical min-h-24"
              placeholder="Escribe el texto principal de la sección..."
            />
            <p className="text-xs text-gray-500 mt-2">Caracteres: {formData.description.length}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Texto del Botón</label>
            <input
              type="text"
              value={formData.buttonText}
              onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Conoce más, Contacta ahora, etc."
            />
          </div>
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
          <p className="text-sm text-blue-800">
            <strong>💡 Nota:</strong> Las imágenes se comprimen automáticamente antes de guardarse. Los cambios se aplicarán inmediatamente en la página principal.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
