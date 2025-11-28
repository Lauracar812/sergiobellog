import React from 'react';
import { motion } from 'framer-motion';
import { Home, LogOut, Settings, Image, Users, BookOpen, ImageIcon, Calendar, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminSidebar = ({ 
  activeSection, 
  onSelectSection, 
  onLogout, 
  onGoHome 
}) => {
  const sections = [
    { id: 'hero', label: 'Sección Principal', icon: Image },
    { id: 'about', label: 'Sobre mí', icon: Users },
    { id: 'books', label: 'Mis Libros', icon: BookOpen },
    { id: 'gallery', label: 'Galería', icon: ImageIcon },
    { id: 'events', label: 'Eventos', icon: Calendar },
    { id: 'services', label: 'Servicios', icon: Briefcase },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] border-r border-white/10 h-screen flex flex-col shadow-2xl"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2">Panel Admin</h2>
        <p className="text-white/60 text-sm">Gestiona tu contenido</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <motion.button
              key={section.id}
              onClick={() => onSelectSection(section.id)}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-[#ECBE8F] to-[#BE9556] text-black font-semibold shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} />
              <span>{section.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Button
          onClick={onGoHome}
          className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white"
        >
          <Home size={18} />
          <span>Ir al Inicio</span>
        </Button>
        
        <Button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300"
        >
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
