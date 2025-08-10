# Copilot Instructions for alexballera.github.io
## Preferences
- Responde siempre en español

## Project Overview
- This is a personal portfolio site for Alex Ballera, built with Astro (v5+), Preact, and TailwindCSS.
- The site is statically generated (SSG) and deployed to GitHub Pages with a custom domain.
- Multi-language support (ES/EN) is implemented natively, with content and navigation adapting to the current language context.
- The project structure is modular: `src/components` (UI, blog, portfolio), `src/layouts`, `src/pages` (with language folders), and `src/i18n` for translations.

## Key Patterns & Conventions
- **Routing:** All localized pages are under `/src/pages/{lang}/` (e.g., `/es/about-me.md`, `/en/about-me.md`). Navigation must use the current language prefix for all non-anchor links. See `src/components/layout/Navigation.astro` for dynamic menu logic.
- **Internationalization:** Use `getLangFromUrl` and `useTranslations` from `src/i18n/utils.ts` to access translations. UI text keys are in `src/i18n/ui.ts`.
- **Content:** Blog posts and portfolio projects are Markdown files in their respective language folders. Static data (profile, etc.) is in `src/content/staticData`.
- **Styling:** TailwindCSS is the primary styling system. Use utility classes and avoid custom CSS unless necessary.
- **Images:** Use optimized WebP images in `public/images/`. Project images are in `public/images/projects/`.

## Developer Workflows
- **Local development:**
  - `npm install` to set up dependencies
  - `npm run dev` to start Astro locally (default: http://localhost:4321)
  - Use Docker for isolated development: `./docker-dev.sh start`
  - Preferir Docker para mantener entorno consistente; evitar usar directamente `npm`/`yarn` fuera del contenedor salvo tareas puntuales de mantenimiento.
- **Build & Preview:**
  - `npm run build` for production build
  - `npm run preview` to serve the built site locally
- **Deployment:**
  - Automatic via GitHub Actions on push to `master`
  - Custom domain set via `public/CNAME`

## Project-Specific Notes
- **Do not hardcode language prefixes**; always derive from context for navigation and content links.
- **Do not remove or rename blog templates** unless explicitly requested; some are used as documentation or future templates.
- **Portfolio projects** are Markdown files in both `/es/portfolio/` and `/en/portfolio/`.
- **Critical config files:** `astro.config.mjs`, `tsconfig.json`, `docker-compose.yml`, `docker-dev.sh`, `Dockerfile`.
- **SEO/Analytics:** Sitemap and RSS are auto-generated; meta tags are managed in layouts/components.

## Examples
- To add a new portfolio project: create `src/pages/es/portfolio/{project}.md` and `src/pages/en/portfolio/{project}.md`.
- To add a new translation: update `src/i18n/ui.ts` and use the key via `useTranslations`.
- To update navigation: edit `src/components/layout/Navigation.astro` and ensure all paths are language-aware.

---
For further details, see `README.md` and code comments in key files.
