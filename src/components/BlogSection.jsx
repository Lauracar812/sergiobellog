import React from 'react';
import { motion } from 'framer-motion';
import { useAdminContent } from '@/hooks/useAdminContent';

const BlogSection = () => {
  const { content } = useAdminContent();
  const { title, posts, buttonText } = content?.blogSection || {
    title: 'Blog',
    posts: [],
    buttonText: 'Hablemos'
  };

  const hasPosts = posts && posts.length > 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section style={{ backgroundColor: '#FFFFFF', paddingTop: '80px', paddingBottom: '80px', position: 'relative' }}>
      {/* Decorative circle background */}
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '400px',
        height: '400px',
        backgroundColor: '#ECBE8F',
        opacity: '0.05',
        borderRadius: '50%',
        zIndex: '0'
      }} />

      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: '1'
      }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px', width: '100%' }}
        >
          <h2 style={{
            fontFamily: 'Poppins-Regular, sans-serif',
            fontSize: '42px',
            color: '#332C26',
            fontWeight: 'normal',
            margin: '0 0 15px 0',
            letterSpacing: '-0.5px'
          }}>
            {title}
          </h2>
          <div style={{
            width: '60px',
            height: '3px',
            backgroundColor: '#ECBE8F',
            margin: '0 auto',
            borderRadius: '2px'
          }} />
        </motion.div>

        {/* Blog Grid or Empty State */}
        {!hasPosts ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto 60px',
              padding: '80px 40px',
              textAlign: 'center',
              backgroundColor: 'rgba(236, 190, 143, 0.08)',
              borderRadius: '12px',
              border: '2px dashed #ECBE8F',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>📚</div>
            <p style={{
              fontFamily: 'Poppins-Regular, sans-serif',
              fontSize: '22px',
              color: '#332C26',
              fontWeight: 'normal',
              margin: '0 0 10px 0',
              letterSpacing: '-0.3px'
            }}>
              Próximamente historias inspiradoras
            </p>
            <p style={{
              fontFamily: 'Poppins-Regular, sans-serif',
              fontSize: '14px',
              color: '#5B5B5B',
              fontWeight: 'normal',
              margin: '0'
            }}>
              Estamos preparando contenido exclusivo y reflexiones profundas para ti
            </p>
          </motion.div>
        ) : (
          <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Grid de 3 columnas */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '30px',
                width: '100%',
                margin: '0 auto 60px'
              }}
            >
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(51, 44, 38, 0.08)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #EBEBEB',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)',
                    cursor: 'pointer',
                    transform: 'translateY(0)',
                    height: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(51, 44, 38, 0.14)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = '#ECBE8F';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(51, 44, 38, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#EBEBEB';
                  }}
                >
                  {/* Featured Image */}
                  <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: post.featuredImage ? 'transparent' : '#ECBE8F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                    background: post.featuredImage ? 'transparent' : 'linear-gradient(135deg, #ECBE8F 0%, #E5B87F 100%)'
                  }}>
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    ) : (
                      <span style={{
                        fontFamily: 'Poppins-Regular, sans-serif',
                        fontSize: '48px',
                        color: '#FFFFFF',
                        fontWeight: 'normal'
                      }}>
                        📝
                      </span>
                    )}
                    {/* Overlay gradient */}
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.05) 100%)',
                      pointerEvents: 'none'
                    }} />
                  </div>

                  {/* Content */}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h4 style={{
                      fontFamily: 'Poppins-Regular, sans-serif',
                      fontSize: '18px',
                      color: '#332C26',
                      fontWeight: 'normal',
                      marginBottom: '10px',
                      marginTop: '0',
                      lineHeight: '1.4',
                      letterSpacing: '-0.2px'
                    }}>
                      {post.title}
                    </h4>

                    <p style={{
                      fontFamily: 'Poppins-Regular, sans-serif',
                      fontSize: '13px',
                      color: '#5B5B5B',
                      fontWeight: 'normal',
                      lineHeight: '1.6',
                      marginBottom: '20px',
                      margin: '0 0 20px 0',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      flex: 1
                    }}>
                      {post.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '12px',
                      borderTop: '1px solid #EBEBEB'
                    }}>
                      <p style={{
                        fontFamily: 'Poppins-Regular, sans-serif',
                        fontSize: '11px',
                        color: '#999999',
                        fontWeight: 'normal',
                        margin: '0'
                      }}>
                        {post.date ? new Date(post.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : 'Sin fecha'}
                      </p>
                      <span style={{
                        fontFamily: 'Poppins-Regular, sans-serif',
                        fontSize: '11px',
                        color: '#ECBE8F',
                        fontWeight: '600',
                        letterSpacing: '0.3px',
                        transition: 'color 0.2s ease'
                      }}>
                        Leer más →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* CTA Button */}
        {hasPosts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}
          >
            <button
              style={{
                backgroundColor: '#353535',
                color: '#FFFFFF',
                fontSize: '16px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                padding: '14px 40px',
                borderRadius: '8px',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
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
              {buttonText}
            </button>
          </motion.div>
        )}
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          [style*="gridTemplateColumns: repeat(3"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 640px) {
          [style*="gridTemplateColumns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
