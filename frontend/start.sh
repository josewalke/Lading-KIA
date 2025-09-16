#!/bin/bash

# Script para iniciar el frontend
echo "🎨 Iniciando Frontend KIA..."
echo "📁 Directorio: $(pwd)"
echo ""
echo "🌐 URLs disponibles:"
echo "   - Frontend: http://localhost:3000"
echo "   - Panel Admin: http://localhost:3000/admin"
echo ""
echo "🔑 Contraseña admin: kia-sevilla-2024"
echo "⏳ Iniciando servidor de desarrollo..."
echo "=========================================="

npm run dev
