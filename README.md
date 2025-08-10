# Alex Ballera - Portafolio Personal

![Alex Ballera Portfolio](https://alexballera.com/images/imagedefault.webp)

## 🎯 Acerca del Sitio

Portafolio personal de **Alex Ballera**, Senior Frontend Developer con más de 6 años de experiencia en desarrollo web. Sitio construido con Astro y personalizado con información profesional, proyectos destacados y contenido técnico.

## 👨‍💻 Sobre Alex Ballera

**Senior Frontend Developer · MBA · Estudiante de Ciencias de Datos (UBA)**

Desarrollador Frontend orientado a objetivos con experiencia en sectores bancarios, gobierno, turismo y salud. Combino excelencia técnica con visión estratégica para alinear cada proyecto con resultados de negocio.

### 🛠️ Stack Tecnológico Principal
- **Frontend**: React, Next.js, Angular, TypeScript, JavaScript (ES6+)
- **Styling**: TailwindCSS, SASS, CSS3, Responsive Design
- **Architecture**: Microfrontends (single-spa), Component Architecture
- **State Management**: Redux Toolkit, RxJS, Context API
- **DevOps**: 🐳 Docker, CI/CD
- **Tools**: Git, GitHub Actions, Webpack, Vite

### 🚀 Proyectos Destacados
- **Banco COMAFI** - Aplicación interna (Next.js + Redux)
- **Banco ICBC** - App de banca digital (Angular + Microfrontends)
- **YOY App** - Dashboard de métricas corporativas en tiempo real

## 🌐 URLs del Sitio

- **Sitio Principal**: [https://alexballera.com](https://alexballera.com)
- **About Me (Español)**: [https://alexballera.com/about-me](https://alexballera.com/about-me)
- **About Me (English)**: [https://alexballera.com/en/about-me](https://alexballera.com/en/about-me)
- **Blog**: [https://alexballera.com/blog](https://alexballera.com/blog)

## 🛠️ Tecnologías del Sitio

- **Framework**: Astro v5.6.1
- **UI Library**: Preact v10.26.2
- **Styling**: TailwindCSS v4.1.8
- **Icons**: astro-icon v1.1.5
- **Internacionalización**: Soporte ES/EN nativo
- **Despliegue**: GitHub Pages con dominio personalizado

## ✨ Características

1. **🌍 Multiidioma**
   - Soporte completo para Español e Inglés
   - Contenido personalizado por idioma
   - URLs limpias sin prefijos

2. **🎨 Diseño Personalizado**
   - Tema verde con gradientes mint
   - Modo oscuro/claro
   - Diseño responsivo
   - Tipografía optimizada

3. **📱 Rendimiento**
   - SSG (Static Site Generation)
   - Imágenes optimizadas (WebP)
   - Lighthouse score >90
   - Core Web Vitals optimizados

4. **🔍 SEO & Analytics**
   - Sitemap automático
   - RSS feed
   - Meta tags optimizados
   - Speed Insights integrado

5. **♿ Accesibilidad**
   - Skip link para salto directo al contenido (`#main`)
   - Focus styles visibles (outline accesible)
   - Dropdowns navegables por teclado y con atributos ARIA (`aria-haspopup`, `aria-expanded`)

6. **🧩 Internacionalización Modular**
   - Segmentos en `src/i18n/segments/*.ts`
   - Merge tipado en `src/i18n/ui.ts`
   - Utilidades: `getLangFromUrl`, `useTranslations`
   - Script de paridad: `npm run i18n:check` (falla build si faltan claves)

7. **⚙️ Rendimiento / DX**
   - Migración a `import.meta.glob` (sin deprecaciones)
   - Scripts auxiliares (`check-stray-i`, paridad i18n)
   - Limpieza de SVG (removido `clip-rule` redundante)

## 🚀 Configuración de Desarrollo

```bash
# Clonar repositorio
git clone https://github.com/alexballera/alexballera.github.io.git

# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build de producción
npm run build

# Preview local
npm run preview

# Linting
npm run lint

# Tests (incluye paridad i18n antes de Vitest)
npm test

# Sólo chequeo i18n
npm run i18n:check
```

> Nota: El flujo preferido es mediante Docker (`./docker-dev.sh start`). Evitar usar `npm install` o comandos `npm run` directamente en entornos donde la paridad de dependencias sea crítica; dentro del contenedor se garantiza entorno controlado. Los comandos anteriores se listan solo como referencia local rápida.

## 📁 Estructura del Proyecto

```bash
└── 📁alexballera.github.io
    ├── 📁public
    │   ├── CNAME                    # Dominio personalizado
    │   ├── .nojekyll               # Desactivar Jekyll
    │   └── 📁images
    │       ├── alexprofile.webp    # Foto de perfil optimizada
    │       └── ...
    └── 📁src
        ├── 📁components
        │   ├── 📁blog              # Componentes del blog
        │   ├── 📁portfolio         # Componentes del portafolio
        │   └── 📁ui                # Componentes UI reutilizables
        ├── 📁i18n                  # Sistema de internacionalización
   │   ├── ui.ts               # Merge central de segmentos
   │   ├── utils.ts            # Helpers (getLangFromUrl, useTranslations)
   │   └── 📁segments          # Archivos segmentados (nav, blog, hero...)
        ├── 📁layouts
        │   ├── MarkdownAbout.astro  # Layout páginas About
        │   └── MarkdownPostLayout.astro
        ├── 📁pages
        │   ├── about-me.md          # Página About (ES)
        │   ├── 📁en
        │   │   └── about-me.md      # Página About (EN)
        │   ├── 📁blog
        │   └── 📁portfolio
        └── 📁content
            └── 📁staticData         # Datos estáticos (perfil, etc.)
```

## 🔧 Configuración GitHub Pages

### Estructura del Repositorio
- **Rama Principal**: `master` (no `main`)
- **Repositorio**: `alexballera/alexballera.github.io`
- **Tipo**: Repositorio de usuario GitHub Pages

### Archivo CNAME
```
alexballera.com
```

### Workflow GitHub Actions
- Rama: `master`
- Build automático con Astro
- Deploy a GitHub Pages
- Dominio personalizado configurado

### DNS Records
Para configurar el dominio personalizado, se requieren estos registros:

**Registros A (dominio apex):**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**Registro CNAME (subdominio www):**
```
Tipo: CNAME
Nombre: www
Valor: alexballera.github.io
```

## 🐳 Desarrollo con Docker

Este proyecto incluye configuración para desarrollo con Docker, lo que permite un entorno consistente y aislado.

### 🚀 Comandos Docker

```bash
# Iniciar el entorno de desarrollo
./docker-dev.sh start

# Detener el entorno
./docker-dev.sh stop

# Ver logs del contenedor
./docker-dev.sh logs

# Acceder a la terminal del contenedor
./docker-dev.sh shell

# Construir el proyecto dentro del contenedor
./docker-dev.sh build

# Reiniciar el servidor de desarrollo (útil si el hot reload no funciona)
./docker-dev.sh restart

# Ejecutar vista previa de producción
./docker-dev.sh preview
```

### 📋 Características del Entorno Docker

- **Hot Reload**: Los cambios en archivos locales se reflejan automáticamente en el navegador
- **Puerto**: El servidor está disponible en http://localhost:4321
- **Volúmenes**: Los archivos del proyecto están montados dentro del contenedor
- **Node_modules**: Aislados dentro del contenedor para evitar problemas de compatibilidad

### ⚙️ Configuración Docker

La configuración incluye:

- **Dockerfile**: Basado en Node.js 18, optimizado para desarrollo web
   (actualizado para Node 20 LTS + reproducibilidad con `npm ci`).
- **docker-compose.yml**: Configura el contenedor, puertos y volúmenes
- **docker-dev.sh**: Script de utilidades para gestionar el entorno Docker

---

## 📬 Contacto

- **Website**: [alexballera.com](https://alexballera.com)
- **Email**: alex.ballera@gmail.com
- **LinkedIn**: [linkedin.com/in/alexballera](https://linkedin.com/in/alexballera)
- **GitHub**: [github.com/alexballera](https://github.com/alexballera)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para detalles.

---

> **Nota**: Este sitio representa la evolución del portafolio personal de Alex Ballera, migrado de HTML estático a una arquitectura moderna con Astro, manteniendo el enfoque en rendimiento y experiencia de usuario.

---

## 🌍 Añadir una Nueva Traducción (Guía Rápida)
1. Crear un nuevo segmento si corresponde en `src/i18n/segments/` (mantener nombre descriptivo).
2. Añadir claves en ambos idiomas (`es` y `en`).
3. Exportar y asegurar inclusión en el merge de `ui.ts` (orden: común → específicos).
4. Ejecutar `npm run i18n:check` para validar paridad.
5. Referenciar en componentes con:
   ```ts
   const t = useTranslations(lang);
   t('clave.segmento');
   ```

## 📊 Métricas (Post Optimización)
| Concepto | Valor |
|----------|-------|
| Páginas generadas | 53 |
| JS principal (gzip) | ~5.33 kB + señales 3.34 kB |
| Scripts auxiliares | Paridad i18n, stray-i check |
| Score Lighthouse objetivo | >90 (perf / a11y / SEO) |

## 🔐 Calidad de Código
- Lint: `npm run lint`
- Tests: `npm test` (Vitest + paridad i18n)
- Build verificación adicional: `npm run build:check`


