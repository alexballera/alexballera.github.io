# Alex Ballera - Portafolio Personal

![Alex Ballera Portfolio](https://alexballera.com/images/imagedefault.webp)

## 🎯 Acerca del Sitio

Portafolio personal de **Alex Ballera**, Senior Frontend Developer con más de 5 años de experiencia en desarrollo web. Sitio construido con Astro y personalizado con información profesional, proyectos destacados y contenido técnico.

## 👨‍💻 Sobre Alex Ballera

**Senior Frontend Developer · MBA · Estudiante de Ciencias de Datos (UBA)**

Desarrollador Frontend orientado a objetivos con experiencia en sectores bancarios, gobierno, turismo y salud. Combino excelencia técnica con visión estratégica para alinear cada proyecto con resultados de negocio.

### 🛠️ Stack Tecnológico Principal
- **Frontend**: React, Next.js, Angular, TypeScript, JavaScript (ES6+)
- **Styling**: TailwindCSS, SASS, CSS3, Responsive Design
- **Architecture**: Microfrontends (single-spa), Component Architecture
- **State Management**: Redux Toolkit, RxJS, Context API
- **Tools**: Git, GitHub Actions, Docker, Webpack, Vite

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
```

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
Para configurar el dominio personalizado, se requieren estos registros A:
```
192.30.252.153
192.30.252.154
```

## 📬 Contacto

- **Website**: [alexballera.com](https://alexballera.com)
- **Email**: alex.ballera@gmail.com
- **LinkedIn**: [linkedin.com/in/alexballera](https://linkedin.com/in/alexballera)
- **GitHub**: [github.com/alexballera](https://github.com/alexballera)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para detalles.

---

> **Nota**: Este sitio representa la evolución del portafolio personal de Alex Ballera, migrado de HTML estático a una arquitectura moderna con Astro, manteniendo el enfoque en rendimiento y experiencia de usuario.

