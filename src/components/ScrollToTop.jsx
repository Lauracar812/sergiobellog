import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar botón cuando se hace scroll hacia abajo
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
          style={{
            backgroundColor: '#ECBE8F',
            color: '#332C26',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#D4A574';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ECBE8F';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          aria-label="Volver arriba"
          title="Volver arriba"
        >
          <ChevronUp size={24} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
