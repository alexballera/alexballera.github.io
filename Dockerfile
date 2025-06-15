FROM node:18-slim

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias necesarias para Sharp (procesamiento de imágenes)
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto utilizado por Astro
EXPOSE 4321

# Comando por defecto para desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
