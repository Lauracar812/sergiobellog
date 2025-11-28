import { useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const useContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los mensajes
  const fetchMessages = useCallback(async (status = null) => {
    setIsLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('contact_messages')
        .select('*');

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error: err } = await query.order('created_at', { ascending: false });

      if (err) throw err;
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Actualizar estado del mensaje
  const updateMessageStatus = useCallback(async (id, status) => {
    try {
      const { error: err } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);

      if (err) throw err;

      // Actualizar en el estado local
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status } : msg))
      );
    } catch (err) {
      console.error('Error updating message status:', err);
      setError(err.message);
    }
  }, []);

  // Archivar mensaje
  const archiveMessage = useCallback(async (id) => {
    try {
      const { error: err } = await supabase
        .from('contact_messages')
        .update({ 
          archived_at: new Date().toISOString(),
          status: 'archived'
        })
        .eq('id', id);

      if (err) throw err;

      // Actualizar en el estado local
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id
            ? { ...msg, archived_at: new Date().toISOString(), status: 'archived' }
            : msg
        )
      );
    } catch (err) {
      console.error('Error archiving message:', err);
      setError(err.message);
    }
  }, []);

  // Eliminar mensaje (soft delete)
  const deleteMessage = useCallback(async (id) => {
    try {
      const { error: err } = await supabase
        .from('contact_messages')
        .update({ 
          deleted_at: new Date().toISOString(),
          status: 'deleted'
        })
        .eq('id', id);

      if (err) throw err;

      // Remover del estado local
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
      setError(err.message);
    }
  }, []);

  // Marcar como leído
  const markAsRead = useCallback(async (id) => {
    await updateMessageStatus(id, 'read');
  }, [updateMessageStatus]);

  return {
    messages,
    isLoading,
    error,
    fetchMessages,
    updateMessageStatus,
    archiveMessage,
    deleteMessage,
    markAsRead,
  };
};
