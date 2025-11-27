# 🔗 Guía: Conectar a Base de Datos Real

## Paso 1: Elegir el Tipo de Autenticación

### Opción A: LOCAL (Actual - Sin Backend)
- ✅ Sin servidor requerido
- ✅ Almacenamiento local
- ❌ No sincroniza entre dispositivos
- ❌ Pierde datos si se limpian cookies

**Archivo:** `src/utils/auth.js` - línea 1
```javascript
const AUTH_TYPE = 'LOCAL';
```

### Opción B: BACKEND (Con Servidor)
- ✅ Sincroniza con servidor
- ✅ Múltiples dispositivos
- ✅ Base de datos persistente
- ❌ Requiere servidor corriendo

**Archivo:** `src/utils/auth.js` - línea 1
```javascript
const AUTH_TYPE = 'BACKEND';
```

---

## Paso 2: Si Usas Backend - Crear Servidor

### Opción 1: Node.js + Express + MongoDB

#### Instalación:
```bash
# Crear carpeta del servidor
mkdir servidor-admin
cd servidor-admin

# Inicializar Node
npm init -y

# Instalar dependencias
npm install express cors mongoose dotenv bcryptjs jsonwebtoken
npm install -D nodemon
```

#### Archivo: `server.js`
```javascript
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema de Usuario
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
});

const User = mongoose.model('User', userSchema);

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    
    // Aquí verificar password con bcrypt
    // const validPassword = await bcrypt.compare(password, user.password);
    
    // Por ahora verificar directamente
    if (user.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    
    const token = 'jwt-token-aqui'; // Generar JWT real
    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logout exitoso' });
});

app.listen(5000, () => console.log('Servidor en puerto 5000'));
```

#### Archivo: `.env`
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/db-name
JWT_SECRET=tu-super-secret-key
```

#### Ejecutar:
```bash
npm run dev
```

---

### Opción 2: Firebase (Sin Backend Necesario)

#### Instalación:
```bash
npm install firebase
```

#### Archivo: `src/config/firebaseConfig.js`
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

#### Usar en `src/utils/auth.js`:
```javascript
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth as firebaseAuth } from '@/config/firebaseConfig';

export const auth = {
  login: async (username, password) => {
    try {
      const result = await signInWithEmailAndPassword(
        firebaseAuth, 
        username, 
        password
      );
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
```

---

### Opción 3: Supabase (PostgreSQL en Nube)

#### Instalación:
```bash
npm install @supabase/supabase-js
```

#### Archivo: `src/config/supabaseConfig.js`
```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xxxxx.supabase.co';
const supabaseKey = 'YOUR_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
```

#### Usar en `src/utils/auth.js`:
```javascript
import { supabase } from '@/config/supabaseConfig';

export const auth = {
  login: async (username, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password
      });
      
      if (error) throw error;
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
```

---

## Paso 3: Configurar URL del Backend

### En `src/utils/auth.js`

```javascript
// Cambiar esta línea:
const BACKEND_URL = 'http://localhost:5000';

// A tu URL real:
const BACKEND_URL = 'https://api.tudominio.com'; // Producción
```

---

## Paso 4: Pruebas

### Test Local:
1. `npm run dev` (frontend en 3000)
2. `npm run dev` en carpeta servidor (backend en 5000)
3. Ir a http://localhost:3000/admin
4. Verificar Console (F12)
5. Login debería conectar a backend

### Indicadores de Éxito:
```
✅ Console dice: "Conectando a backend: http://localhost:5000"
✅ Network tab muestra POST a /api/auth/login
✅ Login exitoso redirecciona a dashboard
✅ Datos persistidos en BD
```

### Si hay Errores:
```
"Error de conexión: Failed to fetch"
  → Servidor no está corriendo
  → CORS no configurado

"Error 401: Credenciales inválidas"
  → Usuario/password incorrectos en BD

"Error 500: Error desconocido"
  → Error en servidor (ver logs)
```

---

## Paso 5: Pasar a Producción

### 1. Backend en Producción
```bash
# Desplegar servidor a:
- Heroku
- AWS
- DigitalOcean
- Railway
- Render.com
```

### 2. Actualizar URL
```javascript
const BACKEND_URL = 'https://tu-api-produccion.com';
```

### 3. Habilitar HTTPS
```javascript
// En backend, configurar CORS:
app.use(cors({
  origin: 'https://tudominio.com'
}));
```

---

## Referencia Rápida

| BD | Instalación | Configuración |
|----|------------|-----------------|
| **Local** | Ninguna | `AUTH_TYPE='LOCAL'` |
| **MongoDB** | `npm install mongoose` | Conexión string |
| **Firebase** | `npm install firebase` | Config object |
| **Supabase** | `npm install @supabase/supabase-js` | URL + Key |
| **PostgreSQL** | `npm install pg` | Conexión string |

---

## ¿Necesitas Ayuda?

Proporciona:
1. ¿Qué BD usas actualmente?
2. ¿Tienes un servidor backend?
3. ¿Tienes credenciales de BD?
4. ¿URL del backend/API?
5. ¿Endpoints disponibles?

Con esta información podré configurar la conexión automáticamente.

---

**Versión:** 1.0  
**Fecha:** 27 de noviembre de 2025
