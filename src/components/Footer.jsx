import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
