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
      backgroundColor: 'transparent',
      borderRadius: '0',
      overflow: 'visible',
      boxShadow: 'none',
      height: 'auto'
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
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Card Widget */}
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(51, 44, 38, 0.12)',
            backgroundColor: '#FFFFFF',
            border: '1px solid #EBEBEB',
            transition: 'all 0.3s ease',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {/* Imagen Destacada - Full width arriba */}
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#ECBE8F',
              height: '280px',
              width: '100%'
            }}>
              {currentPost.featuredImage ? (
                <img
                  src={currentPost.featuredImage}
                  alt={currentPost.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '80px',
                  background: 'linear-gradient(135deg, #ECBE8F 0%, #E5B87F 100%)'
                }}>
                  📝
                </div>
              )}
              {/* Overlay gradient */}
              <div style={{
                position: 'absolute',
                inset: '0',
                background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.02) 100%)',
                pointerEvents: 'none'
              }} />
            </div>

            {/* Contenido */}
            <div style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
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
                    textTransform: 'uppercase',
                    letterSpacing: '1.2px',
                    alignSelf: 'flex-start'
                  }}>
                    ⭐ Destacado
                  </span>
                )}

                <h2 style={{
                  fontFamily: 'Poppins-Regular, sans-serif',
                  fontSize: '26px',
                  color: '#332C26',
                  fontWeight: 'normal',
                  margin: '0',
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
                  margin: '0',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {currentPost.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid #EBEBEB'
                }}>
                  <p style={{
                    fontFamily: 'Poppins-Regular, sans-serif',
                    fontSize: '12px',
                    color: '#999999',
                    margin: '0'
                  }}>
                    {new Date(currentPost.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  <div style={{
                    width: '1px',
                    height: '14px',
                    backgroundColor: '#EBEBEB'
                  }} />
                  <p style={{
                    fontFamily: 'Poppins-Regular, sans-serif',
                    fontSize: '12px',
                    color: '#999999',
                    margin: '0'
                  }}>
                    {Math.ceil(currentPost.content.split(' ').length / 200)} min de lectura
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/blog/${currentPost.id}`)}
                  style={{
                    backgroundColor: '#353535',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '6px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '13px',
                    fontWeight: 400,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    display: 'inline-block',
                    boxShadow: '0 4px 12px rgba(53, 53, 53, 0.2)',
                    marginTop: '8px',
                    alignSelf: 'flex-start'
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
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '24px',
        gap: '16px'
      }}>
        <button
          onClick={() => paginate(-1)}
          style={{
            backgroundColor: 'rgba(51, 44, 38, 0.08)',
            border: '1px solid #EBEBEB',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(51, 44, 38, 0.04)',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(51, 44, 38, 0.12)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(51, 44, 38, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(51, 44, 38, 0.08)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(51, 44, 38, 0.04)';
          }}
        >
          <ChevronLeft size={20} color="#332C26" />
        </button>

        {/* Indicators */}
        <div style={{
          display: 'flex',
          gap: '6px',
          justifyContent: 'center',
          flex: 1
        }}>
          {posts.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              style={{
                width: index === currentIndex ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                border: 'none',
                backgroundColor: index === currentIndex ? '#ECBE8F' : '#EBEBEB',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              whileHover={{
                scale: 1.15
              }}
            />
          ))}
        </div>

        <button
          onClick={() => paginate(1)}
          style={{
            backgroundColor: 'rgba(51, 44, 38, 0.08)',
            border: '1px solid #EBEBEB',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(51, 44, 38, 0.04)',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(51, 44, 38, 0.12)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(51, 44, 38, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(51, 44, 38, 0.08)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(51, 44, 38, 0.04)';
          }}
        >
          <ChevronRight size={20} color="#332C26" />
        </button>
      </div>
    </div>
  );
};

export default BlogCarousel;
