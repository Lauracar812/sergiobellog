-- ============================================================================
-- SCHEMA DE BASE DE DATOS PARA SERGIOBELLOG.COM
-- ============================================================================
-- Este script crea todas las tablas necesarias para persistir la información
-- del sitio web sin perder datos ni modificar el diseño.
-- Versión: PostgreSQL 12+
-- ============================================================================

-- ============================================================================
-- LIMPIAR TABLAS EXISTENTES (opcional - descomenta si quieres resetear)
-- ============================================================================
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS blog_section CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS services_section CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS events_section CASCADE;
DROP TABLE IF EXISTS gallery_images CASCADE;
DROP TABLE IF EXISTS gallery_section CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS books_section CASCADE;
DROP TABLE IF EXISTS about_section CASCADE;
DROP TABLE IF EXISTS hero_section CASCADE;

-- ============================================================================
-- 1. TABLA: hero_section
-- Descripción: Sección Hero con título, descripción e imágenes principales
-- ============================================================================
CREATE TABLE hero_section (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) DEFAULT '',
  description TEXT,
  background_image_desktop TEXT,
  background_image_mobile TEXT,
  logo_image TEXT,
  button_text VARCHAR(100) DEFAULT 'Hablemos',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 2. TABLA: about_section
-- Descripción: Información de "Sobre mí" con biografía e imagen del autor
-- ============================================================================
CREATE TABLE about_section (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) DEFAULT 'Sobre mí',
  biography TEXT,
  author_image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 3. TABLA: books_section
-- Descripción: Sección de libros (encabezado)
-- ============================================================================
CREATE TABLE books_section (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) DEFAULT 'Mis Libros',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 4. TABLA: books
-- Descripción: Listado de libros con detalles
-- ============================================================================
CREATE TABLE books (
  id BIGINT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  content TEXT,
  author VARCHAR(255),
  publication_date DATE,
  cover_image TEXT,
  featured BOOLEAN DEFAULT FALSE,
  featured_image TEXT,
  date_created VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (id)
);

-- ============================================================================
-- 5. TABLA: gallery_section
-- Descripción: Sección de galería (encabezado)
-- ============================================================================
CREATE TABLE gallery_section (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) DEFAULT 'Galería',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 6. TABLA: gallery_images
-- Descripción: Imágenes de la galería
-- ============================================================================
CREATE TABLE gallery_images (
  id BIGINT PRIMARY KEY,
  title VARCHAR(500),
  description TEXT,
  image TEXT NOT NULL,
  gallery_order INT DEFAULT 0,
  date_created VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (id)
);

-- ============================================================================
-- 7. TABLA: events_section
-- Descripción: Sección de eventos (encabezado)
-- ============================================================================
CREATE TABLE events_section (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) DEFAULT 'Eventos',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 8. TABLA: events
-- Descripción: Listado de eventos
-- ============================================================================
CREATE TABLE events (
  id BIGINT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  date_event DATE,
  location VARCHAR(255),
  event_image TEXT,
  date_created VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (id)
);

-- ============================================================================
-- 9. TABLA: services_section
-- Descripción: Sección de servicios (encabezado)
-- ============================================================================
CREATE TABLE services_section (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) DEFAULT 'Servicios',
  button_text VARCHAR(100) DEFAULT 'Hablemos',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 10. TABLA: services
