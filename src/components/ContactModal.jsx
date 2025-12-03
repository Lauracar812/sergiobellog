import React, { useState } from 'react';
import { X, Mail, Phone, User, MessageSquare, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('El nombre es requerido');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('El email es requerido');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('El email no es válido');
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMessage('El mensaje es requerido');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setStatus(null);

    if (!validateForm()) {
      setStatus('error');
      return;
    }

    setLoading(true);

    try {
      // Llamar a la API del backend
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/contact-messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).catch((error) => {
        // Si hay error de conexión (backend no iniciado), mostrar mensaje
        console.warn('No se pudo conectar con el servidor:', error);
        throw new Error('El servidor de backend no está disponible. Por favor, intenta más tarde.');
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0] || errorData.error || 'Error al enviar el mensaje');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        onClose();
        setStatus(null);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message || 'Error al enviar el mensaje');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
              padding: '16px'
            }}
            className="pointer-events-none"
          >
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-md pointer-events-auto max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#ECBE8F] to-[#D4A574] px-6 py-6 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition"
                >
                  <X size={20} />
                </button>
                <h2 className="text-2xl font-bold text-white mb-2">¡Hablemos!</h2>
                <p className="text-white/90 text-sm">Cuéntame cómo puedo ayudarte</p>
              </div>

              {/* Success Message */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border-l-4 border-green-500 p-4 flex items-start gap-3"
                >
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-green-800 font-semibold">¡Mensaje enviado!</p>
                    <p className="text-green-700 text-sm">Te contactaremos pronto</p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {status === 'error' && errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start gap-3"
                >
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-red-800 font-semibold">Error</p>
                    <p className="text-red-700 text-sm">{errorMessage}</p>
                  </div>
                </motion.div>
              )}

              {/* Form */}
              {status !== 'success' && (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-[#ECBE8F]" />
                        <span>Nombre</span>
                      </div>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ECBE8F] transition"
                      disabled={loading}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-[#ECBE8F]" />
                        <span>Email</span>
                      </div>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ECBE8F] transition"
                      disabled={loading}
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-[#ECBE8F]" />
                        <span>Teléfono (opcional)</span>
                      </div>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Tu número de teléfono"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ECBE8F] transition"
                      disabled={loading}
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={16} className="text-[#ECBE8F]" />
                        <span>Mensaje</span>
                      </div>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Mándame tu mensaje/consulta"
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ECBE8F] transition resize-none text-black"
                      disabled={loading}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#ECBE8F] to-[#D4A574] text-white font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="inline-block"
                        >
                          ⏳
                        </motion.div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Enviar Mensaje</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
