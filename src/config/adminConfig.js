// Configuración del Sistema Admin
// Cambia AUTH_TYPE para elegir qué usar

const AUTH_TYPE = 'LOCAL'; // 'LOCAL' o 'BACKEND'

// ====================================
// OPCIÓN 1: Autenticación Local (localStorage)
// ====================================
const LOCAL_AUTH = {
  username: 'admin',
  password: 'admin123'
};

// ====================================
// OPCIÓN 2: Backend API
// ====================================
const BACKEND_CONFIG = {
  API_URL: 'http://localhost:5000', // Cambiar por tu URL de backend
  ENDPOINTS: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    GET_CONTENT: '/api/admin/content',
    SAVE_CONTENT: '/api/admin/content',
    GET_USER: '/api/auth/user'
  }
};

// ====================================
// OPCIÓN 3: Base de Datos en Nube
// ====================================
const CLOUD_CONFIG = {
  // Firebase
  FIREBASE: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'your-app.firebaseapp.com',
    projectId: 'your-app',
    storageBucket: 'your-app.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID'
  },

  // Supabase
  SUPABASE: {
    URL: 'https://xxxxx.supabase.co',
    ANON_KEY: 'YOUR_ANON_KEY'
  },

  // MongoDB Atlas con API (RESTful)
  MONGODB_API: {
    BASE_URL: 'https://data.mongodb-api.com/app/your-app-id/endpoint',
    API_KEY: 'YOUR_API_KEY'
  }
};

// ====================================
// EXPORTAR CONFIGURACIÓN ACTIVA
// ====================================
export const getAuthConfig = () => {
  if (AUTH_TYPE === 'LOCAL') {
    return {
      type: 'LOCAL',
      config: LOCAL_AUTH
    };
  }

  if (AUTH_TYPE === 'BACKEND') {
    return {
      type: 'BACKEND',
      config: BACKEND_CONFIG
    };
  }

  return {
    type: 'LOCAL',
    config: LOCAL_AUTH
  };
};

// ====================================
// INSTRUCCIONES DE USO
// ====================================
/*

PASO 1: ELEGIR TIPO DE AUTENTICACIÓN
=====================================

En la primera línea de este archivo, cambia:
const AUTH_TYPE = 'LOCAL'; // Cambiar aquí


OPCIÓN 1: LOCAL (Sin Backend)
-------------------------------
- Usa localStorage
- No necesita servidor
- Credenciales: admin / admin123
- Cambiar en LOCAL_AUTH


OPCIÓN 2: BACKEND (API REST)
-----------------------------
- Necesita un servidor Node/Express
- Envía credenciales al servidor
- El servidor valida en BD
- Configurar BACKEND_CONFIG con tu URL


OPCIÓN 3: FIREBASE
-------------------
- Base de datos en nube
- Autenticación Firebase
- Requiere npm install firebase
- Llenar FIREBASE config


OPCIÓN 4: SUPABASE
-------------------
- PostgreSQL en nube
- Autenticación incluida
- Requiere npm install @supabase/supabase-js
- Llenar SUPABASE config


OPCIÓN 5: MONGODB
------------------
- Requiere API REST configurada
- Requiere API Key
- Llenar MONGODB_API config


PASO 2: CONFIGURAR CREDENCIALES
==================================

Si usas LOCAL:
  - Cambiar usuario en LOCAL_AUTH.username
  - Cambiar contraseña en LOCAL_AUTH.password

Si usas BACKEND:
  - Cambiar BACKEND_CONFIG.API_URL
  - Cambiar endpoints si es necesario

Si usas CLOUD:
  - Llenar credenciales en CLOUD_CONFIG


PASO 3: ACTUALIZAR auth.js
============================

El archivo src/utils/auth.js debe importar esta configuración
y usar los valores correspondientes.

*/
