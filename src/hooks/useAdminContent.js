import { useState, useEffect, useCallback } from 'react';

const DEFAULT_CONTENT = {
  heroSection: {
    title: '',
    description: '"Autor de ficción y no ficción transformadora: Escribiendo para el cambio, empoderando mentes, inspirando resiliencia y crecimiento"',
    backgroundImageDesktop: 'https://horizons-cdn.hostinger.com/117acb36-31dc-4706-a945-f23250275492/fba21a42a3efa38403e12e1c11d1b229.png',
    backgroundImageMobile: 'https://horizons-cdn.hostinger.com/117acb36-31dc-4706-a945-f23250275492/fba21a42a3efa38403e12e1c11d1b229.png',
    logoImage: 'https://horizons-cdn.hostinger.com/117acb36-31dc-4706-a945-f23250275492/abded8c8564e182b7e4a4cba61d52acb.png',
    buttonText: 'Hablemos'
  },
  aboutSection: {
    title: 'Sobre mí',
    biography: `Autor bestseller del New York Times e internacional. Autor mexicano de ficción y no ficción | Defensor de la inclusión de personas con discapacidad | Líder de opinión en desarrollo personal.

Sergio Andrés Bello Guerra es un destacado autor, académico y defensor de la inclusión en México, reconocido por una voz poderosa que combina experiencia personal y solidez profesional. Originario de Oaxaca, es padre de dos hijos con discapacidad, una realidad que ha marcado profundamente su visión del mundo y ha inspirado gran parte de su obra literaria, tanto de ficción como de no ficción.

Sus escritos exploran temas como la resiliencia, el empoderamiento y el potencial humano. Con una formación académica multidisciplinaria —Licenciatura en Ingeniería de Sistemas Informáticos, Doctorado en Ciencias Políticas y Maestría en Escritura Creativa— Sergio aporta a sus libros una mezcla única de rigor intelectual, sensibilidad humana y claridad emocional.

Su experiencia en el servicio público, donde ha trabajado en iniciativas relacionadas con comunidades indígenas, transparencia gubernamental y desarrollo económico, complementa su misión como escritor: empoderar a las personas para superar la adversidad, reconocer su fortaleza interior y expandir sus capacidades más allá de los límites autoimpuestos.

Los libros, artículos y ensayos de Sergio no solo inspiran: funcionan como una guía práctica para quienes buscan crecimiento personal, inclusión social y un propósito renovado. Tanto si lees sus reflexiones profundas sobre desarrollo humano como sus historias de ficción con sensibilidad social, su voz transmite autenticidad, esperanza y compromiso real con la transformación.`,
    authorImage: null,
  },
  booksSection: {
    title: 'Mis Libros',
    books: []
  }
};

const STORAGE_KEY = 'admin-content';

