import React, { useState } from 'react';
import { useAdminContent } from '@/hooks/useAdminContent';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Función para obtener fecha local en formato YYYY-MM-DD sin problemas de zona horaria
const getLocalDateString = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

// Función para parsear fecha sin problemas de zona horaria
const parseDateString = (dateString) => {
  if (!dateString) return new Date();
  const [year, month, day] = dateString.split('-');
  return new Date(year, month - 1, day);
};

export default function EventsSectionEditor() {
  const { content, updateSection } = useAdminContent();
  const { events = [] } = content.eventsSection || { events: [] };
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
  });

  const handleAddClick = () => {
    setIsAddingEvent(true);
    setFormData({
      eventName: '',
      eventDescription: '',
      eventDate: '',
      eventTime: '',
      eventLocation: '',
    });
    setEditingId(null);
  };

  const handleEditClick = (index) => {
    setFormData(events[index]);
    setEditingId(index);
    setIsAddingEvent(true);
  };

  const handleCancel = () => {
    setIsAddingEvent(false);
    setEditingId(null);
    setFormData({
      eventName: '',
      eventDescription: '',
      eventDate: '',
      eventTime: '',
      eventLocation: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEvent = () => {
    // Validar campos
    if (!formData.eventName.trim()) {
      toast({ title: '⚠️ Error', description: 'El nombre del evento es requerido' });
      return;
    }
    if (!formData.eventDescription.trim()) {
      toast({ title: '⚠️ Error', description: 'La descripción del evento es requerida' });
      return;
    }
    if (!formData.eventDate.trim()) {
      toast({ title: '⚠️ Error', description: 'La fecha del evento es requerida' });
      return;
    }
    if (!formData.eventTime.trim()) {
      toast({ title: '⚠️ Error', description: 'La hora del evento es requerida' });
      return;
    }
    if (!formData.eventLocation.trim()) {
      toast({ title: '⚠️ Error', description: 'El lugar del evento es requerido' });
      return;
    }

    let updatedEvents;
    if (editingId !== null) {
      // Editar evento existente
      updatedEvents = [...events];
      updatedEvents[editingId] = formData;
      toast({ title: '✅ Éxito', description: 'Evento actualizado correctamente' });
    } else {
      // Agregar nuevo evento
      updatedEvents = [...events, formData];
      toast({ title: '✅ Éxito', description: 'Evento agregado correctamente' });
    }

    updateSection('eventsSection', { events: updatedEvents });
    handleCancel();
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    updateSection('eventsSection', { events: updatedEvents });
    toast({ title: '✅ Eliminado', description: 'Evento eliminado correctamente' });
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Eventos</h2>
          <p className="text-sm text-gray-600 mt-1">
            {events.length} evento{events.length !== 1 ? 's' : ''} agregado{events.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Agregar Evento
        </button>
      </div>

      {/* Formulario de evento */}
      {isAddingEvent && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-blue-200 rounded-lg p-6 space-y-4 shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {editingId !== null ? 'Editar Evento' : 'Nuevo Evento'}
            </h3>
            <button
              onClick={handleCancel}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Evento *
            </label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              placeholder="Ej: Conferencia de Desarrollo Web"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción del Evento *
            </label>
            <textarea
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleInputChange}
              placeholder="Describe tu evento aquí..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-900 bg-white placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha del Evento *
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hora del Evento *
              </label>
              <input
                type="time"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lugar del Evento *
              </label>
              <input
                type="text"
                name="eventLocation"
                value={formData.eventLocation}
                onChange={handleInputChange}
                placeholder="Ej: Sala de Conferencias A"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder-gray-500"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveEvent}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingId !== null ? 'Actualizar' : 'Guardar'} Evento
            </button>
          </div>
        </motion.div>
      )}

      {/* Lista de eventos */}
      {events.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-600">No hay eventos agregados aún.</p>
          <p className="text-sm text-gray-500 mt-1">
            Haz clic en "Agregar Evento" para crear tu primer evento.
          </p>
        </div>
      ) : (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow group"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-lg">
                    {event.eventName}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {event.eventDescription}
                  </p>
                  <div className="flex gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1 text-gray-700">
                      <span className="font-semibold text-blue-600">📅</span>
                      {new Date(event.eventDate).toLocaleDateString('es-ES', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center gap-1 text-gray-700">
                      <span className="font-semibold text-blue-600">⏰</span>
                      {event.eventTime}
                    </span>
                    <span className="flex items-center gap-1 text-gray-700">
                      <span className="font-semibold text-purple-600">📍</span>
                      {event.eventLocation}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditClick(index)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    title="Editar evento"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(index)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    title="Eliminar evento"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Información adicional */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
        <h4 className="font-semibold text-blue-900 mb-2">💾 Información importante:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ Los eventos se guardan automáticamente en localStorage</li>
          <li>✓ Puedes editar o eliminar eventos existentes</li>
          <li>✓ Los cambios aparecen inmediatamente en la landing page</li>
          <li>✓ Los datos persisten entre sesiones</li>
        </ul>
      </div>
    </div>
  );
}
