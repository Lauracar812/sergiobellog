import React from 'react';
import { useAdminContent } from '@/hooks/useAdminContent';

const ServicesSection = () => {
  const { content } = useAdminContent();
  const { title, services, buttonText } = content.servicesSection || { 
    title: 'Servicios',
    services: [],
    buttonText: 'Hablemos'
  };

  if (!services || services.length === 0) return null;

  // Definir iconos por defecto para cada servicio
  const getDefaultIcon = (serviceTitle) => {
    const iconMap = {
      'Escritor': '✍️',
      'Coach de Vida': '🎯',
      'Asesor Personal y Empresarial': '💼',
      'Conferencista': '🎤',
      'Director de Arimes': '🏆'
    };
    return iconMap[serviceTitle] || '⭐';
  };

  return (
    <section style={{ backgroundColor: '#EAEAEA', paddingTop: '60px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        {/* Título */}
        <h2
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
        </h2>

        {/* Grid de Servicios - 1 fila (5 columnas) centrado */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '50px'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '40px',
              maxWidth: 'fit-content'
            }}
          >
            {services.map((service) => (
            <div
              key={service.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              {/* Ícono Circular */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  fontSize: '40px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  flexShrink: 0,
                  overflow: 'hidden'
                }}
              >
                {service.icon ? (
                  typeof service.icon === 'string' && service.icon.startsWith('data:') ? (
                    <img 
                      src={service.icon} 
                      alt={service.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    service.icon
                  )
                ) : (
                  getDefaultIcon(service.title)
                )}
              </div>

              {/* Título del Servicio */}
              <h3
                style={{
                  fontFamily: 'Poppins-Regular, sans-serif',
                  fontSize: '20px',
                  color: '#5B5B5B',
                  fontWeight: 'normal',
                  marginBottom: '10px',
                  marginTop: '0'
                }}
              >
                {service.title}
              </h3>

              {/* Descripción */}
              <p
                style={{
                  fontFamily: 'Poppins-Regular, sans-serif',
                  fontSize: '11px',
                  color: '#5B5B5B',
                  fontWeight: 'normal',
                  lineHeight: '1.4',
                  margin: '0'
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
          </div>
        </div>

        {/* Botón */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            style={{
              backgroundColor: '#353535',
              color: '#FFFFFF',
              fontFamily: 'Poppins-Regular, sans-serif',
              fontSize: '30px',
              fontWeight: 'normal',
              padding: '20px 50px',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'background-color 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#505050')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#353535')}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
