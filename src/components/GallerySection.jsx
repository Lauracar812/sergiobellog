import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAdminContent } from '@/hooks/useAdminContent';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function GallerySection() {
  const { content } = useAdminContent();
  const [galleryData, setGalleryData] = useState(content?.gallerySection || {
    title: 'Galería',
    images: [],
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Actualizar los datos cuando cambia el contenido
  useEffect(() => {
    if (content?.gallerySection) {
      setGalleryData(content.gallerySection);
    }
  }, [content]);

  const visibleImages = galleryData.images || [];

  const handlePrevious = () => {
    if (visibleImages.length === 0) return;
    setCurrentIndex((prev) =>
      prev === 0 ? visibleImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (visibleImages.length === 0) return;
    setCurrentIndex((prev) =>
      prev === visibleImages.length - 1 ? 0 : prev + 1
    );
  };

  const getCurrentImage = () => {
    if (visibleImages.length === 0) return null;
    return visibleImages[currentIndex];
  };

  if (visibleImages.length === 0) {
    return (
      <section className="py-16" style={{ backgroundColor: '#EAEAEA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-400">Sin imágenes disponibles aún</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16" style={{ backgroundColor: '#EAEAEA' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título centrado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            style={{ 
              fontSize: '30px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
            }} 
            className="text-gray-800"
          >
            {galleryData.title}
          </h2>
        </motion.div>

        {/* Carrusel con sombras curvas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex items-center justify-center mb-12"
        >
          {/* Sombra superior curva */}
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              left: 0,
              right: 0,
              height: '30px',
              background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(0, 0, 0, 0.15) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Botón anterior */}
          {visibleImages.length > 1 && (
            <button
              onClick={handlePrevious}
              className="absolute left-0 z-10 p-3 rounded-full hover:bg-gray-300 transition-colors"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <ChevronLeft size={32} className="text-gray-700" />
            </button>
          )}

          {/* Imagen actual */}
          {getCurrentImage() && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <img
                src={getCurrentImage().image}
                alt="Galería"
                className="rounded-lg max-h-96 w-auto object-contain"
              />
            </motion.div>
          )}

          {/* Botón siguiente */}
          {visibleImages.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-0 z-10 p-3 rounded-full hover:bg-gray-300 transition-colors"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <ChevronRight size={32} className="text-gray-700" />
            </button>
          )}

          {/* Sombra inferior curva */}
          <div
            style={{
              position: 'absolute',
              bottom: '-20px',
              left: 0,
              right: 0,
              height: '30px',
              background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(0, 0, 0, 0.15) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>

        {/* Indicadores de puntos */}
        {visibleImages.length > 1 && (
          <div className="flex justify-center gap-2 mb-8">
            {visibleImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-gray-700 w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
