-- =====================================================
-- SQL para crear tabla de suscriptores del Newsletter
-- Ejecutar en Supabase SQL Editor
-- =====================================================

-- Crear tabla de suscriptores del newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'unsubscribed')),
    source VARCHAR(50) DEFAULT 'website',
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsqueda por email
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- Crear índice para filtrar por estado
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);

-- Crear índice para ordenar por fecha de suscripción
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscribers(subscribed_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT desde el frontend (suscripción pública)
CREATE POLICY "Permitir suscripción pública" ON newsletter_subscribers
    FOR INSERT
    WITH CHECK (true);

-- Política para permitir SELECT solo a usuarios autenticados (admin)
CREATE POLICY "Solo admin puede ver suscriptores" ON newsletter_subscribers
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Política para permitir UPDATE solo a usuarios autenticados (admin)
CREATE POLICY "Solo admin puede actualizar suscriptores" ON newsletter_subscribers
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Política para permitir DELETE solo a usuarios autenticados (admin)
CREATE POLICY "Solo admin puede eliminar suscriptores" ON newsletter_subscribers
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- Función para actualizar el campo updated_at automáticamente
CREATE OR REPLACE FUNCTION update_newsletter_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at en cada UPDATE
DROP TRIGGER IF EXISTS trigger_newsletter_updated_at ON newsletter_subscribers;
CREATE TRIGGER trigger_newsletter_updated_at
    BEFORE UPDATE ON newsletter_subscribers
    FOR EACH ROW
    EXECUTE FUNCTION update_newsletter_updated_at();

-- =====================================================
-- DATOS DE EJEMPLO (Opcional - Descomentar si deseas)
-- =====================================================
-- INSERT INTO newsletter_subscribers (email, status) VALUES
--     ('ejemplo1@email.com', 'active'),
--     ('ejemplo2@email.com', 'active'),
--     ('ejemplo3@email.com', 'inactive');

-- =====================================================
-- CONSULTAS ÚTILES
-- =====================================================
-- Ver todos los suscriptores activos:
-- SELECT * FROM newsletter_subscribers WHERE status = 'active' ORDER BY subscribed_at DESC;

-- Contar suscriptores por estado:
-- SELECT status, COUNT(*) FROM newsletter_subscribers GROUP BY status;

-- Exportar emails activos para campaña:
-- SELECT email FROM newsletter_subscribers WHERE status = 'active';
