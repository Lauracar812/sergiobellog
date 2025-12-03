import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inicializar Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

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
  },
  gallerySection: {
    title: 'Galería',
    images: []
  },
  eventsSection: {
    title: 'Eventos',
    events: []
  },
  servicesSection: {
    title: 'Servicios',
    buttonText: 'Hablemos',
    services: [
      {
        id: 1,
        title: 'Escritor',
        description: 'Contenido inspirador y transformador',
        icon: null
      },
      {
        id: 2,
        title: 'Coach de Vida',
        description: 'Desarrollo personal y empoderamiento',
        icon: null
      },
      {
        id: 3,
        title: 'Asesor Personal y Empresarial',
        description: 'Asesoría especializada para tu crecimiento',
        icon: null
      },
      {
        id: 4,
        title: 'Conferencista',
        description: 'Conferencias motivacionales e inspiradoras',
        icon: null
      },
      {
        id: 5,
        title: 'Director de Arimes',
        description: 'Dirección y gestión estratégica',
        icon: null
      }
    ]
  },
  blogSection: {
    title: 'Blog',
    buttonText: 'Hablemos',
    posts: []
  },
  socialMedia: {
    networks: []
  }
};

const STORAGE_KEY = 'admin-content';

export const useAdminContent = () => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar contenido desde Supabase
  const loadContent = useCallback(async () => {
    console.log('📥 Cargando contenido...');
    
    // Si Supabase no está configurado, usar localStorage
    if (!supabase) {
      console.log('⚠️ Supabase no configurado, usando localStorage');
      const savedContent = localStorage.getItem(STORAGE_KEY);
      if (savedContent) {
        try {
          const parsed = JSON.parse(savedContent);
          // Asegurar que socialMedia exista
          if (!parsed.socialMedia) {
            parsed.socialMedia = { networks: [] };
          }
          console.log('✅ Contenido cargado desde localStorage');
          setContent(parsed);
        } catch (error) {
          console.error('❌ Error al parsear localStorage:', error);
          setContent(DEFAULT_CONTENT);
        }
      } else {
        setContent(DEFAULT_CONTENT);
      }
      setIsLoading(false);
      return;
    }

    try {
      // Cargar todas las secciones
      const [heroRes, aboutRes, booksRes, galleryRes, blogRes, servicesRes, eventsRes, socialRes] = await Promise.all([
        supabase.from('hero_section').select('*').single(),
        supabase.from('about_section').select('*').single(),
        supabase.from('books').select('*'),
        supabase.from('gallery_images').select('*'),
        supabase.from('blog_posts').select('*'),
        supabase.from('services').select('*'),
        supabase.from('events').select('*'),
        supabase.from('social_media').select('*').order('display_order', { ascending: true }),
      ]);

      // Construir objeto de contenido
      const loadedContent = {
        heroSection: heroRes.data ? {
          title: heroRes.data.title || '',
          description: heroRes.data.description || DEFAULT_CONTENT.heroSection.description,
          backgroundImageDesktop: heroRes.data.background_image_desktop || DEFAULT_CONTENT.heroSection.backgroundImageDesktop,
          backgroundImageMobile: heroRes.data.background_image_mobile || DEFAULT_CONTENT.heroSection.backgroundImageMobile,
          logoImage: heroRes.data.logo_image || DEFAULT_CONTENT.heroSection.logoImage,
          buttonText: heroRes.data.button_text || 'Hablemos'
        } : DEFAULT_CONTENT.heroSection,

        aboutSection: aboutRes.data ? {
          title: aboutRes.data.title || 'Sobre mí',
          biography: aboutRes.data.biography || DEFAULT_CONTENT.aboutSection.biography,
          authorImage: aboutRes.data.author_image || null,
        } : DEFAULT_CONTENT.aboutSection,

        booksSection: {
          title: 'Mis Libros',
          books: (booksRes.data || []).map(book => ({
            id: book.id,
            title: book.title,
            coverImage: book.cover_image,
            purchaseLink: book.purchase_link || '',
          }))
        },

        gallerySection: {
          title: 'Galería',
          images: (galleryRes.data || []).map(img => ({
            id: img.id,
            image: img.image,
          }))
        },

        eventsSection: {
          title: 'Eventos',
          events: (eventsRes.data || []).map(event => ({
            id: event.id,
            eventName: event.event_name,
            eventDescription: event.event_description,
            eventDate: event.event_date,
            eventTime: event.event_time,
            eventLocation: event.event_location,
          }))
        },

        servicesSection: {
          title: 'Servicios',
          buttonText: 'Hablemos',
          services: (servicesRes.data || []).map(service => ({
            id: service.id,
            title: service.title,
            description: service.description,
            icon: service.icon,
          }))
        },

        blogSection: {
          title: 'Blog',
          buttonText: 'Hablemos',
          posts: (blogRes.data || []).map(post => ({
            id: post.id,
            title: post.title,
            description: post.description,
            content: post.content,
            date: post.date_created,
            featured: post.featured,
            featuredImage: post.featured_image,
          }))
        },

        // Cargar socialMedia desde Supabase
        socialMedia: {
          networks: (socialRes.data || []).map(social => ({
            id: social.id,
            name: social.name,
            icon: social.icon,
            iconId: social.icon.includes('<svg') ? '' : social.icon,
            link: social.url,
            displayOrder: social.display_order,
            isActive: social.is_active,
          }))
        }
      };

      console.log('✅ Contenido cargado desde Supabase');
      setContent(loadedContent);
    } catch (error) {
      console.error('❌ Error al cargar desde Supabase:', error);
      // Fallback a localStorage
      const savedContent = localStorage.getItem(STORAGE_KEY);
      if (savedContent) {
        try {
          const parsed = JSON.parse(savedContent);
          setContent(parsed);
        } catch (e) {
          setContent(DEFAULT_CONTENT);
        }
      } else {
        setContent(DEFAULT_CONTENT);
      }
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

  // Guardar contenido en Supabase (con fallback a localStorage)
  const saveContent = async (newContent) => {
    try {
      console.log('💾 Intentando guardar contenido...');
      
      // Si Supabase no está configurado, guardar solo en localStorage
      if (!supabase) {
        console.log('⚠️ Supabase no configurado, guardando en localStorage');
        const jsonString = JSON.stringify(newContent);
        const sizeInMB = (jsonString.length / 1024 / 1024).toFixed(2);
        
        if (jsonString.length > 5000000) {
          return { 
            success: false, 
            error: `Datos demasiado grandes (${sizeInMB}MB). Límite: ~5MB` 
          };
        }
        
        localStorage.setItem(STORAGE_KEY, jsonString);
        setContent(newContent);
        window.dispatchEvent(new Event('admin-content-updated'));
        return { success: true, sizeInMB };
      }

      // Guardar en Supabase
      const { heroSection, aboutSection, booksSection, gallerySection, blogSection, servicesSection, eventsSection } = newContent;

      // Guardar hero_section
      await supabase.from('hero_section').update({
        title: heroSection.title,
        description: heroSection.description,
        background_image_desktop: heroSection.backgroundImageDesktop,
        background_image_mobile: heroSection.backgroundImageMobile,
        logo_image: heroSection.logoImage,
        button_text: heroSection.buttonText,
      }).eq('id', 1);

      // Guardar about_section
      await supabase.from('about_section').update({
        title: aboutSection.title,
        biography: aboutSection.biography,
        author_image: aboutSection.authorImage,
      }).eq('id', 1);

      // Limpiar y guardar libros
      await supabase.from('books').delete().neq('id', -1);
      for (const book of booksSection.books) {
        await supabase.from('books').insert({
          id: book.id,
          title: book.title,
          cover_image: book.coverImage,
          purchase_link: book.purchaseLink || '',
        });
      }

      // Limpiar y guardar imágenes de galería
      await supabase.from('gallery_images').delete().neq('id', -1);
      for (const img of gallerySection.images) {
        await supabase.from('gallery_images').insert({
          id: img.id,
          image: img.image,
        });
      }

      // Limpiar y guardar servicios
      await supabase.from('services').delete().neq('id', -1);
      for (const service of servicesSection.services) {
        await supabase.from('services').insert({
          id: service.id,
          title: service.title,
          description: service.description,
          icon: service.icon,
        });
      }

      // Limpiar y guardar eventos
      await supabase.from('events').delete().neq('id', -1);
      for (const event of eventsSection.events) {
        await supabase.from('events').insert({
          id: event.id,
          event_name: event.eventName,
          event_description: event.eventDescription,
          event_date: event.eventDate,
          event_time: event.eventTime,
          event_location: event.eventLocation,
        });
      }

      // Limpiar y guardar posts del blog
      await supabase.from('blog_posts').delete().neq('id', -1);
      for (const post of blogSection.posts) {
        await supabase.from('blog_posts').insert({
          id: post.id,
          title: post.title,
          description: post.description,
          content: post.content,
          date_created: post.date,
          featured: post.featured,
          featured_image: post.featuredImage,
        });
      }

      // Limpiar y guardar redes sociales en Supabase
      if (newContent.socialMedia && newContent.socialMedia.networks) {
        try {
          // Primero eliminar todas las redes existentes
          await supabase.from('social_media').delete().neq('id', -1);
          
          // Insertar las nuevas redes
          for (let i = 0; i < newContent.socialMedia.networks.length; i++) {
            const network = newContent.socialMedia.networks[i];
            await supabase.from('social_media').insert({
              id: typeof network.id === 'number' && network.id > 0 ? network.id : undefined,
              name: network.name,
              icon: network.icon,
              url: network.link,
              display_order: i + 1,
              is_active: network.isActive !== false,
            });
          }
          console.log('✅ Redes sociales guardadas en Supabase');
        } catch (e) {
          console.error('❌ Error guardando socialMedia en Supabase:', e);
        }
      }

      setContent(newContent);
      window.dispatchEvent(new Event('admin-content-updated'));
      console.log('✅ Contenido guardado exitosamente en Supabase');
      return { success: true };
    } catch (error) {
      console.error('Error al guardar contenido:', error);
      
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
    return saveContent(updatedContent);
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
