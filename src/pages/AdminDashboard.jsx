import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminSidebar from '@/components/admin/AdminSidebar';
import HeroSectionEditor from '@/components/admin/HeroSectionEditor';
import AboutSectionEditor from '@/components/admin/AboutSectionEditor';
import BooksSectionEditor from '@/components/admin/BooksSectionEditor';
import GallerySectionEditor from '@/components/admin/GallerySectionEditor';
import EventsSectionEditor from '@/components/admin/EventsSectionEditor';
import ServicesSectionEditor from '@/components/admin/ServicesSectionEditor';
import BlogSectionEditor from '@/components/admin/BlogSectionEditor';
import MessagesSectionEditor from '@/components/admin/MessagesSectionEditor';
import { LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    navigate('/admin');
  };

  const getSectionTitle = () => {
    switch(activeSection) {
      case 'hero':
        return '✏️ Editor de Sección Principal';
      case 'about':
        return '✏️ Editor de Sobre mí';
      case 'books':
        return '📚 Editor de Mis Libros';
      case 'gallery':
        return '🖼️ Editor de Galería';
      case 'events':
        return '📅 Gestor de Eventos';
      case 'services':
        return '💼 Gestor de Servicios';
      case 'blog':
        return '📝 Gestor de Blog';
      case 'messages':
        return '💬 Mensajes de Contacto';
      case 'settings':
        return '⚙️ Configuración';
      default:
        return 'Panel de Administración';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar 
        activeSection={activeSection} 
        onSelectSection={setActiveSection}
        onLogout={handleLogout}
        onGoHome={() => navigate('/')}
      />

      {/* Main Content */}
      <motion.div 
        className="flex-1 flex flex-col overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {getSectionTitle()}
            </h1>
            <p className="text-sm text-gray-500 mt-1">Administra el contenido de tu landing page</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            {activeSection === 'hero' && (
              <div>
                <HeroSectionEditor />
              </div>
            )}

            {activeSection === 'about' && (
              <div>
                <AboutSectionEditor />
              </div>
            )}

            {activeSection === 'books' && (
              <div>
                <BooksSectionEditor />
              </div>
            )}

            {activeSection === 'gallery' && (
              <div>
                <GallerySectionEditor />
              </div>
            )}

            {activeSection === 'events' && (
              <div>
                <EventsSectionEditor />
              </div>
            )}

            {activeSection === 'services' && (
              <div>
                <ServicesSectionEditor />
              </div>
            )}

            {activeSection === 'blog' && (
              <div>
                <BlogSectionEditor />
              </div>
            )}

            {activeSection === 'messages' && (
              <div>
                <MessagesSectionEditor />
              </div>
            )}

            {activeSection === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Configuración General</h2>
                <p className="text-gray-600">
                  Más opciones de configuración próximamente...
                </p>
              </div>
            )}
          </motion.div>

          {/* Helpful Tip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-6xl mx-auto mt-12 bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <p>
              💾 <strong>Tip:</strong> Todos los cambios se guardan automáticamente en tu navegador. Los cambios se aplicarán inmediatamente en la landing.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
