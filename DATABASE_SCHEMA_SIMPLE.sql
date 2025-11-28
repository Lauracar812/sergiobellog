-- ============================================================================
-- SCHEMA SIMPLIFICADO PARA SERGIOBELLOG.COM
-- ============================================================================
-- Schema optimizado para la estructura actual de datos
-- Versión: PostgreSQL 12+
-- ============================================================================

-- Limpiar tablas existentes
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS gallery_images CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS about_section CASCADE;
DROP TABLE IF EXISTS hero_section CASCADE;

-- ============================================================================
-- TABLA: books
-- Solo: id, title, coverImage
-- ============================================================================
CREATE TABLE books (
  id NUMERIC PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  cover_image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: gallery_images
-- Solo: id, image
-- ============================================================================
CREATE TABLE gallery_images (
  id NUMERIC PRIMARY KEY,
  image TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: blog_posts
-- id, title, description, content, date, featured, featuredImage
-- ============================================================================
CREATE TABLE blog_posts (
  id NUMERIC PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  content TEXT,
  date_created VARCHAR(20),
  featured BOOLEAN DEFAULT FALSE,
  featured_image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLAS DE SECCIONES (información general)
-- ============================================================================

-- Hero Section
CREATE TABLE hero_section (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) DEFAULT '',
  description TEXT,
  background_image_desktop TEXT,
  background_image_mobile TEXT,
  logo_image TEXT,
  button_text VARCHAR(100) DEFAULT 'Hablemos'
);

-- About Section
CREATE TABLE about_section (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) DEFAULT 'Sobre mí',
  biography TEXT,
  author_image TEXT
);

-- Services Table
CREATE TABLE services (
  id NUMERIC PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE events (
  id NUMERIC PRIMARY KEY,
  event_name VARCHAR(255) NOT NULL,
  event_description TEXT,
  event_date VARCHAR(20),
  event_time VARCHAR(10),
  event_location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INSERTAR DATOS POR DEFECTO
-- ============================================================================

-- Hero Section
INSERT INTO hero_section (title, description, background_image_desktop, background_image_mobile, logo_image, button_text)
VALUES (
  '',
  '"Autor de ficción y no ficción transformadora: Escribiendo para el cambio, empoderando mentes, inspirando resiliencia y crecimiento"',
  'https://horizons-cdn.hostinger.com/117acb36-31dc-4706-a945-f23250275492/fba21a42a3efa38403e12e1c11d1b229.png',
  'https://horizons-cdn.hostinger.com/117acb36-31dc-4706-a945-f23250275492/fba21a42a3efa38403e12e1c11d1b229.png',
  'https://horizons-cdn.hostinger.com/117acb36-31dc-4706-a945-f23250275492/abded8c8564e182b7e4a4cba61d52acb.png',
  'Hablemos'
);

-- About Section
INSERT INTO about_section (title, biography, author_image)
VALUES (
  'Sobre mí',
  'Autor bestseller del New York Times e internacional. Autor mexicano de ficción y no ficción | Defensor de la inclusión de personas con discapacidad | Líder de opinión en desarrollo personal.

Sergio Andrés Bello Guerra es un destacado autor, académico y defensor de la inclusión en México, reconocido por una voz poderosa que combina experiencia personal y solidez profesional. Originario de Oaxaca, es padre de dos hijos con discapacidad, una realidad que ha marcado profundamente su visión del mundo y ha inspirado gran parte de su obra literaria, tanto de ficción como de no ficción.

Sus escritos exploran temas como la resiliencia, el empoderamiento y el potencial humano. Con una formación académica multidisciplinaria —Licenciatura en Ingeniería de Sistemas Informáticos, Doctorado en Ciencias Políticas y Maestría en Escritura Creativa— Sergio aporta a sus libros una mezcla única de rigor intelectual, sensibilidad humana y claridad emocional.

Su experiencia en el servicio público, donde ha trabajado en iniciativas relacionadas con comunidades indígenas, transparencia gubernamental y desarrollo económico, complementa su misión como escritor: empoderar a las personas para superar la adversidad, reconocer su fortaleza interior y expandir sus capacidades más allá de los límites autoimpuestos.

Los libros, artículos y ensayos de Sergio no solo inspiran: funcionan como una guía práctica para quienes buscan crecimiento personal, inclusión social y un propósito renovado. Tanto si lees sus reflexiones profundas sobre desarrollo humano como sus historias de ficción con sensibilidad social, su voz transmite autenticidad, esperanza y compromiso real con la transformación.',
  NULL
);

-- Services (Default)
INSERT INTO services (id, title, description, icon)
VALUES 
  (1, 'Escritor', 'Contenido inspirador y transformador', NULL),
  (2, 'Coach de Vida', 'Desarrollo personal y empoderamiento', NULL),
  (3, 'Asesor Personal y Empresarial', 'Asesoría especializada para tu crecimiento', NULL),
  (4, 'Conferencista', 'Conferencias motivacionales e inspiradoras', NULL),
  (5, 'Director de Arimes', 'Dirección y gestión estratégica', NULL);
