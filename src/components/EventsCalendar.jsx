import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';

export default function EventsCalendar({ events = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Obtener fecha actual en formato YYYY-MM-DD sin conversión de zona horaria
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const [selectedDate, setSelectedDate] = useState(getTodayString());

  // Obtener eventos del día seleccionado
  const eventsForSelectedDay = useMemo(() => {
    return events.filter(event => event.eventDate === selectedDate);
  }, [events, selectedDate]);

  // Obtener días con eventos del mes actual
  const daysWithEvents = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const eventDates = new Set();
    events.forEach(event => {
      const eventDate = new Date(event.eventDate);
      if (eventDate.getFullYear() === year && eventDate.getMonth() === month) {
        eventDates.add(eventDate.getDate());
      }
    });
    return eventDates;
  }, [events, currentDate]);

  // Obtener días del mes
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Obtener primer día de la semana
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];
  
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleSelectDate = (day) => {
    if (day) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      setSelectedDate(`${year}-${month}-${dayStr}`);
    }
  };

  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const isSelected = (day) => {
    if (!day) return false;
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${year}-${month}-${dayStr}`;
    return dateStr === selectedDate;
  };

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <section className="w-full py-16 bg-white" id="eventos">
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

        {/* Contenedor principal - Calendario + Eventos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LADO IZQUIERDO - CALENDARIO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Encabezado del calendario */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <div className="flex justify-between items-center">
                  <button
                    onClick={handlePrevMonth}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={20} className="text-white" />
                  </button>
                  <h3 className="text-white font-bold capitalize text-center flex-1">
                    {monthName}
                  </h3>
                  <button
                    onClick={handleNextMonth}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ChevronRight size={20} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Días de la semana */}
              <div className="grid grid-cols-7 gap-1 p-4 bg-white/50">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center font-bold text-gray-600 text-sm py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Días del mes */}
              <div className="grid grid-cols-7 gap-1 p-4">
                {days.map((day, index) => {
                  const hasEvent = day && daysWithEvents.has(day);
                  const selected = isSelected(day);
                  const today = isToday(day);

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleSelectDate(day)}
                      whileHover={day ? { scale: 1.05 } : {}}
                      className={`
                        aspect-square rounded-lg font-semibold text-sm transition-all
                        ${!day ? 'cursor-default' : 'cursor-pointer'}
                        ${selected
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : today
                          ? 'bg-blue-100 text-blue-900 border-2 border-blue-400'
                          : hasEvent
                          ? 'bg-blue-50 text-gray-900 border-2 border-blue-300 font-bold'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                        }
                      `}
                      disabled={!day}
                    >
                      {day && (
                        <div className="flex flex-col items-center justify-center h-full">
                          <span>{day}</span>
                          {hasEvent && (
                            <span className="text-xs mt-0.5">●</span>
                          )}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Leyenda */}
              <div className="border-t border-gray-200 p-4 bg-white text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-400"></div>
                  <span className="text-gray-700">Con eventos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  <span className="text-gray-700">Seleccionado</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* LADO DERECHO - EVENTOS DEL DÍA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="space-y-4">
              {/* Título del día seleccionado */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl px-6 py-4">
                <h3 className="text-white font-bold text-lg">
                  {new Intl.DateTimeFormat('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }).format(new Date(selectedDate + 'T00:00:00'))}
                </h3>
              </div>

              {/* Lista de eventos */}
              {eventsForSelectedDay.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center"
                >
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-semibold">No hay eventos para este día</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Selecciona otro día para ver sus eventos
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {eventsForSelectedDay.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white border-l-4 border-blue-600 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 group"
                    >
                      <h4 className="font-bold text-gray-900 text-lg mb-2">
                        {event.eventName}
                      </h4>
                      <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                        {event.eventDescription}
                      </p>

                      {/* Info de evento */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-gray-900 font-semibold">{event.eventTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <span className="text-gray-900 font-semibold">{event.eventLocation}</span>
                        </div>
                      </div>

                      {/* Botón CTA */}
                      <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                        Más información
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
