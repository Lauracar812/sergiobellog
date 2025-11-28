import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAdminContent } from '@/hooks/useAdminContent';
import { useContactModal } from '@/context/ContactModalContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BooksSection() {
  const { content } = useAdminContent();
  const { setIsOpen } = useContactModal();
  const [booksData, setBooksData] = useState(content?.booksSection || {
    title: 'Mis Libros',
    books: [],
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Actualizar los datos cuando cambia el contenido
  useEffect(() => {
    if (content?.booksSection) {
      setBooksData(content.booksSection);
    }
  }, [content]);

  const visibleBooks = booksData.books || [];

  const handlePrevious = () => {
    if (visibleBooks.length === 0) return;
    setCurrentIndex((prev) =>
      prev === 0 ? visibleBooks.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (visibleBooks.length === 0) return;
    setCurrentIndex((prev) =>
      prev === visibleBooks.length - 1 ? 0 : prev + 1
    );
  };

  // Mostrar solo el libro actual
  const getCurrentBook = () => {
    if (visibleBooks.length === 0) return null;
    return visibleBooks[currentIndex];
  };

  // Mostrar 3 libros a la vez (actual + vecinos)
  const getVisibleBooks = () => {
    const books = [];
    const total = visibleBooks.length;
    
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + total) % total;
      books.push({
        index,
        book: visibleBooks[index],
        position: i,
      });
    }
    return books;
  };

  if (visibleBooks.length === 0) {
    return (
      <section className="py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-400">Sin libros disponibles aún</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16" style={{ backgroundColor: '#FFFFFF' }}>
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
              fontFamily: 'Poppins-Regular',
              color: '#332C26',
              textAlign: 'center',
              fontWeight: 'normal'
            }}
          >
            {booksData.title}
          </h2>
        </motion.div>

        {/* Carrusel con flechas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex items-center justify-center mb-12"
        >
          {/* Botón anterior */}
          {visibleBooks.length > 1 && (
            <button
              onClick={handlePrevious}
              className="absolute left-0 z-10 p-3 rounded-full hover:bg-gray-100 transition-colors"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <ChevronLeft size={32} className="text-gray-700" />
            </button>
          )}

          {/* Contenedor de libros */}
          <div className="flex justify-center gap-8 items-center px-16">
            {getVisibleBooks().map(({ book, position }) => (
              <motion.div
                key={book.id}
                className="flex flex-col items-center flex-shrink-0"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="rounded-lg"
                  style={{ maxHeight: '400px', width: 'auto' }}
                />
              </motion.div>
            ))}
          </div>

          {/* Botón siguiente */}
          {visibleBooks.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-0 z-10 p-3 rounded-full hover:bg-gray-100 transition-colors"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <ChevronRight size={32} className="text-gray-700" />
            </button>
          )}
        </motion.div>

        {/* Indicadores de puntos */}
        {visibleBooks.length > 1 && (
          <div className="flex justify-center gap-2 mb-8">
            {visibleBooks.map((_, index) => (
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

        {/* Botón HABLEMOS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <button
            onClick={() => setIsOpen(true)}
            style={{
              backgroundColor: '#353535',
              color: '#FFFFFF',
              fontSize: '30px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              padding: '10px 30px',
              borderRadius: '8px',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#454545';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#353535';
              e.target.style.transform = 'translateY(0)';
            }}
            className="hover:shadow-lg"
          >
            HABLEMOS
          </button>
        </motion.div>
      </div>
    </section>
  );
}
