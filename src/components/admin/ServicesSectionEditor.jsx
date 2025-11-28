import React, { useState } from 'react';
import { useAdminContent } from '@/hooks/useAdminContent';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Plus, Edit2 } from 'lucide-react';

const ServicesSectionEditor = () => {
  const { content, updateSection, uploadImage } = useAdminContent();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: null
  });

  const servicesSection = content.servicesSection || {
    title: 'Servicios',
    buttonText: 'Hablemos',
    services: []
  };

  // Manejar cambios en el título de la sección
  const handleSectionTitleChange = async (e) => {
    const newTitle = e.target.value;
    await updateSection('servicesSection', {
      ...servicesSection,
      title: newTitle
    });
  };

  // Manejar cambios en el texto del botón
  const handleButtonTextChange = async (e) => {
    const newButtonText = e.target.value;
    await updateSection('servicesSection', {
      ...servicesSection,
      buttonText: newButtonText
    });
  };

  // Iniciar edición de servicio
  const startEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon
    });
  };

  // Cancelar edición
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', icon: null });
  };

  // Guardar cambios del servicio
  const saveService = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: 'Error',
        description: 'El título y descripción son requeridos',
        variant: 'destructive'
      });
      return;
    }

    const updatedServices = servicesSection.services.map((s) =>
      s.id === editingId ? { ...s, ...formData } : s
    );

    await updateSection('servicesSection', {
      ...servicesSection,
      services: updatedServices
    });

    toast({
      title: 'Éxito',
      description: 'Servicio actualizado correctamente'
    });

    cancelEdit();
  };

  // Eliminar servicio
  const deleteService = async (id) => {
    const updatedServices = servicesSection.services.filter((s) => s.id !== id);

    await updateSection('servicesSection', {
      ...servicesSection,
      services: updatedServices
    });

    toast({
      title: 'Eliminado',
      description: 'Servicio eliminado correctamente'
    });
  };

  // Agregar nuevo servicio
  const addNewService = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: 'Error',
        description: 'El título y descripción son requeridos',
        variant: 'destructive'
      });
      return;
    }

    const newService = {
      id: Math.max(0, ...servicesSection.services.map((s) => s.id)) + 1,
      ...formData
    };

    await updateSection('servicesSection', {
      ...servicesSection,
      services: [...servicesSection.services, newService]
    });

    toast({
      title: 'Éxito',
      description: 'Nuevo servicio agregado'
    });

    cancelEdit();
  };

  // Manejar upload de icono
  const handleIconUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const result = await uploadImage(file);
        if (result.success) {
          setFormData({ ...formData, icon: result.url });
          toast({
            title: 'Éxito',
            description: 'Icono cargado correctamente'
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive'
        });
      }
    }
  };

  const getDefaultIcon = (serviceTitle) => {
    const iconMap = {
      'Escritor': '✍️',
      'Coach de Vida': '🎯',
      'Asesor Personal y Empresarial': '💼',
      'Conferencista': '🎤',
      'Director de Arimes': '🏆'
    };
    return iconMap[serviceTitle] || '⭐';
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Editar Título de la Sección */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0, color: '#332C26', fontSize: '18px' }}>Título de la Sección</h3>
        <input
          type="text"
          value={servicesSection.title}
          onChange={handleSectionTitleChange}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            color: '#332C26',
            backgroundColor: '#fff',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Editar Texto del Botón */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0, color: '#332C26', fontSize: '18px' }}>Texto del Botón</h3>
        <input
          type="text"
          value={servicesSection.buttonText}
          onChange={handleButtonTextChange}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            color: '#332C26',
            backgroundColor: '#fff',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Formulario para agregar/editar servicio */}
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px',
          border: '1px solid #ddd'
        }}
      >
        <h3 style={{ marginTop: 0, color: '#332C26', fontSize: '18px' }}>
          {editingId ? 'Editar Servicio' : 'Nuevo Servicio'}
        </h3>

        {/* Título del Servicio */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#332C26', fontWeight: '500' }}>
            Título del Servicio
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ej: Escritor"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              color: '#332C26',
              backgroundColor: '#fff',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Descripción del Servicio */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#332C26', fontWeight: '500' }}>
            Descripción
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Ej: Contenido inspirador y transformador"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              color: '#332C26',
              backgroundColor: '#fff',
              boxSizing: 'border-box',
              minHeight: '60px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Ícono del Servicio */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#332C26', fontWeight: '500' }}>
            Icono (Imagen)
          </label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleIconUpload}
              style={{ flex: 1 }}
            />
            {formData.icon && (
              <img
                src={formData.icon}
                alt="preview"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '4px',
                  objectFit: 'cover'
                }}
              />
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {editingId ? (
            <>
              <button
                onClick={saveService}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Guardar Cambios
              </button>
              <button
                onClick={cancelEdit}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#757575',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={addNewService}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px'
              }}
            >
              <Plus size={16} /> Agregar Servicio
            </button>
          )}
        </div>
      </div>

      {/* Lista de Servicios */}
      <div>
        <h3 style={{ marginTop: 0, color: '#332C26', fontSize: '18px' }}>Servicios ({servicesSection.services.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {servicesSection.services.map((service) => (
            <div
              key={service.id}
              style={{
                backgroundColor: '#fff',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    border: '1px solid #ddd'
                  }}
                >
                  {service.icon ? (
                    <img
                      src={service.icon}
                      alt="icon"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    getDefaultIcon(service.title)
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 5px 0', fontWeight: '600', color: '#332C26' }}>
                    {service.title}
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                    {service.description}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => startEdit(service)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#FFC107',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '12px'
                  }}
                >
                  <Edit2 size={14} /> Editar
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '12px'
                  }}
                >
                  <Trash2 size={14} /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSectionEditor;
