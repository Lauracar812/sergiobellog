import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Trash2, AlertCircle, Mail, Download, RefreshCw, Users } from 'lucide-react';

export default function NewsletterEditor() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar suscriptores
  const loadSubscribers = () => {
    setLoading(true);
    try {
      const saved = localStorage.getItem('newsletter-subscribers');
      const parsed = saved ? JSON.parse(saved) : [];
      setSubscribers(parsed);
    } catch (err) {
      console.error('Error cargando suscriptores:', err);
      setError('Error al cargar los suscriptores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscribers();
  }, []);

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este suscriptor?')) {
      const updated = subscribers.filter(sub => sub.id !== id);
      localStorage.setItem('newsletter-subscribers', JSON.stringify(updated));
      setSubscribers(updated);
    }
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      alert('No hay suscriptores para exportar');
      return;
    }

    const headers = ['Email', 'Fecha de suscripción', 'Estado'];
    const rows = subscribers.map(sub => [
      sub.email,
      new Date(sub.subscribedAt).toLocaleDateString('es-ES'),
      sub.status === 'active' ? 'Activo' : 'Inactivo'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `suscriptores_newsletter_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Mostrar errores */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          >
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Header con estadísticas */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Suscriptores del Newsletter</h3>
            <p className="text-gray-600 text-sm">Gestiona los correos suscritos a tu newsletter</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Estadística */}
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <Users size={20} className="text-blue-600" />
              <span className="text-blue-800 font-semibold">{subscribers.length}</span>
              <span className="text-blue-600 text-sm">suscriptores</span>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={loadSubscribers}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw size={18} />
            <span>Actualizar</span>
          </button>
          <button
            onClick={handleExportCSV}
            disabled={subscribers.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={18} />
            <span>Exportar CSV</span>
          </button>
        </div>

        {/* Lista de suscriptores */}
        {subscribers.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Mail size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">No hay suscriptores aún</p>
            <p className="text-sm">Los correos aparecerán aquí cuando los usuarios se suscriban</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Fecha de suscripción</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Estado</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-gray-800">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {formatDate(subscriber.subscribedAt)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        subscriber.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {subscriber.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(subscriber.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar suscriptor"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
