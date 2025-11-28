import React, { useState, useEffect } from 'react';
import { useAdminContent } from '@/hooks/useAdminContent';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Plus } from 'lucide-react';

export default function BlogSectionEditor() {
  const { content, saveContent } = useAdminContent();
  const { toast } = useToast();
  const [blogData, setBlogData] = useState(content?.blogSection || {
    title: 'Blog',
    buttonText: 'Hablemos',
    posts: []
  });
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    featured: false,
    featuredImage: null
  });

  useEffect(() => {
    if (content?.blogSection) {
      setBlogData(content.blogSection);
    }
  }, [content]);

  const handleAddPost = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      featured: false,
      featuredImage: null
    });
  };

  const handleEditPost = (post) => {
    setEditingPost(post.id);
    setFormData(post);
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
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePost = () => {
    if (!formData.title.trim()) {
      toast({
        title: 'Error',
        description: 'El título del post es requerido',
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
      const newPost = {
        ...formData,
        id: Date.now()
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
    saveContent({ ...content, blogSection: updatedBlog });
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      featured: false,
      featuredImage: null
    });
  };

  const handleDeletePost = (id) => {
    const updatedBlog = {
      ...blogData,
      posts: blogData.posts.filter(p => p.id !== id)
    };
    setBlogData(updatedBlog);
    saveContent({ ...content, blogSection: updatedBlog });
    toast({
      title: 'Éxito',
      description: 'Post eliminado correctamente'
    });
  };

  return (
    <div className="space-y-6">
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
            saveContent({ ...content, blogSection: updated });
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
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
            saveContent({ ...content, blogSection: updated });
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Formulario de creación/edición de post */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {editingPost ? 'Editar Post' : 'Crear Nuevo Post'}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Título del Post
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Título del post"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Resumen/Excerpt
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Breve resumen del post"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-vertical min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contenido del Post
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Contenido completo del post"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-vertical min-h-[200px]"
            />
          </div>

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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Destacado</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Imagen Destacada
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="w-full"
            />
            {formData.featuredImage && (
              <div className="mt-3">
                <img
                  src={formData.featuredImage}
                  alt="Vista previa"
                  className="max-w-xs h-auto rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <button
              onClick={handleSavePost}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              {editingPost ? 'Actualizar Post' : 'Crear Post'}
            </button>
            {editingPost && (
              <button
                onClick={() => {
                  setEditingPost(null);
                  setFormData({
                    title: '',
                    excerpt: '',
                    content: '',
                    date: new Date().toISOString().split('T')[0],
                    featured: false,
                    featuredImage: null
                  });
                }}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lista de posts */}
      {blogData.posts && blogData.posts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Posts Publicados ({blogData.posts.length})
          </h3>

          <div className="space-y-3">
            {blogData.posts.map((post) => (
              <div
                key={post.id}
                className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-800">{post.title}</h4>
                    {post.featured && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded font-medium">
                        Destacado
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(post.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEditPost(post)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botón para agregar nuevo post */}
      {!editingPost && (
        <button
          onClick={handleAddPost}
          className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Agregar Nuevo Post
        </button>
      )}
    </div>
  );
}
