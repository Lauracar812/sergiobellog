import http from 'http';
import url from 'url';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '.env.local') });

const PORT = process.env.BACKEND_PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Inicializar cliente Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Función para parsear JSON
const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
};

// Función para enviar respuesta
const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': FRONTEND_URL,
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
};

// Validación de datos
const validateContactData = (data) => {
  const errors = [];
  
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('El nombre es requerido');
  }
  
  if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
    errors.push('El email es válido y requerido');
  }
  
  if (data.phone && typeof data.phone !== 'string') {
    errors.push('El teléfono debe ser texto');
  }
  
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.push('El mensaje es requerido');
  }
  
  return errors;
};

// Crear servidor
const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': FRONTEND_URL,
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Health check
  if (pathname === '/health' && req.method === 'GET') {
    return sendResponse(res, 200, { 
      status: 'OK', 
      timestamp: new Date().toISOString() 
    });
  }

  // POST /api/contact-messages
  if (pathname === '/api/contact-messages' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const { name, email, phone, message } = body;

      // Validar datos
      const errors = validateContactData({ name, email, phone, message });
      if (errors.length > 0) {
        return sendResponse(res, 400, { errors });
      }

      // Insertar en Supabase
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone?.trim() || null,
          message: message.trim(),
          status: 'new'
        }])
        .select();

      if (error) {
        console.error('Error de Supabase:', error);
        return sendResponse(res, 500, { 
          error: 'Error al guardar el mensaje',
          details: process.env.NODE_ENV !== 'production' ? error.message : undefined
        });
      }

      return sendResponse(res, 201, {
        success: true,
        message: 'Mensaje enviado correctamente',
        data: data?.[0]
      });

    } catch (error) {
      console.error('Error en POST /api/contact-messages:', error);
      return sendResponse(res, 500, { 
        error: 'Error al procesar la solicitud',
        details: process.env.NODE_ENV !== 'production' ? error.message : undefined
      });
    }
  }

  // GET /api/contact-messages
  if (pathname === '/api/contact-messages' && req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error de Supabase:', error);
        return sendResponse(res, 500, { error: 'Error al obtener mensajes' });
      }

      return sendResponse(res, 200, data);

    } catch (error) {
      console.error('Error en GET /api/contact-messages:', error);
      return sendResponse(res, 500, { error: 'Error al procesar la solicitud' });
    }
  }

  // 404
  sendResponse(res, 404, { error: 'Endpoint no encontrado' });
});

server.listen(PORT, () => {
  console.log(`✅ Backend servidor iniciado en puerto ${PORT}`);
  console.log(`📧 Endpoint de contacto: POST http://localhost:${PORT}/api/contact-messages`);
  console.log(`🔗 CORS permitido desde: ${FRONTEND_URL}`);
});
