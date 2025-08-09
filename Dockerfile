FROM node:20-slim

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias necesarias para Sharp (procesamiento de imágenes)
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Variables de entorno recomendadas
ENV NODE_ENV=development \
    TZ=UTC \
    SHARP_IGNORE_GLOBAL_LIBVIPS=1

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias (usar npm ci si existe lockfile para reproducibilidad)
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copiar el código fuente
COPY . .

# Exponer el puerto utilizado por Astro
EXPOSE 4321

# Comando por defecto para desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
