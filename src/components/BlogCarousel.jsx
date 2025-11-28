import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogCarousel = ({ posts = [] }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!posts || posts.length === 0) return null;

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + posts.length) % posts.length);
  };

  const currentPost = posts[currentIndex];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 12px 48px rgba(51, 44, 38, 0.15)',
      height: '500px'
    }}>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr'
          }}
        >
          {/* Imagen */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#ECBE8F'
          }}>
            {currentPost.featuredImage ? (
              <img
                src={currentPost.featuredImage}
                alt={currentPost.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px'
              }}>
                📝
              </div>
            )}
            {/* Overlay gradient */}
            <div style={{
              position: 'absolute',
              inset: '0',
              background: 'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.1) 100%)',
              pointerEvents: 'none'
            }} />
          </div>

          {/* Contenido */}
          <div style={{
            padding: '48px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentPost.featured && (
                <span style={{
                  display: 'inline-block',
                  fontFamily: 'Poppins-Regular, sans-serif',
                  fontSize: '11px',
                  color: '#ECBE8F',
                  fontWeight: '600',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px'
                }}>
                  ⭐ Destacado
                </span>
              )}

              <h2 style={{
                fontFamily: 'Poppins-Regular, sans-serif',
                fontSize: '32px',
                color: '#332C26',
                fontWeight: 'normal',
                margin: '0 0 16px 0',
                lineHeight: '1.3',
                letterSpacing: '-0.3px'
              }}>
                {currentPost.title}
              </h2>

              <p style={{
                fontFamily: 'Poppins-Regular, sans-serif',
                fontSize: '14px',
                color: '#5B5B5B',
                lineHeight: '1.7',
                margin: '0 0 24px 0'
              }}>
                {currentPost.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px',
                paddingBottom: '24px',
                borderBottom: '1px solid #EBEBEB'
              }}>
                <p style={{
                  fontFamily: 'Poppins-Regular, sans-serif',
                  fontSize: '12px',
                  color: '#999999',
                  margin: '0'
                }}>
                  {new Date(currentPost.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <div style={{
                  width: '1px',
                  height: '16px',
                  backgroundColor: '#EBEBEB'
                }} />
                <p style={{
                  fontFamily: 'Poppins-Regular, sans-serif',
                  fontSize: '12px',
                  color: '#999999',
                  margin: '0'
                }}>
                  {Math.ceil(currentPost.content.split(' ').length / 200)} min
                </p>
              </div>

              <button
                onClick={() => navigate(`/blog/${currentPost.id}`)}
                style={{
                  backgroundColor: '#353535',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  boxShadow: '0 4px 12px rgba(53, 53, 53, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#454545';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(53, 53, 53, 0.28)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#353535';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(53, 53, 53, 0.2)';
                }}
              >
                Ver Artículo
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={() => paginate(-1)}
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: '10',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#FFFFFF';
          e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }}
      >
        <ChevronLeft size={24} color="#332C26" />
      </button>

      <button
        onClick={() => paginate(1)}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: '10',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#FFFFFF';
          e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }}
      >
        <ChevronRight size={24} color="#332C26" />
      </button>

      {/* Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: '5'
      }}>
        {posts.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            style={{
              width: index === currentIndex ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: index === currentIndex ? '#ECBE8F' : '#EBEBEB',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            whileHover={{
              scale: 1.2
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogCarousel;
