import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', null
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setMessage('');

    if (!email.trim()) {
      setStatus('error');
      setMessage('Por favor ingresa tu correo electrónico');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Por favor ingresa un correo electrónico válido');
      return;
    }

    setLoading(true);

    try {
      // Guardar en localStorage para el admin
      const existingSubscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]');
      
      // Verificar si ya existe
      if (existingSubscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase())) {
        setStatus('error');
        setMessage('Este correo ya está suscrito');
        setLoading(false);
        return;
      }

      const newSubscriber = {
        id: Date.now(),
        email: email.trim().toLowerCase(),
        subscribedAt: new Date().toISOString(),
        status: 'active'
      };

      existingSubscribers.push(newSubscriber);
      localStorage.setItem('newsletter-subscribers', JSON.stringify(existingSubscribers));

      setStatus('success');
      setMessage('¡Gracias por suscribirte! Pronto recibirás noticias.');
      setEmail('');

      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        setStatus(null);
        setMessage('');
      }, 5000);

    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setMessage('Hubo un error al suscribirte. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      className="py-16"
      style={{ 
        background: 'linear-gradient(135deg, #332C26 0%, #4a423a 100%)'
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Icono */}
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
            style={{ backgroundColor: 'rgba(236, 190, 143, 0.2)' }}
          >
            <Mail size={32} style={{ color: '#ECBE8F' }} />
          </div>

          {/* Título */}
          <h2 
            style={{ 
              fontSize: '30px',
              fontFamily: 'Poppins-Regular, sans-serif',
              color: '#FFFFFF',
              fontWeight: 'normal',
              marginBottom: '12px'
            }}
          >
            Suscríbete al Newsletter
          </h2>

          {/* Descripción */}
          <p 
            style={{ 
              fontSize: '16px',
              fontFamily: 'Poppins-Regular, sans-serif',
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '500px',
              margin: '0 auto 30px'
            }}
          >
            Recibe contenido exclusivo, novedades sobre mis libros y consejos de desarrollo personal directamente en tu correo.
          </p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg text-black bg-white border-2 border-transparent focus:outline-none focus:border-[#ECBE8F] transition-all"
                  style={{ fontSize: '16px' }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: '#ECBE8F',
                  color: '#332C26',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = '#D4A574';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ECBE8F';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    <span>Suscribirse</span>
                  </>
                )}
              </button>
            </div>

            {/* Mensajes de estado */}
            {status && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-lg flex items-center justify-center gap-2 ${
                  status === 'success' 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-red-500/20 text-red-300'
                }`}
              >
                {status === 'success' ? (
                  <CheckCircle size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}
                <span style={{ fontSize: '14px' }}>{message}</span>
              </motion.div>
            )}
          </form>

          {/* Texto de privacidad */}
          <p 
            style={{ 
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.5)',
              marginTop: '20px'
            }}
          >
            Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
