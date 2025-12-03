import React from 'react';
import { motion } from 'framer-motion';
import { useAdminContent } from '@/hooks/useAdminContent';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { content } = useAdminContent();
  const socialNetworks = content?.socialMedia?.networks || [];

  return (
    <footer style={{
      backgroundColor: '#332C26',
      color: '#FFFFFF',
      padding: '20px 20px',
      marginTop: '0',
      position: 'relative',
      zIndex: 1
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '10px'
        }}
      >
        {/* Línea decorativa */}
        <div style={{
          width: '60px',
          height: '2px',
          backgroundColor: '#ECBE8F',
          borderRadius: '1px'
        }} />

        {/* Redes Sociales */}
        {socialNetworks.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            marginTop: '10px',
            marginBottom: '10px',
            flexWrap: 'wrap'
          }}>
            {socialNetworks.map((network) => (
              <a
                key={network.id}
                href={network.link}
                target="_blank"
                rel="noopener noreferrer"
                title={network.name}
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(236, 190, 143, 0.15)',
                  transition: 'all 0.3s ease',
                  color: '#ECBE8F'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ECBE8F';
                  e.currentTarget.style.color = '#332C26';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(236, 190, 143, 0.15)';
                  e.currentTarget.style.color = '#ECBE8F';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div 
                  style={{ width: '18px', height: '18px' }}
                  dangerouslySetInnerHTML={{ __html: network.icon }}
                />
              </a>
            ))}
          </div>
        )}

        {/* Texto principal */}
        <p style={{
          fontFamily: 'Poppins-Regular, sans-serif',
          fontSize: '14px',
          fontWeight: 'normal',
          margin: '0',
          letterSpacing: '0.3px',
          lineHeight: '1.6'
        }}>
          © {currentYear} Sergio Bellog. Todos los derechos reservados.
        </p>

        <p style={{
          fontFamily: 'Poppins-Regular, sans-serif',
          fontSize: '12px',
          fontWeight: 'normal',
          margin: '0',
          color: '#CCCCCC',
          letterSpacing: '0.2px'
        }}>
          Desarrollado por Mundiweb - Agencia Digital
        </p>

        {/* Texto secundario */}
        <p style={{
          fontFamily: 'Poppins-Regular, sans-serif',
          fontSize: '12px',
          fontWeight: 'normal',
          margin: '0',
          color: '#CCCCCC',
          letterSpacing: '0.2px'
        }}>
          Transformando vidas a través de la escritura, la consultoría y el empoderamiento personal.
        </p>

        {/* Línea decorativa */}
        <div style={{
          width: '60px',
          height: '2px',
          backgroundColor: '#ECBE8F',
          borderRadius: '1px',
          marginTop: '10px'
        }} />
      </motion.div>
    </footer>
  );
}
