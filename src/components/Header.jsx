
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: "Sobre mí", id: "about" },
    { label: "Mis libros", id: "books" },
    { label: "Galería", id: "gallery" },
    { label: "Eventos", id: "events" },
    { label: "Servicios", id: "services" },
    { label: "Blog", id: "blog" }
  ];

  const handleNavClick = (item) => {
    const element = document.getElementById(item.id);
    if (element) {
      // Cerrar menú móvil si está abierto
      setIsMobileMenuOpen(false);
      
      // Scroll suave a la sección
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
      style={{
        background: isScrolled 
          ? '#353535' 
          : 'linear-gradient(to right, rgba(236, 190, 143, 0.30), rgba(190, 149, 86, 0.30))'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div 
            onClick={handleLogoClick}
            className="flex-shrink-0 flex items-center cursor-pointer"
            style={{
              width: '68px',
              height: '32px',
              background: "transparent url('/img/Grupo 3.png') 0% 0% no-repeat padding-box",
              opacity: 1
            }}
            alt="Sergio Bello Logo"
            title="Ir al inicio"
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="text-[#FFFFFF] hover:text-white/80 px-3 py-2 text-[16.1px] font-medium transition-colors duration-200 text-left"
                style={{ fontFamily: 'Agan65, sans-serif' }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white/20"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#BE9556] border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="text-white hover:bg-white/20 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  style={{ fontFamily: 'Agan65, sans-serif' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
