-- =====================================================
-- SQL para crear tabla de Redes Sociales
-- Ejecutar en Supabase SQL Editor
-- =====================================================

-- Crear tabla de redes sociales
CREATE TABLE IF NOT EXISTS social_media (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon TEXT NOT NULL,
    url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para ordenar por display_order
CREATE INDEX IF NOT EXISTS idx_social_media_order ON social_media(display_order);

-- Crear índice para filtrar por activos
CREATE INDEX IF NOT EXISTS idx_social_media_active ON social_media(is_active);

-- Habilitar Row Level Security (RLS)
ALTER TABLE social_media ENABLE ROW LEVEL SECURITY;

-- Política para permitir SELECT público (todos pueden ver las redes)
CREATE POLICY "Permitir lectura pública de redes sociales" ON social_media
    FOR SELECT
    USING (true);

-- Política para permitir INSERT solo a usuarios autenticados (admin)
CREATE POLICY "Solo admin puede agregar redes" ON social_media
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir UPDATE solo a usuarios autenticados (admin)
CREATE POLICY "Solo admin puede actualizar redes" ON social_media
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Política para permitir DELETE solo a usuarios autenticados (admin)
CREATE POLICY "Solo admin puede eliminar redes" ON social_media
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- Función para actualizar el campo updated_at automáticamente
CREATE OR REPLACE FUNCTION update_social_media_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at en cada UPDATE
DROP TRIGGER IF EXISTS trigger_social_media_updated_at ON social_media;
CREATE TRIGGER trigger_social_media_updated_at
    BEFORE UPDATE ON social_media
    FOR EACH ROW
    EXECUTE FUNCTION update_social_media_updated_at();

-- =====================================================
-- ICONOS DISPONIBLES EN EL SISTEMA:
-- =====================================================
-- facebook, instagram, twitter, linkedin, youtube, 
-- tiktok, whatsapp, telegram, pinterest, spotify,
-- email, globe (sitio web)
-- =====================================================

-- =====================================================
-- DATOS DE EJEMPLO (Opcional - Descomentar si deseas)
-- =====================================================
-- INSERT INTO social_media (name, icon, url, display_order) VALUES
--     ('Facebook', 'facebook', 'https://facebook.com/tu-pagina', 1),
--     ('Instagram', 'instagram', 'https://instagram.com/tu-usuario', 2),
--     ('LinkedIn', 'linkedin', 'https://linkedin.com/in/tu-perfil', 3),
--     ('YouTube', 'youtube', 'https://youtube.com/@tu-canal', 4),
--     ('WhatsApp', 'whatsapp', 'https://wa.me/34612345678', 5);

-- =====================================================
-- CONSULTAS ÚTILES
-- =====================================================
-- Ver todas las redes sociales activas ordenadas:
-- SELECT * FROM social_media WHERE is_active = true ORDER BY display_order;

-- Ver todas las redes sociales:
-- SELECT * FROM social_media ORDER BY display_order;
