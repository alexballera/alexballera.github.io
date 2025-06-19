#!/bin/bash

# Utilidades para el entorno Docker de desarrollo
# Uso: ./docker-dev.sh [comando]

set -e

# Mejora el rendimiento de las construcciones de Docker Compose
export COMPOSE_BAKE=true

case "$1" in
  start)
    echo "Iniciando el entorno de desarrollo..."
    docker compose up -d
    echo "Entorno iniciado en http://localhost:4321"
    ;;
  stop)
    echo "Deteniendo el entorno de desarrollo..."
    docker compose down
    ;;
  build)
    echo "Construyendo el proyecto..."
    docker compose exec app npm run build
    ;;
  preview)
    echo "Ejecutando vista previa de producción..."
    docker compose exec app npm run preview -- --host 0.0.0.0
    ;;
  shell)
    echo "Abriendo shell en el contenedor..."
    docker compose exec app /bin/bash
    ;;
  logs)
    echo "Mostrando logs..."
    docker compose logs -f app
    ;;
  restart)
    echo "Reiniciando el servidor de desarrollo..."
    docker compose restart app
    echo "Entorno reiniciado en http://localhost:4321"
    ;;
  *)
    echo "Uso: ./docker-dev.sh [comando]"
    echo ""
    echo "Comandos disponibles:"
    echo "  start     - Inicia el entorno de desarrollo"
    echo "  stop      - Detiene el entorno de desarrollo"
    echo "  build     - Construye el proyecto para producción"
    echo "  preview   - Ejecuta la vista previa de la build"
    echo "  shell     - Abre un shell en el contenedor"
    echo "  logs      - Muestra los logs del contenedor"
    echo "  restart   - Reinicia el servidor de desarrollo"
    ;;
esac
