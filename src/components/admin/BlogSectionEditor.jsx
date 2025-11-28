import React, { useState, useEffect } from 'react';
import { useAdminContent } from '@/hooks/useAdminContent';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Plus, Edit2, ChevronDown, ChevronUp } from 'lucide-react';

export default function BlogSectionEditor() {
  const { content, saveContent } = useAdminContent();
  const { toast } = useToast();
  const [blogData, setBlogData] = useState(content?.blogSection || {
    title: 'Blog',
    buttonText: 'Hablemos',
    posts: []
  });
  const [editingPost, setEditingPost] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    featured: false,
    featuredImage: null
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (content?.blogSection) {
      setBlogData(content.blogSection);
    }
  }, [content]);

  // Guardar cambios en el título o botón con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (blogData && content?.blogSection && 
          (blogData.title !== content.blogSection.title || 
           blogData.buttonText !== content.blogSection.buttonText)) {
        saveContent({ ...content, blogSection: blogData });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [blogData.title, blogData.buttonText]);

  const handleAddPost = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      description: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      featured: false,
      featuredImage: null
    });
    setShowForm(true);
    setExpandedPost(null);
  };

  const handleEditPost = (post) => {
    setEditingPost(post.id);
    setFormData(post);
    setShowForm(true);
    setExpandedPost(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          featuredImage: event.target.result
        });
        toast({
          title: 'Éxito',
          description: 'Imagen cargada correctamente'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePost = async () => {
    if (!formData.title.trim()) {
      toast({
        title: 'Error',
        description: 'El título del post es requerido',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.description.trim()) {
      toast({
        title: 'Error',
        description: 'La descripción del post es requerida',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: 'Error',
        description: 'El contenido del post es requerido',
        variant: 'destructive'
      });
      return;
    }

    let updatedBlog;
    if (editingPost) {
      updatedBlog = {
        ...blogData,
        posts: blogData.posts.map(p => p.id === editingPost ? { ...formData, id: editingPost } : p)
      };
      toast({
        title: 'Éxito',
        description: 'Post actualizado correctamente'
      });
    } else {
      // Generar ID numérico único
      const newId = blogData.posts.length > 0 ? Math.max(...blogData.posts.map(p => p.id || 0)) + 1 : 1;
      const newPost = {
        ...formData,
        id: newId
      };
      updatedBlog = {
        ...blogData,
        posts: [newPost, ...blogData.posts]
      };
      toast({
        title: 'Éxito',
        description: 'Post creado correctamente'
      });
    }

    setBlogData(updatedBlog);
    await saveContent({ ...content, blogSection: updatedBlog });
    setShowForm(false);
    setEditingPost(null);
    setFormData({
      title: '',
      description: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      featured: false,
      featuredImage: null
    });
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este post?')) {
      const updatedBlog = {
        ...blogData,
        posts: blogData.posts.filter(p => p.id !== id)
      };
      setBlogData(updatedBlog);
      await saveContent({ ...content, blogSection: updatedBlog });
      toast({
        title: 'Éxito',
        description: 'Post eliminado correctamente'
      });
    }
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setEditingPost(null);
    setFormData({
      title: '',
      description: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      featured: false,
      featuredImage: null
    });
  };

  return (
    <div className="space-y-6">
      {/* Configuración de la sección */}
      <div className="grid grid-cols-2 gap-6">
        {/* Título de la sección */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Título de la sección
          </label>
          <input
            type="text"
            value={blogData.title}
            onChange={(e) => {
              const updated = { ...blogData, title: e.target.value };
              setBlogData(updated);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
          />
        </div>

        {/* Texto del botón */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Texto del botón
          </label>
          <input
            type="text"
            value={blogData.buttonText}
            onChange={(e) => {
              const updated = { ...blogData, buttonText: e.target.value };
              setBlogData(updated);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
          />
        </div>
      </div>

      {/* Botón para agregar nuevo post */}
      {!showForm && (
        <button
          onClick={handleAddPost}
          className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Crear Nuevo Post
        </button>
      )}

      {/* Formulario de creación/edición de post */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-amber-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            {editingPost ? '✏️ Editar Post' : '✍️ Nuevo Post'}
          </h3>

          <div className="space-y-4">
            {/* Título */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Título del Artículo *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ej: Historias de Transformación Personal"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">Este será el título visible en el blog</p>
            </div>

            {/* Descripción breve */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción Breve *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Resumen del artículo que aparecerá en la lista de posts..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-vertical min-h-[80px] text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">Máximo 150 caracteres recomendado</p>
            </div>

            {/* Contenido completo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contenido Completo del Artículo *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Escribe el contenido completo del artículo aquí..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-vertical min-h-[250px] text-gray-900 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Puedes usar líneas nuevas para párrafos</p>
            </div>

            {/* Imagen destacada */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Imagen Destacada del Artículo
              </label>
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">Formatos soportados: JPG, PNG, GIF (máx 5MB)</p>
              
              {formData.featuredImage && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Vista previa:</p>
                  <img
                    src={formData.featuredImage}
                    alt="Vista previa"
                    className="max-w-xs h-auto rounded-lg border border-gray-300"
                  />
                  <button
                    onClick={() => setFormData({ ...formData, featuredImage: null })}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Eliminar imagen
                  </button>
                </div>
              )}
            </div>

            {/* Fecha de publicación */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fecha de Publicación
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                />
              </div>

              {/* Destacado */}
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Marcar como destacado</span>
                </label>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={handleSavePost}
                className="flex-1 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                {editingPost ? '📝 Actualizar Post' : '✅ Publicar Post'}
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex-1 px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de posts publicados */}
      {blogData.posts && blogData.posts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            📚 Posts Publicados ({blogData.posts.length})
          </h3>

          <div className="space-y-3">
            {blogData.posts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                {/* Header del post */}
                <div
                  onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                  className="p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{post.featured ? '⭐' : '📄'}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{post.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-1">{post.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          📅 {new Date(post.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    {expandedPost === post.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {/* Contenido expandido */}
                {expandedPost === post.id && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-3">
                    {post.featuredImage && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Vista previa de imagen:</p>
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="max-w-xs h-auto rounded-lg border border-gray-300"
                        />
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Descripción:</p>
                      <p className="text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-200">{post.description}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Contenido:</p>
                      <div className="text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-200 max-h-[200px] overflow-y-auto whitespace-pre-wrap">
                        {post.content}
                      </div>
                    </div>

                    {/* Botones de edición y eliminación */}
                    <div className="flex gap-2 pt-3 border-t">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                      >
                        <Edit2 size={16} />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                      >
                        <Trash2 size={16} />
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay posts */}
      {blogData.posts && blogData.posts.length === 0 && !showForm && (
        <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-lg p-8 text-center">
          <p className="text-amber-900 font-medium">
            No hay posts aún. ¡Crea tu primer artículo!
          </p>
        </div>
      )}
    </div>
  );
}
