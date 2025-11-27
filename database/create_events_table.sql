-- Crear tabla de eventos para sergiobellog.com (PostgreSQL)
-- Ejecutar este script en tu base de datos PostgreSQL para crear la tabla de almacenamiento de eventos

-- Crear secuencia para el ID (PostgreSQL)
CREATE SEQUENCE IF NOT EXISTS events_id_seq START 1;

-- Crear tabla
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  event_name VARCHAR(255) NOT NULL,
  event_description TEXT NOT NULL,
  event_time VARCHAR(50) NOT NULL,
  event_location VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar eventos de ejemplo (opcional)
INSERT INTO events (event_name, event_description, event_time, event_location) VALUES
('Taller de React Avanzado', 'Aprende técnicas avanzadas de React 19 incluyendo hooks personalizados y optimización de rendimiento.', '14:00', 'Sala de Conferencias A'),
('Seminario de Desarrollo Web', 'Explora las últimas tendencias en desarrollo web moderno con tecnologías como Vite y Tailwind CSS.', '16:30', 'Auditorio Principal'),
('Masterclass de JavaScript', 'Domina JavaScript con ejemplos prácticos y mejores prácticas para desarrollo profesional.', '10:00', 'Sala Online');

-- Crear índices para mejorar búsquedas
CREATE INDEX IF NOT EXISTS idx_event_time ON events(event_time);
CREATE INDEX IF NOT EXISTS idx_event_location ON events(event_location);
