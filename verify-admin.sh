#!/bin/bash
# Script de verificación del sistema admin

echo "=========================================="
echo "🔍 Verificación de Archivos Admin"
echo "=========================================="

# Verificar archivos creados
echo ""
echo "✅ Verificando archivos..."

archivos_requeridos=(
  "src/hooks/useAdminContent.js"
  "src/utils/auth.js"
  "src/pages/AdminLogin.jsx"
  "src/pages/AdminDashboard.jsx"
  "src/components/admin/HeroSectionEditor.jsx"
  "src/components/ProtectedRoute.jsx"
  "src/App.jsx"
)

for archivo in "${archivos_requeridos[@]}"; do
  if [ -f "$archivo" ]; then
    echo "  ✅ $archivo"
  else
    echo "  ❌ $archivo (FALTA)"
  fi
done

# Verificar documentación
echo ""
echo "📚 Documentación:"
docs=(
  "ADMIN_QUICK_START.md"
  "ADMIN_GUIDE.md"
  "ADMIN_SETUP.md"
  "ADMIN_INSTALLATION.md"
  "ADMIN_VISUAL_GUIDE.md"
  "README_ADMIN.md"
  "TROUBLESHOOT_IMAGES.md"
)

for doc in "${docs[@]}"; do
  if [ -f "$doc" ]; then
    echo "  ✅ $doc"
  else
    echo "  ⚠️  $doc (NO ENCONTRADO)"
  fi
done

# Verificar dependencias
echo ""
echo "📦 Verificando dependencias..."

if grep -q "react-router-dom" package.json; then
  echo "  ✅ react-router-dom instalado"
else
  echo "  ❌ react-router-dom NO INSTALADO"
  echo "  Ejecutar: npm install react-router-dom"
fi

if grep -q "framer-motion" package.json; then
  echo "  ✅ framer-motion instalado"
else
  echo "  ❌ framer-motion NO INSTALADO"
fi

if grep -q "react-helmet" package.json; then
  echo "  ✅ react-helmet instalado"
else
  echo "  ❌ react-helmet NO INSTALADO"
fi

echo ""
echo "=========================================="
echo "✨ Verificación completada"
echo "=========================================="
echo ""
echo "Para empezar:"
echo "  1. npm run dev"
echo "  2. http://localhost:3000/admin"
echo "  3. Login: admin / admin123"
echo ""