-- Descripción: Listado de servicios
-- ============================================================================
CREATE TABLE services (
  id INT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon TEXT,
  service_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 11. TABLA: blog_section
-- Descripción: Sección de blog (encabezado)
-- ============================================================================
CREATE TABLE blog_section (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) DEFAULT 'Blog',
  button_text VARCHAR(100) DEFAULT 'Hablemos',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 12. TABLA: blog_posts
-- Descripción: Artículos del blog
-- ============================================================================
CREATE TABLE blog_posts (
  id BIGINT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  content TEXT,
  date_created VARCHAR(20),
  featured BOOLEAN DEFAULT FALSE,
  featured_image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (id)
);

-- ============================================================================
-- INSERTAR DATOS POR DEFECTO
-- ============================================================================

-- Hero Section
INSERT INTO hero_section (
  title, 
  description, 
  background_image_desktop, 
  background_image_mobile, 
  logo_image, 
  button_text
) VALUES (
  '',
  '"Autor de ficción y no ficción transformadora: Escribiendo para el cambio, empoderando mentes, inspirando resiliencia y crecimiento"',
  'https://horizons-cdn.hostinger.com/117acb36-31dc-4706-a945-f23250275492/fba21a42a3efa38403e12e1c11d1b229.png',
  'https://horizons-cdn.hostinger.com/117acb36-31dc-4706-a945-f23250275492/fba21a42a3efa38403e12e1c11d1b229.png',
  'https://horizons-cdn.hostinger.com/117acb36-31dc-4706-a945-f23250275492/abded8c8564e182b7e4a4cba61d52acb.png',
  'Hablemos'
);

-- About Section
INSERT INTO about_section (
  title,
  biography,
  author_image
) VALUES (
  'Sobre mí',
  'Autor bestseller del New York Times e internacional. Autor mexicano de ficción y no ficción | Defensor de la inclusión de personas con discapacidad | Líder de opinión en desarrollo personal.

Sergio Andrés Bello Guerra es un destacado autor, académico y defensor de la inclusión en México, reconocido por una voz poderosa que combina experiencia personal y solidez profesional. Originario de Oaxaca, es padre de dos hijos con discapacidad, una realidad que ha marcado profundamente su visión del mundo y ha inspirado gran parte de su obra literaria, tanto de ficción como de no ficción.

Sus escritos exploran temas como la resiliencia, el empoderamiento y el potencial humano. Con una formación académica multidisciplinaria —Licenciatura en Ingeniería de Sistemas Informáticos, Doctorado en Ciencias Políticas y Maestría en Escritura Creativa— Sergio aporta a sus libros una mezcla única de rigor intelectual, sensibilidad humana y claridad emocional.

Su experiencia en el servicio público, donde ha trabajado en iniciativas relacionadas con comunidades indígenas, transparencia gubernamental y desarrollo económico, complementa su misión como escritor: empoderar a las personas para superar la adversidad, reconocer su fortaleza interior y expandir sus capacidades más allá de los límites autoimpuestos.

Los libros, artículos y ensayos de Sergio no solo inspiran: funcionan como una guía práctica para quienes buscan crecimiento personal, inclusión social y un propósito renovado. Tanto si lees sus reflexiones profundas sobre desarrollo humano como sus historias de ficción con sensibilidad social, su voz transmite autenticidad, esperanza y compromiso real con la transformación.',
  NULL
);

-- Books Section
INSERT INTO books_section (title) VALUES ('Mis Libros');

-- Gallery Section
INSERT INTO gallery_section (title) VALUES ('Galería');

-- Events Section
INSERT INTO events_section (title) VALUES ('Eventos');

-- Services Section
INSERT INTO services_section (title, button_text) VALUES ('Servicios', 'Hablemos');

-- Services (datos por defecto)
INSERT INTO services (id, title, description, icon, service_order) VALUES
(1, 'Escritor', 'Contenido inspirador y transformador', NULL, 1),
(2, 'Coach de Vida', 'Desarrollo personal y empoderamiento', NULL, 2),
(3, 'Asesor Personal y Empresarial', 'Asesoría especializada para tu crecimiento', NULL, 3),
(4, 'Conferencista', 'Conferencias motivacionales e inspiradoras', NULL, 4),
(5, 'Director de Arimes', 'Dirección y gestión estratégica', NULL, 5);

-- Blog Section
INSERT INTO blog_section (title, button_text) VALUES ('Blog', 'Hablemos');

-- ============================================================================
-- CREAR ÍNDICES PARA MEJOR RENDIMIENTO
-- ============================================================================
CREATE INDEX idx_books_featured ON books(featured);
CREATE INDEX idx_gallery_order ON gallery_images(gallery_order);
CREATE INDEX idx_events_date ON events(date_event);
CREATE INDEX idx_blog_featured ON blog_posts(featured);
CREATE INDEX idx_blog_date ON blog_posts(date_created);
CREATE INDEX idx_services_order ON services(service_order);

-- ============================================================================
-- CREAR VISTAS ÚTILES PARA CONSULTAS
-- ============================================================================

-- Vista para obtener todos los libros ordenados
CREATE VIEW v_books AS
SELECT * FROM books ORDER BY date_created DESC;

-- Vista para obtener libros destacados
CREATE VIEW v_featured_books AS
SELECT * FROM books WHERE featured = TRUE ORDER BY date_created DESC;

-- Vista para obtener imágenes de galería ordenadas
CREATE VIEW v_gallery AS
SELECT * FROM gallery_images ORDER BY gallery_order ASC;

-- Vista para obtener eventos próximos
CREATE VIEW v_upcoming_events AS
SELECT * FROM events WHERE date_event >= CURRENT_DATE ORDER BY date_event ASC;

-- Vista para obtener servicios ordenados
CREATE VIEW v_services AS
SELECT * FROM services ORDER BY service_order ASC;

-- Vista para obtener posts del blog ordenados
CREATE VIEW v_blog_posts AS
SELECT * FROM blog_posts ORDER BY date_created DESC;

-- Vista para obtener posts destacados del blog
CREATE VIEW v_featured_blog_posts AS
SELECT * FROM blog_posts WHERE featured = TRUE ORDER BY date_created DESC;

-- ============================================================================
-- INFORMACIÓN DE CONSULTAS ÚTILES
-- ============================================================================
-- 
-- OBTENER INFORMACIÓN COMPLETA:
-- SELECT * FROM hero_section;
-- SELECT * FROM about_section;
-- SELECT * FROM v_books;
-- SELECT * FROM v_featured_books;
-- SELECT * FROM v_gallery;
-- SELECT * FROM v_upcoming_events;
-- SELECT * FROM v_services;
-- SELECT * FROM v_blog_posts;
--
-- ACTUALIZAR INFORMACIÓN:
-- UPDATE hero_section SET title = 'Nuevo Título' WHERE id = 1;
-- UPDATE about_section SET biography = 'Nueva biografía' WHERE id = 1;
--
-- ============================================================================
