import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminContent } from '@/hooks/useAdminContent';
import { Loader2, Plus, Trash2, AlertCircle, Link, Image } from 'lucide-react';

// Iconos de redes sociales predefinidos
const SOCIAL_ICONS = [
  { id: 'facebook', name: 'Facebook', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' },
  { id: 'instagram', name: 'Instagram', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>' },
  { id: 'twitter', name: 'X (Twitter)', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' },
  { id: 'linkedin', name: 'LinkedIn', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' },
  { id: 'youtube', name: 'YouTube', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' },
  { id: 'tiktok', name: 'TikTok', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>' },
  { id: 'whatsapp', name: 'WhatsApp', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' },
  { id: 'telegram', name: 'Telegram', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>' },
  { id: 'pinterest', name: 'Pinterest', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>' },
  { id: 'spotify', name: 'Spotify', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>' },
  { id: 'amazon', name: 'Amazon', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.574 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.046-.125zm6.565-6.163c0-1.167.287-2.12.855-2.861.57-.742 1.32-1.27 2.25-1.585a9.91 9.91 0 013.47-.37c.476.025.973.076 1.49.154v-.612c0-.778-.09-1.324-.27-1.637-.29-.5-.835-.752-1.64-.752h-.18c-.49.024-.9.181-1.23.474-.33.292-.533.683-.61 1.17-.04.215-.15.34-.33.374l-1.89-.24c-.21-.046-.315-.153-.315-.323 0-.047.01-.103.03-.166.36-1.757 1.81-2.636 4.32-2.636h.39c1.35.048 2.37.404 3.07 1.066.14.13.27.277.39.442.12.166.21.323.27.472.06.15.12.353.18.612.06.26.09.468.09.626.01.158.01.39.01.692v6.35c0 .453.07.838.21 1.155.14.318.27.548.39.692.12.144.27.32.45.53.09.11.135.22.135.33 0 .136-.06.243-.18.32l-1.26 1.08c-.15.086-.315.076-.495-.03a6.549 6.549 0 01-.54-.498 5.829 5.829 0 01-.405-.477c-.12-.167-.24-.369-.375-.608-.705.853-1.59 1.28-2.655 1.28-1.005 0-1.83-.308-2.475-.924-.645-.617-.975-1.462-.975-2.535 0-1.167.39-2.07 1.17-2.712.78-.64 1.8-.963 3.06-.963.48 0 .99.047 1.53.14v-.73c0-.676-.075-1.16-.225-1.453-.15-.294-.435-.44-.87-.44-.33 0-.615.093-.855.28-.24.187-.39.503-.45.95-.03.136-.12.227-.27.27l-1.8-.24c-.18-.054-.27-.15-.27-.29 0-.038.01-.08.03-.13.12-.683.42-1.245.9-1.688.48-.443 1.14-.725 1.98-.846.33-.04.69-.06 1.08-.06 1.38 0 2.385.328 3.015.985.03.036.06.08.09.133.06.106.09.175.09.21.34.467.51 1.21.51 2.23v4.09c0 .36.06.65.18.87.12.22.21.38.27.48.06.1.15.22.27.36.09.1.135.2.135.3 0 .1-.06.19-.18.27l-1.26 1.02c-.12.1-.27.1-.45-.01-.12-.08-.255-.2-.405-.37-.15-.17-.285-.346-.405-.527a5.174 5.174 0 01-.33-.54 6.161 6.161 0 01-.09-.17c-.69.78-1.545 1.17-2.565 1.17-.9 0-1.635-.28-2.205-.84-.57-.56-.855-1.33-.855-2.31zm3.96.11c0 .463.105.834.315 1.114.21.28.495.42.855.42.09 0 .21-.023.36-.07.15-.046.27-.092.36-.137.3-.15.555-.374.765-.67v-1.74c-.33-.046-.645-.07-.945-.07-.57 0-1.035.154-1.395.46-.36.31-.315.693-.315 1.693z"/></svg>' },
  { id: 'email', name: 'Email', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>' },
];

export default function SocialMediaEditor() {
  const { content, saveContent } = useAdminContent();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    if (content?.socialMedia) {
      setFormData(content.socialMedia);
    } else {
      setFormData({
        networks: [],
      });
    }
    setLoading(false);
  }, [content]);

  const handleAddNetwork = () => {
    const newNetwork = {
      id: Date.now(),
      name: 'Nueva Red Social',
      icon: SOCIAL_ICONS[0].svg,
      iconId: SOCIAL_ICONS[0].id,
      link: '',
    };

    setFormData(prev => ({
      ...prev,
      networks: [...prev.networks, newNetwork],
    }));
  };

  const handleRemoveNetwork = (networkId) => {
    setFormData(prev => ({
      ...prev,
      networks: prev.networks.filter(n => n.id !== networkId),
    }));
  };

  const handleUpdateNetwork = (networkId, field, value) => {
    setFormData(prev => ({
      ...prev,
      networks: prev.networks.map(n => 
        n.id === networkId ? { ...n, [field]: value } : n
      ),
    }));
  };

  const handleSelectIcon = (networkId, iconData) => {
    setFormData(prev => ({
      ...prev,
      networks: prev.networks.map(n => 
        n.id === networkId ? { ...n, icon: iconData.svg, iconId: iconData.id, name: iconData.name } : n
      ),
    }));
    setShowIconPicker(null);
  };

  const handleSave = async () => {
    try {
      setError(null);
      console.log('💾 Guardando redes sociales...');

      const newContent = {
        ...content,
        socialMedia: formData,
      };

      await saveContent(newContent);
      alert('✅ Redes sociales guardadas correctamente');
    } catch (err) {
      console.error('❌ Error saving:', err);
      setError('Error al guardar: ' + err.message);
    }
  };

  const handleReset = () => {
    if (content?.socialMedia) {
      setFormData(content.socialMedia);
      setError(null);
      alert('Cambios descartados');
    }
  };

  if (loading || !formData) {
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

        {/* Título */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Redes Sociales</h3>
          <p className="text-gray-600 text-sm">Configura los enlaces a tus redes sociales. Se mostrarán en el footer del sitio.</p>
        </div>

        {/* Lista de redes sociales */}
        <div className="space-y-4 mb-8">
          {formData.networks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No hay redes sociales configuradas</p>
              <p className="text-sm">Haz clic en "Agregar Red Social" para comenzar</p>
            </div>
          ) : (
            formData.networks.map((network) => (
              <div key={network.id} className="relative border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-4">
                  {/* Icono seleccionado */}
                  <div className="relative">
                    <button
                      onClick={() => setShowIconPicker(showIconPicker === network.id ? null : network.id)}
                      className="w-12 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors border border-gray-300"
                      title="Cambiar icono"
                    >
                      <div 
                        className="w-6 h-6 text-gray-700"
                        dangerouslySetInnerHTML={{ __html: network.icon }}
                      />
                    </button>
                    
                    {/* Selector de iconos */}
                    {showIconPicker === network.id && (
                      <div className="absolute top-14 left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-80">
                        <p className="text-sm font-semibold text-gray-700 mb-3">Selecciona un icono:</p>
                        <div className="grid grid-cols-5 gap-2">
                          {SOCIAL_ICONS.map((icon) => (
                            <button
                              key={icon.id}
                              onClick={() => handleSelectIcon(network.id, icon)}
                              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                                network.iconId === icon.id
                                  ? 'bg-blue-100 border-2 border-blue-500'
                                  : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
                              }`}
                              title={icon.name}
                            >
                              <div 
                                className="w-5 h-5 text-gray-700"
                                dangerouslySetInnerHTML={{ __html: icon.svg }}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Campos editables */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Nombre</label>
                      <input
                        type="text"
                        value={network.name}
                        onChange={(e) => handleUpdateNetwork(network.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black bg-white"
                        placeholder="Ej: Facebook"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Enlace</label>
                      <input
                        type="url"
                        value={network.link}
                        onChange={(e) => handleUpdateNetwork(network.id, 'link', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black bg-white"
                        placeholder="https://facebook.com/tu-perfil"
                      />
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => handleRemoveNetwork(network.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Botón agregar */}
        <button
          onClick={handleAddNetwork}
          className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
        >
          <Plus size={18} />
          <span>Agregar Red Social</span>
        </button>

        {/* Botones de acción */}
        <div className="flex gap-4 pt-6 mt-8 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            💾 Guardar Cambios
          </button>
          <button
            onClick={handleReset}
            className="flex-1 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
          >
            🔄 Descartar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
