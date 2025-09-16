#!/bin/bash

# Script maestro para gestionar el sistema KIA
echo "🚗 Sistema KIA - Gestión de Servicios"
echo "======================================"
echo ""

case "$1" in
    "backend")
        echo "🚀 Iniciando Backend..."
        cd backend && ./start.sh
        ;;
    "frontend")
        echo "🎨 Iniciando Frontend..."
        cd frontend && ./start.sh
        ;;
    "logs")
        echo "📊 Mostrando logs del Backend..."
        cd backend && ./logs.sh
        ;;
    "stop")
        echo "🛑 Deteniendo todos los procesos..."
        pkill -f "node server.js"
        pkill -f vite
        echo "✅ Todos los procesos detenidos"
        ;;
    "status")
        echo "📊 Estado del sistema:"
        echo ""
        echo "Backend:"
        if pgrep -f "node server.js" > /dev/null; then
            echo "  ✅ Ejecutándose (PID: $(pgrep -f 'node server.js'))"
        else
            echo "  ❌ No ejecutándose"
        fi
        echo ""
        echo "Frontend:"
        if pgrep -f vite > /dev/null; then
            echo "  ✅ Ejecutándose (PID: $(pgrep -f vite))"
        else
            echo "  ❌ No ejecutándose"
        fi
        ;;
    "help"|"")
        echo "📋 Comandos disponibles:"
        echo ""
        echo "  ./kia.sh backend    - Iniciar backend con logs visibles"
        echo "  ./kia.sh frontend   - Iniciar frontend"
        echo "  ./kia.sh logs       - Ver logs del backend en tiempo real"
        echo "  ./kia.sh stop       - Detener todos los procesos"
        echo "  ./kia.sh status     - Ver estado de los servicios"
        echo "  ./kia.sh help       - Mostrar esta ayuda"
        echo ""
        echo "🌐 URLs del sistema:"
        echo "  - Frontend: http://localhost:3000"
        echo "  - Backend: http://localhost:3001"
        echo "  - Panel Admin: http://localhost:3000/admin"
        echo ""
        echo "🔑 Contraseña admin: kia-sevilla-2024"
        ;;
    *)
        echo "❌ Comando no reconocido: $1"
        echo "💡 Usa './kia.sh help' para ver los comandos disponibles"
        ;;
esac
