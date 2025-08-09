# Plan de Optimización del Proyecto

> Objetivo: Aplicar mejoras de i18n, accesibilidad, SEO, rendimiento, limpieza de dependencias y DX manteniendo el sitio estable. Cada paso incluye: (a) tareas, (b) verificación (build + tests + lint), (c) sincronización con remoto (`git pull --rebase`) antes de continuar. El último paso elimina este archivo.

## Convenciones de Checklist
- [ ] TODO no iniciado
- [~] En progreso (marcar manualmente mientras trabajas)
- [x] Completado
- [!] Bloqueado / requiere decisión

## Comandos Base (usar según se indique)
- Build: `npm run build`
- Dev: `npm run dev`
- Preview: `npm run preview`
- Lint (después de agregar script): `npm run lint`
- Tests (después de añadir framework): `npm test`
- Sincronizar remoto: `git fetch origin && git pull --rebase origin master`

## Paso 0. Preparación y Línea Base
Tareas:
- [ ] Confirmar entorno Node (recomendado LTS).
- [ ] Ejecutar build inicial para asegurar estado limpio.
- [ ] Registrar tamaño de salida `dist/` (número de archivos y tamaño total).
- [ ] (Opcional) Ejecutar Lighthouse local (anotar métricas Performance/Accessibility/SEO/Best Practices).
- [ ] Crear tag opcional de referencia (`git tag baseline-opt && git push origin baseline-opt`).
Verificación:
- [ ] Build sin errores.
- [ ] Git sync con remoto antes de continuar.

### Paso 0.A Ajustes Docker Previos (Integrado)
Estas tareas se ejecutan antes de registrar la línea base final para homogeneizar entorno.
Tareas:
- [x] Actualizar Dockerfile a Node 20 + reproducibilidad (`npm ci`).
- [x] Añadir variables de entorno útiles (TZ, SHARP_IGNORE_GLOBAL_LIBVIPS).
- [x] Extender `.dockerignore` para reducir contexto de build.
- [ ] Reconstruir imagen: `docker compose build`.
- [ ] Iniciar entorno: `./docker-dev.sh start` (si no está corriendo).
- [ ] Ejecutar build dentro del contenedor: `./docker-dev.sh build`.
- [ ] Registrar métricas baseline (tamaño dist) post-homogeneización.
Verificación:
- [ ] Imagen construida sin errores.
- [ ] Build dentro de contenedor exitosa.
- [ ] Anotadas métricas en tabla Métricas.

## Paso 1. Crear Rama de Trabajo
Tareas:
- [ ] `git checkout -b feat/optimization-round1`
- [ ] Confirmar estado limpio (`git status`).
Verificación:
- [ ] Git sync (en nueva rama).
- [ ] Build para asegurar no hay divergencias.

## Paso 2. Corrección Navegación i18n (anchors + consistencia)
Tareas:
- [ ] Actualizar `Navigation.astro` para que enlaces con ancla incluyan prefijo de idioma (`/${lang}/#home` etc.).
- [ ] Revisar otros componentes que generen anclas internas.
- [ ] Añadir test manual navegando `/es/#home` y `/en/#home` (no redirección inesperada).
Verificación:
- [ ] Build OK.
- [ ] (Si ya hay test infra) Añadir test de generación de ruta de ancla.
- [ ] Git sync y resolver posibles conflictos.
- [ ] Commit (`feat(nav): fix localized anchor links`).

## Paso 3. Lint + Limpieza Dependencias
Tareas:
- [ ] Añadir script `"lint": "eslint ."` en `package.json`.
- [ ] Crear/añadir `.eslintrc` (Astro + TypeScript).
- [ ] Verificar si `alpinejs` se usa; si no, eliminar dependencia.
- [ ] Verificar uso real de `prismjs` (Shiki ya activo). Si no usado, eliminar.
- [ ] Ejecutar `npm prune` tras eliminar.
Verificación:
- [ ] `npm i` sin warnings críticos.
- [ ] `npm run lint` pasa (o issues menores corregidos / auto-fix).
- [ ] Build OK.
- [ ] Git sync.
- [ ] Commit (`chore(lint): add eslint and remove unused deps`).

## Paso 4. Infra de Tests + Pruebas i18n
Tareas:
- [ ] Añadir dev deps: `vitest` y (si es necesario) `@types/node`.
- [ ] Añadir script `"test": "vitest run"` y `"test:watch": "vitest"`.
- [ ] Crear carpeta `tests/` con `i18n.spec.ts` validando:
  - `getLangFromUrl` retorna default para idioma desconocido.
  - Fallback de `t` cuando falta clave.
- [ ] (Opcional) Test paridad de claves (placeholder; se implementará formalmente en Paso 8/9).
Verificación:
- [ ] `npm test` verde.
- [ ] Build OK.
- [ ] Git sync.
- [ ] Commit (`test(i18n): add translation utility tests`).

## Paso 5. Accesibilidad (Skip Link + Focus + Dropdown A11y)
Tareas:
- [ ] Agregar skip link en layout principal (`<a href="#main" class="skip-link">...</a>` oculto hasta focus).
- [ ] Garantizar contenedor principal con `id="main"`.
- [ ] Añadir estilos focus visibles (`focus-visible:ring ...`).
- [ ] Convertir dropdown blog en botón accesible:
  - `<button aria-haspopup="true" aria-expanded="false">`
  - Toggle con teclado (Enter/Espacio, Escape para cerrar).
  - Cerrar al hacer click fuera o esc.
- [ ] Añadir atributos ARIA correctos (`role="menu"`, `role="menuitem"`).
Verificación:
- [ ] Navegación sólo teclado funciona (Tab / Shift+Tab).
- [ ] Build OK.
- [ ] Git sync.
- [ ] Commit (`feat(a11y): skip link and accessible dropdown`).

