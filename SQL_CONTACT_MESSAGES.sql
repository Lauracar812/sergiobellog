-- Tabla para almacenar mensajes de contacto
-- Ejecutar en Supabase

CREATE TABLE contact_messages (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived', 'deleted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  archived_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Índices para mejorar búsquedas
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);

-- Política de seguridad RLS (Row Level Security)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Permite leer todos los mensajes al admin
CREATE POLICY "Allow admin to read all messages" ON contact_messages
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@sergiobellog.com');

-- Permite crear mensajes desde el frontend (anónimo)
CREATE POLICY "Allow anyone to create messages" ON contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Permite actualizar mensajes (status, archived_at)
CREATE POLICY "Allow admin to update messages" ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@sergiobellog.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@sergiobellog.com');

-- Permite eliminar mensajes (soft delete)
CREATE POLICY "Allow admin to delete messages" ON contact_messages
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@sergiobellog.com');

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_contact_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_contact_messages_updated_at_trigger
BEFORE UPDATE ON contact_messages
FOR EACH ROW
EXECUTE FUNCTION update_contact_messages_updated_at();