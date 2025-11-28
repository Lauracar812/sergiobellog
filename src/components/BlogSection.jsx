import React from 'react';
import { motion } from 'framer-motion';
import { useAdminContent } from '@/hooks/useAdminContent';

const BlogSection = () => {
  const { content } = useAdminContent();
  const { title, posts, buttonText } = content.blogSection || {
    title: 'Blog',
    posts: [],
    buttonText: 'Hablemos'
  };

  // Mostrar sección aunque no haya posts (para que sea visible en admin)
  const hasNoPosts = !posts || posts.length === 0;

  // Obtener post destacado y los demás
  const featuredPost = posts && posts.find(p => p.featured);
  const otherPosts = posts && posts.filter(p => !p.featured).slice(0, 2);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section style={{ backgroundColor: '#FFFFFF', paddingTop: '60px', paddingBottom: '60px' }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'Poppins-Regular, sans-serif',
            fontSize: '30px',
            color: '#332C26',
            textAlign: 'center',
            marginBottom: '50px',
            fontWeight: 'normal'
          }}
        >
          {title}
        </motion.h2>

        {/* Grid de Posts o Mensaje */}
        {hasNoPosts ? (
          <div style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto 50px',
            padding: '60px 20px',
            textAlign: 'center',
            backgroundColor: '#F5F5F5',
            borderRadius: '8px',
            border: '2px dashed #ECBE8F'
          }}>
            <p style={{
              fontFamily: 'Poppins-Regular, sans-serif',
              fontSize: '18px',
              color: '#5B5B5B',
              fontWeight: 'normal',
              margin: '0'
            }}>
              Próximamente nuevas historias y contenido inspirador...
            </p>
          </div>
        ) : (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          style={{
            display: 'grid',
            gridTemplateColumns: featuredPost && posts.length > 1 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto 50px'
          }}
        >
          {/* Post Destacado */}
          {featuredPost && (
            <motion.div
              variants={item}
              style={{
                gridColumn: '1 / 2',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                backgroundColor: '#FFFFFF',
                border: '2px solid #ECBE8F',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                {/* Imagen Destacada */}
                {featuredPost.featuredImage && (
                  <img
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover'
                    }}
                  />
                )}

                {/* Contenido */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{
                    fontFamily: 'Poppins-Regular, sans-serif',
                    fontSize: '12px',
                    color: '#ECBE8F',
                    fontWeight: 'normal',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Destacado
                  </span>

                  <h3 style={{
                    fontFamily: 'Poppins-Regular, sans-serif',
                    fontSize: '22px',
                    color: '#332C26',
                    fontWeight: 'normal',
                    marginBottom: '10px',
                    marginTop: '0'
                  }}>
                    {featuredPost.title}
                  </h3>

                  <p style={{
                    fontFamily: 'Poppins-Regular, sans-serif',
                    fontSize: '14px',
                    color: '#5B5B5B',
                    fontWeight: 'normal',
                    lineHeight: '1.6',
                    marginBottom: '15px',
                    flex: 1
                  }}>
                    {featuredPost.excerpt}
                  </p>

                  <p style={{
                    fontFamily: 'Poppins-Regular, sans-serif',
                    fontSize: '12px',
                    color: '#999999',
                    fontWeight: 'normal',
                    marginTop: 'auto'
                  }}>
                    {new Date(featuredPost.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Otros Posts */}
          <div style={{
            gridColumn: featuredPost ? '2 / 3' : 'auto',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '20px'
          }}>
            {(featuredPost ? otherPosts : posts.slice(0, 3)).map((post) => (
              <motion.div
                key={post.id}
                variants={item}
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EBEBEB',
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                {/* Imagen pequeña */}
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />
                )}

                {/* Contenido */}
                <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h4 style={{
                    fontFamily: 'Poppins-Regular, sans-serif',
                    fontSize: '16px',
                    color: '#332C26',
                    fontWeight: 'normal',
                    marginBottom: '8px',
                    marginTop: '0'
                  }}>
                    {post.title}
                  </h4>

                  <p style={{
                    fontFamily: 'Poppins-Regular, sans-serif',
                    fontSize: '12px',
                    color: '#5B5B5B',
                    fontWeight: 'normal',
                    lineHeight: '1.4',
                    marginBottom: '10px',
                    flex: 1
                  }}>
                    {post.excerpt}
                  </p>

                  <p style={{
                    fontFamily: 'Poppins-Regular, sans-serif',
                    fontSize: '11px',
                    color: '#999999',
                    fontWeight: 'normal',
                    margin: '0'
                  }}>
                    {new Date(post.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        )}

        {/* Botón */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <button
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
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#454545';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#353535';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {buttonText}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