## Paso 6. SEO (Canonical, hreflang, og locales)
Tareas:
- [ ] En `Layout.astro` agregar lógica para `<link rel="alternate" hreflang="..." href="..."/>` para es/en.
- [ ] Añadir `<link rel="canonical" ...>` dinámico.
- [ ] Añadir `og:locale` y `og:locale:alternate`.
- [ ] Verificar meta description multi-idioma (usar `t('site.description')`).
Verificación:
- [ ] Build OK.
- [ ] Validar en HTML generado (inspección en `dist/`).
- [ ] Git sync.
- [ ] Commit (`feat(seo): hreflang canonical and og locale tags`).

## Paso 7. Rendimiento y JS Condicional
Tareas:
- [ ] Mover script de scroll spy a island cargada sólo en home, o condicionar ejecución verificando sección.
- [ ] Quitar listeners innecesarios en páginas sin secciones.
- [ ] (Si se eliminó `prismjs`) asegurar no hay imports residuales.
- [ ] Revisar tamaño JS final (comparar con línea base).
Verificación:
- [ ] Build OK.
- [ ] Medir reducción (anotar en plan antes de borrar) tamaño de assets / carga JS.
- [ ] Git sync.
- [ ] Commit (`perf(nav): lazy scroll spy and reduce js`).

## Paso 8. Modularización Traducciones (Opcional si no se requiere ahora)
Tareas:
- [ ] Crear carpeta `src/i18n/segments/` (nav.ts, hero.ts, blog.ts, common.ts, etc.).
- [ ] Reexportar en `ui.ts` un merge tipado.
- [ ] Ajustar import en `utils.ts` si cambia ruta.
Verificación:
- [ ] Tests i18n verdes.
- [ ] Build OK.
- [ ] Git sync.
- [ ] Commit (`refactor(i18n): modularize translation segments`).

## Paso 9. Script de Paridad de Traducciones
Tareas:
- [ ] Crear script Node `scripts/check-i18n.js` que:
  - Lee objeto español (base) y verifica cada clave existe en inglés.
  - Falla con `process.exit(1)` si falta alguna.
- [ ] Añadir script npm `"i18n:check": "node scripts/check-i18n.js"`.
- [ ] Integrar en `npm test` (ejecutar antes o después de vitest).
Verificación:
- [ ] `npm run i18n:check` pasa.
- [ ] Build OK.
- [ ] Git sync.
- [ ] Commit (`chore(i18n): add translation parity check`).

## Paso 10. Actualizar README
Tareas:
- [ ] Documentar: scripts nuevos, flujo i18n, cómo añadir traducciones.
- [ ] Añadir sección Accesibilidad mejorada.
- [ ] Registrar métricas comparativas (JS bundle antes/después, tamaño dist, mejoras Performance si medidas).
Verificación:
- [ ] Build (para asegurar README no afecta) OK.
- [ ] Git sync.
- [ ] Commit (`docs: update readme with optimization details`).

## Paso 11. QA Final
Tareas:
- [ ] `npm run build` + `npm run preview` revisión manual.
- [ ] Pruebas teclado y lector de pantalla rápidas (navegación principal).
- [ ] Ejecutar `npm test`.
- [ ] Ejecutar `npm run lint`.
- [ ] Revisar diff final (`git diff master...HEAD`).
Verificación:
- [ ] Todo verde.
- [ ] Git sync (por si se actualizó master paralelamente) y rebase si necesario.
- [ ] Commit (`chore: final qa adjustments`).

## Paso 12. Merge
Tareas:
- [ ] `git checkout master`.
- [ ] `git pull --rebase origin master`.
- [ ] `git merge --no-ff feat/optimization-round1`.
- [ ] `git push origin master`.
- [ ] (Opcional) Tag `git tag v0.1.0-opt && git push origin v0.1.0-opt`.
Verificación:
- [ ] Build en master local OK.
- [ ] (Opcional) Deploy verificado.

## Paso 13. Limpieza (Eliminar este Plan)
Tareas:
- [ ] `git rm OPTIMIZATION_PLAN.md`.
- [ ] Commit (`chore: remove optimization plan`).
- [ ] Push.

---

## Notas de Decisiones (rellenar durante la ejecución)
| Tema | Decisión | Fecha | Comentario |
|------|----------|-------|------------|
| Uso de prismjs | | | |
| Modularización i18n | | | |
| Island vs inline script nav | | | |

## Métricas (rellenar)
| Métrica | Baseline | Optimizado | Δ |
|---------|----------|-----------|----|
| Tamaño dist total | 3.5MB | | |
| Peso JS principal | ~12.35kB + 8.82kB (modules) | | |
| Nº dependencias prod | 11 | | |
| Lighthouse Performance | (pendiente) | | |
| Lighthouse Accessibility | (pendiente) | | |

## Riesgos y Mitigaciones
- Reestructuración i18n: riesgo de claves rotas → test paridad + fallback.
- Dropdown accesible: riesgo de regresión UI → probar en móvil y escritorio.
- Eliminación de deps: riesgo import roto → buscar referencias antes (`grep`/`ripgrep`).

## Checklist Global de Pasos
- [ ] 0
  - [x] 0.A (Docker ajustes + baseline)
- [ ] 1
- [ ] 2
- [ ] 3
- [ ] 4
- [ ] 5
- [ ] 6
- [ ] 7
- [ ] 8 (opcional)
- [ ] 9
- [ ] 10
- [ ] 11
- [ ] 12
- [ ] 13 (remove plan)

> Cuando el Paso 13 se complete, este archivo debe desaparecer del repositorio.
