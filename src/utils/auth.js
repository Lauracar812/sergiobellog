import { supabase } from '@/config/supabaseConfig';

// Sistema de autenticación flexible
// Soporta: Local, Backend API, Supabase

const AUTH_TYPE = 'SUPABASE'; // Cambiar a 'LOCAL' o 'BACKEND' si es necesario

// ====================================
// CONFIGURACIÓN LOCAL (localStorage)
// ====================================
const LOCAL_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

// ====================================
// CONFIGURACIÓN BACKEND API
// ====================================
const BACKEND_URL = 'http://localhost:5000'; // Cambiar por tu URL de backend

// ====================================
// LOCAL AUTHENTICATION
// ====================================
const localAuth = {
  login: (username, password) => {
    if (username === LOCAL_CREDENTIALS.username && 
        password === LOCAL_CREDENTIALS.password) {
      const token = btoa(`${username}:${Date.now()}`);
      localStorage.setItem('admin-token', token);
      localStorage.setItem('admin-user', JSON.stringify({ username }));
      return { success: true, token, user: { username } };
    }
    return { success: false, error: 'Credenciales inválidas' };
  },

  logout: () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('admin-token');
  },

  getToken: () => {
    return localStorage.getItem('admin-token');
  },

  getUser: () => {
    const user = localStorage.getItem('admin-user');
    return user ? JSON.parse(user) : null;
  }
};

// ====================================
// BACKEND AUTHENTICATION
// ====================================
const backendAuth = {
  login: async (username, password) => {
    try {
      console.log('Conectando a backend:', BACKEND_URL);
      
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error de login:', error);
        return { 
          success: false, 
          error: error.message || 'Error al iniciar sesión' 
        };
      }

      const data = await response.json();
      const { token, user } = data;

      // Guardar token y usuario
      localStorage.setItem('admin-token', token);
      localStorage.setItem('admin-user', JSON.stringify(user));

      console.log('✅ Login exitoso:', user.username);
      return { success: true, token, user };
    } catch (error) {
      console.error('Error en conexión:', error.message);
      return { 
        success: false, 
        error: `Error de conexión: ${error.message}. ¿El servidor está corriendo?` 
      };
    }
  },

  logout: () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('admin-token');
  },

  getToken: () => {
    return localStorage.getItem('admin-token');
  },

  getUser: () => {
    const user = localStorage.getItem('admin-user');
    return user ? JSON.parse(user) : null;
  }
};

// ====================================
// SUPABASE AUTHENTICATION
// ====================================
const supabaseAuth = {
  login: async (email, password) => {
    try {
      console.log('🔗 Conectando a Supabase:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('❌ Error de Supabase:', error.message);
        return { 
          success: false, 
          error: error.message || 'Error al iniciar sesión' 
        };
      }

      const { user, session } = data;

      // Guardar datos en localStorage
      localStorage.setItem('admin-token', session.access_token);
      localStorage.setItem('admin-user', JSON.stringify({
        email: user.email,
        id: user.id,
        user_metadata: user.user_metadata
      }));

      console.log('✅ Login exitoso con Supabase:', user.email);
      return { 
        success: true, 
        token: session.access_token, 
        user: { email: user.email, id: user.id } 
      };
    } catch (error) {
      console.error('❌ Error en Supabase:', error.message);
      return { 
        success: false, 
        error: error.message || 'Error de conexión a Supabase' 
      };
    }
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('admin-token');
      localStorage.removeItem('admin-user');
      console.log('✅ Logout exitoso');
    } catch (error) {
      console.error('Error al desconectar:', error.message);
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('admin-token');
  },

  getToken: () => {
    return localStorage.getItem('admin-token');
  },

  getUser: () => {
    const user = localStorage.getItem('admin-user');
    return user ? JSON.parse(user) : null;
  }
};

// ====================================
// SELECTOR DE AUTENTICACIÓN
// ====================================
export const auth = 
  AUTH_TYPE === 'SUPABASE' ? supabaseAuth : 
  AUTH_TYPE === 'BACKEND' ? backendAuth : 
  localAuth;

// ====================================
// INFORMACIÓN DE DEPURACIÓN
// ====================================
console.log(`🔐 Autenticación: ${AUTH_TYPE}`);
if (AUTH_TYPE === 'LOCAL') {
  console.log(`   Usuario: ${LOCAL_CREDENTIALS.username}`);
  console.log(`   Contraseña: ${LOCAL_CREDENTIALS.password}`);
} else if (AUTH_TYPE === 'BACKEND') {
  console.log(`   API: ${BACKEND_URL}`);
} else if (AUTH_TYPE === 'SUPABASE') {
  console.log(`   ✅ Supabase configurado`);
}
