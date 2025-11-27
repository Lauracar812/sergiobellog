import React from 'react';
import { useAdminContent } from '@/hooks/useAdminContent';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function EventsSection() {
  const { content } = useAdminContent();
  const { events } = content.eventsSection || { events: [] };

  if (!events || events.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="w-full py-16 bg-white" id="eventos">
      {/* Contenedor principal con max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            EVENTOS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        {/* Grid de eventos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {events.map((event, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300"
            >
              {/* Encabezado con gradiente */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white truncate">
                  {event.eventName}
                </h3>
              </div>

              {/* Contenido */}
              <div className="p-6 space-y-4">
                {/* Descripción */}
                <div>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {event.eventDescription}
                  </p>
                </div>

                {/* Información de evento */}
                <div className="space-y-3 pt-4 border-t border-gray-300">
                  {/* Hora */}
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Hora
                      </p>
                      <p className="text-gray-900 font-medium">
                        {event.eventTime}
                      </p>
                    </div>
                  </div>

                  {/* Lugar */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Lugar
                      </p>
                      <p className="text-gray-900 font-medium">
                        {event.eventLocation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botón CTA */}
                <div className="pt-2">
                  <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                    Más información
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
