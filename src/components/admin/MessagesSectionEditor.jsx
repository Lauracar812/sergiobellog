import React, { useState, useEffect } from 'react';
import { useContactMessages } from '@/hooks/useContactMessages';
import { motion } from 'framer-motion';
import { Mail, Trash2, Archive, Eye, Clock } from 'lucide-react';

const MessagesSectionEditor = () => {
  const {
    messages,
    isLoading,
    error,
    fetchMessages,
    updateMessageStatus,
    archiveMessage,
    deleteMessage,
    markAsRead,
  } = useContactMessages();

  const [filterStatus, setFilterStatus] = useState('new');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar mensajes al montar el componente
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Filtrar mensajes
  const filteredMessages = messages.filter((msg) => {
    const matchesStatus = !filterStatus || msg.status === filterStatus;
    const matchesSearch =
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Contar mensajes por estado
  const counts = {
    new: messages.filter((m) => m.status === 'new').length,
    read: messages.filter((m) => m.status === 'read').length,
    archived: messages.filter((m) => m.status === 'archived').length,
    total: messages.length,
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      new: 'Nuevo',
      read: 'Leído',
      archived: 'Archivado',
    };
    return labels[status] || status;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ECBE8F]"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Título */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Mensajes de Contacto</h2>
        <p className="text-gray-600 mt-2">Gestiona y responde a los mensajes de tus visitantes</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', count: counts.total, color: 'bg-gray-100' },
          { label: 'Nuevos', count: counts.new, color: 'bg-blue-100' },
          { label: 'Leídos', count: counts.read, color: 'bg-gray-100' },
          { label: 'Archivados', count: counts.archived, color: 'bg-yellow-100' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-lg p-4`}>
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-800">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ECBE8F]"
        />

        {/* Filtro de estado */}
        <div className="flex gap-2">
          {['new', 'read', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(filterStatus === status ? '' : status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === status
                  ? 'bg-[#ECBE8F] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {getStatusLabel(status)}
            </button>
          ))}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-800">Error: {error}</p>
        </div>
      )}

      {/* Lista de mensajes o seleccionado */}
      {selectedMessage ? (
        // Vista de detalle del mensaje
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <button
            onClick={() => setSelectedMessage(null)}
            className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← Volver a lista
          </button>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-2xl font-bold text-gray-800">{selectedMessage.name}</h3>
              <p className="text-gray-600 flex items-center gap-2 mt-2">
                <Mail size={16} />
                {selectedMessage.email}
              </p>
              {selectedMessage.phone && (
                <p className="text-gray-600 mt-1">📞 {selectedMessage.phone}</p>
              )}
              <p className="text-gray-500 text-sm flex items-center gap-2 mt-2">
                <Clock size={14} />
                {formatDate(selectedMessage.created_at)}
              </p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedMessage.status)}`}>
                {getStatusLabel(selectedMessage.status)}
              </span>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Mensaje:</h4>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-wrap gap-2 pt-4 border-t">
              {selectedMessage.status === 'new' && (
                <button
                  onClick={() => {
                    markAsRead(selectedMessage.id);
                    setSelectedMessage({ ...selectedMessage, status: 'read' });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  <Eye size={16} />
                  Marcar como leído
                </button>
              )}

              {selectedMessage.status !== 'archived' && (
                <button
                  onClick={() => {
                    archiveMessage(selectedMessage.id);
                    setSelectedMessage(null);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  <Archive size={16} />
                  Archivar
                </button>
              )}

              <button
                onClick={() => {
                  deleteMessage(selectedMessage.id);
                  setSelectedMessage(null);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <Trash2 size={16} />
                Eliminar
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        // Lista de mensajes
        <div className="space-y-2">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Mail size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">No hay mensajes disponibles</p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ x: 4 }}
                onClick={() => {
                  if (msg.status === 'new') {
                    markAsRead(msg.id);
                  }
                  setSelectedMessage(msg);
                }}
                className={`p-4 rounded-lg border-l-4 cursor-pointer transition ${
                  msg.status === 'new'
                    ? 'border-blue-500 bg-blue-50 hover:bg-blue-100'
                    : 'border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800">{msg.name}</h4>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          msg.status
                        )}`}
                      >
                        {getStatusLabel(msg.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{msg.email}</p>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                      {msg.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatDate(msg.created_at)}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        archiveMessage(msg.id);
                      }}
                      className="p-2 text-yellow-600 hover:bg-yellow-100 rounded transition"
                      title="Archivar"
                    >
                      <Archive size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(msg.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-100 rounded transition"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
};

export default MessagesSectionEditor;