export const useAdminContent = () => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar contenido del localStorage
  const loadContent = useCallback(() => {
    console.log('📥 Cargando contenido desde localStorage...');
    const savedContent = localStorage.getItem(STORAGE_KEY);
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        console.log('✅ Contenido cargado desde localStorage');
        setContent(parsed);
      } catch (error) {
        console.error('❌ Error al parsear localStorage:', error);
        setContent(DEFAULT_CONTENT);
      }
    } else {
      console.log('ℹ️ No hay contenido guardado, usando valores por defecto');
      setContent(DEFAULT_CONTENT);
    }
    setIsLoading(false);
  }, []);

  // Cargar contenido al montar
  useEffect(() => {
    loadContent();
  }, [loadContent]);

  // Escuchar cambios en localStorage desde otras pestañas/componentes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        console.log('🔄 Detectado cambio en localStorage desde otra pestaña');
        loadContent();
      }
    };

    // Escuchar evento storage (cuando cambia en otra pestaña)
    window.addEventListener('storage', handleStorageChange);

    // También escuchar evento personalizado (cuando cambia en la misma pestaña)
    const handleCustomEvent = () => {
      console.log('🔄 Detectado evento personalizado de cambio de contenido');
      loadContent();
    };
    window.addEventListener('admin-content-updated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('admin-content-updated', handleCustomEvent);
    };
  }, [loadContent]);

  // Guardar contenido en localStorage con fallback a Supabase
  const saveContent = (newContent) => {
    try {
      const jsonString = JSON.stringify(newContent);
      const sizeInBytes = jsonString.length;
      const sizeInMB = (sizeInBytes / 1024 / 1024).toFixed(2);
      
      console.log(`💾 Intentando guardar ${sizeInMB}MB de datos`);
      
      // Verificar límite antes de guardar
      if (sizeInBytes > 5000000) {
        const error = new Error(`Datos demasiado grandes (${sizeInMB}MB). Límite: ~5MB`);
        console.error('Error:', error.message);
        throw error;
      }
      
      localStorage.setItem(STORAGE_KEY, jsonString);
      setContent(newContent);
      
      // Disparar evento personalizado para que otros componentes se enteren
      console.log('📢 Disparando evento de cambio de contenido');
      window.dispatchEvent(new Event('admin-content-updated'));
      
      console.log(`✅ Datos guardados exitosamente (${sizeInMB}MB)`);
      return { success: true, sizeInMB };
    } catch (error) {
      console.error('Error al guardar contenido:', error);
      
      // Manejar errores específicos
      if (error.name === 'QuotaExceededError' || error.code === 22) {
        return { 
          success: false, 
          error: 'localStorage lleno. Las imágenes son muy grandes. Intenta comprimir las imágenes.' 
        };
      }
      
      return { 
        success: false, 
        error: error.message || 'Error desconocido al guardar' 
      };
    }
  };

  // Convertir y comprimir imagen a Base64 de forma más agresiva
  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          try {
            const img = new Image();
            img.src = e.target.result;
            
            img.onload = () => {
              // Crear canvas para redimensionar
              const canvas = document.createElement('canvas');
              let width = img.width;
              let height = img.height;
              
              // Limitar tamaño a máximo 800px de ancho para más compresión
              const MAX_WIDTH = 800;
              if (width > MAX_WIDTH) {
                height = (height * MAX_WIDTH) / width;
                width = MAX_WIDTH;
              }
              
              canvas.width = width;
              canvas.height = height;
              
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, width, height);
              
              // Probar diferentes calidades para encontrar la mejor compresión
              let quality = 0.6; // Comenzar con 0.6 en lugar de 0.8
              let compressedBase64 = canvas.toDataURL('image/jpeg', quality);
              
              // Si aún es muy grande, reducir más
              while (compressedBase64.length > 2000000 && quality > 0.3) {
                quality -= 0.1;
                compressedBase64 = canvas.toDataURL('image/jpeg', quality);
              }
              
              const originalSize = (e.target.result.length / 1024 / 1024).toFixed(2);
              const compressedSize = (compressedBase64.length / 1024 / 1024).toFixed(2);
              
              console.log(`✅ Imagen comprimida: ${originalSize}MB → ${compressedSize}MB (calidad: ${quality})`);
              resolve({ success: true, url: compressedBase64 });
            };
            
            img.onerror = () => {
              reject(new Error('No se pudo cargar la imagen'));
            };
          } catch (error) {
            console.error('Error procesando imagen:', error);
            reject(error);
          }
        };
        
        reader.onerror = (error) => {
          console.error('❌ Error en FileReader:', error);
          reject(new Error('Error al leer el archivo'));
        };
        
        reader.onabort = () => {
          reject(new Error('Lectura de archivo abortada'));
        };
        
        console.log('📤 Leyendo archivo:', file.name, `(${(file.size / 1024 / 1024).toFixed(2)} MB)`);
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('❌ Error en uploadImage:', error);
        reject(error);
      }
    });
  };

  // Actualizar una sección específica
  const updateSection = (section, data) => {
    const updatedContent = {
      ...content,
      [section]: {
        ...content[section],
        ...data
      }
    };
    saveContent(updatedContent);
  };

  // Resetear al contenido por defecto
  const resetContent = () => {
    setContent(DEFAULT_CONTENT);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    content,
    isLoading,
    saveContent,
    uploadImage,
    updateSection,
    resetContent,
    defaultContent: DEFAULT_CONTENT
  };
};
