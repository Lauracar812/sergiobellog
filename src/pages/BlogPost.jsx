import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ChevronLeft, Share2, Calendar } from 'lucide-react';
import { useAdminContent } from '@/hooks/useAdminContent';
import Header from '@/components/Header';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { content } = useAdminContent();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const allPosts = content?.blogSection?.posts || [];
    const idToFind = String(id);
    const currentPost = allPosts.find(p => String(p.id) === idToFind);
    
    if (currentPost) {
      setPost(currentPost);
      // Obtener posts relacionados (excluyendo el actual)
      const related = allPosts
        .filter(p => String(p.id) !== idToFind)
        .slice(0, 3);
      setRelatedPosts(related);
    } else {
      // Si no existe el post, redirigir al home
      navigate('/');
    }
  }, [id, content, navigate]);

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
          <p style={{ fontFamily: 'Poppins-Regular, sans-serif', color: '#5B5B5B' }}>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Sergio Bellog Blog</title>
        <meta name="description" content={post.description} />
      </Helmet>

      <Header />

      <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        {/* Header Navigation */}
        <div style={{
          padding: '20px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #EBEBEB',
          position: 'sticky',
          top: '80px',
          zIndex: '40',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)'
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <button
              onClick={() => navigate('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Poppins-Regular, sans-serif',
                fontSize: '14px',
                color: '#332C26',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ECBE8F';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#332C26';
              }}
            >
              <ChevronLeft size={18} />
              Volver al blog
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.description,
                    url: window.location.href
                  });
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'transparent',
                border: '1px solid #EBEBEB',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: '6px',
                fontFamily: 'Poppins-Regular, sans-serif',
                fontSize: '12px',
                color: '#5B5B5B',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#ECBE8F';
                e.target.style.color = '#ECBE8F';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#EBEBEB';
                e.target.style.color = '#5B5B5B';
              }}
            >
              <Share2 size={14} />
              Compartir
            </button>
          </div>
        </div>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            paddingTop: '60px',
            paddingBottom: '60px',
            paddingLeft: '20px',
            paddingRight: '20px'
          }}
        >
          {/* Hero Image */}
          {post.featuredImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                marginBottom: '40px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(51, 44, 38, 0.12)',
                height: '400px'
              }}
            >
              <img
                src={post.featuredImage}
                alt={post.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </motion.div>
          )}

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: '40px' }}
          >
            {post.featured && (
              <span style={{
                display: 'inline-block',
                fontFamily: 'Poppins-Regular, sans-serif',
                fontSize: '11px',
                color: '#ECBE8F',
                fontWeight: '600',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1.2px'
              }}>
                ⭐ Artículo Destacado
              </span>
            )}

            <h1 style={{
              fontFamily: 'Poppins-Regular, sans-serif',
              fontSize: '48px',
              color: '#332C26',
              fontWeight: 'normal',
              margin: '0 0 20px 0',
              lineHeight: '1.2',
              letterSpacing: '-0.5px'
            }}>
              {post.title}
            </h1>

            {/* Meta Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              paddingTop: '20px',
              borderTop: '1px solid #EBEBEB'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Poppins-Regular, sans-serif',
                fontSize: '13px',
                color: '#5B5B5B'
              }}>
                <Calendar size={16} />
                {new Date(post.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div style={{
                width: '1px',
                height: '20px',
                backgroundColor: '#EBEBEB'
              }} />
              <div style={{
                fontFamily: 'Poppins-Regular, sans-serif',
                fontSize: '13px',
                color: '#5B5B5B'
              }}>
                {Math.ceil(post.content.split(' ').length / 200)} min lectura
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              marginBottom: '40px',
              padding: '24px',
              backgroundColor: 'rgba(236, 190, 143, 0.08)',
              borderRadius: '8px',
              borderLeft: '4px solid #ECBE8F'
            }}
          >
            <p style={{
              fontFamily: 'Poppins-Regular, sans-serif',
              fontSize: '16px',
              color: '#332C26',
              fontWeight: 'normal',
              lineHeight: '1.7',
              margin: '0'
            }}>
              {post.description}
            </p>
          </motion.div>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ marginBottom: '60px' }}
          >
            <div style={{
              fontFamily: 'Poppins-Regular, sans-serif',
              fontSize: '16px',
              color: '#5B5B5B',
              lineHeight: '1.8',
              letterSpacing: '0.3px',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word'
            }}>
              {post.content}
            </div>
          </motion.article>

          {/* Divider */}
          <div style={{
            height: '1px',
            backgroundColor: '#EBEBEB',
            margin: '60px 0'
          }} />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 style={{
                fontFamily: 'Poppins-Regular, sans-serif',
                fontSize: '28px',
                color: '#332C26',
                fontWeight: 'normal',
                marginBottom: '30px',
                marginTop: '0'
              }}>
                Artículos Relacionados
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px'
              }}>
                {relatedPosts.map((relPost) => (
                  <motion.div
                    key={relPost.id}
                    whileHover={{ y: -4 }}
                    onClick={() => navigate(`/blog/${relPost.id}`)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 16px rgba(51, 44, 38, 0.08)',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #EBEBEB',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(51, 44, 38, 0.14)';
                      e.currentTarget.style.borderColor = '#ECBE8F';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(51, 44, 38, 0.08)';
                      e.currentTarget.style.borderColor = '#EBEBEB';
                    }}
                  >
                    {relPost.featuredImage && (
                      <div style={{
                        height: '180px',
                        overflow: 'hidden',
                        backgroundColor: '#ECBE8F'
                      }}>
                        <img
                          src={relPost.featuredImage}
                          alt={relPost.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    )}

                    <div style={{ padding: '20px' }}>
                      <h3 style={{
                        fontFamily: 'Poppins-Regular, sans-serif',
                        fontSize: '16px',
                        color: '#332C26',
                        fontWeight: 'normal',
                        marginBottom: '10px',
                        marginTop: '0',
                        lineHeight: '1.4'
                      }}>
                        {relPost.title}
                      </h3>

                      <p style={{
                        fontFamily: 'Poppins-Regular, sans-serif',
                        fontSize: '13px',
                        color: '#5B5B5B',
                        lineHeight: '1.6',
                        margin: '0 0 12px 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {relPost.description}
                      </p>

                      <p style={{
                        fontFamily: 'Poppins-Regular, sans-serif',
                        fontSize: '11px',
                        color: '#999999',
                        margin: '0'
                      }}>
                        {new Date(relPost.date).toLocaleDateString('es-ES', {
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
        </motion.main>
      </div>
    </>
  );
};

export default BlogPost;
