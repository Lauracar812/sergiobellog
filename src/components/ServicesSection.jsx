import React from 'react';
import { useAdminContent } from '@/hooks/useAdminContent';
import { useContactModal } from '@/context/ContactModalContext';

const ServicesSection = () => {
  const { content } = useAdminContent();
  const { setIsOpen } = useContactModal();
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
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
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
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '40px',
            width: 'fit-content',
            margin: '0 auto 50px auto'
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
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  fontSize: '25px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  flexShrink: 0,
                  overflow: 'hidden',
                  padding: '10px'
                }}
                className="responsive-icon"
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

      {/* Responsive styles para servicios */}
      <style>{`
        @media (max-width: 768px) {
          [style*="gridTemplateColumns: repeat(5"] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        
        @media (max-width: 768px) {
          .responsive-icon {
            width: 70px !important;
            height: 70px !important;
            font-size: 18px !important;
            margin-bottom: 15px !important;
          }
        }
      `}</style>

      {/* Botón */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
      </div>
    </div>
  </section>
  );
};

export default ServicesSection;
