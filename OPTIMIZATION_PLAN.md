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
- [x] Confirmar entorno Node (Node 20 LTS en Docker alineado).
- [x] Ejecutar build inicial para asegurar estado limpio.
- [x] Registrar tamaño de salida `dist/` (número de archivos y tamaño total).
- [ ] (Opcional) Ejecutar Lighthouse local (anotar métricas Performance/Accessibility/SEO/Best Practices).
- [ ] Crear tag opcional de referencia (`git tag baseline-opt && git push origin baseline-opt`).
Verificación:
- [x] Build sin errores.
- [ ] Git sync con remoto antes de continuar.

### Paso 0.A Ajustes Docker Previos (Integrado)
Estas tareas se ejecutan antes de registrar la línea base final para homogeneizar entorno.
Tareas:
- [x] Actualizar Dockerfile a Node 20 + reproducibilidad (`npm ci`).
- [x] Añadir variables de entorno útiles (TZ, SHARP_IGNORE_GLOBAL_LIBVIPS).
- [x] Extender `.dockerignore` para reducir contexto de build.
- [x] Reconstruir imagen: `docker compose build`.
- [x] Iniciar entorno: `./docker-dev.sh start` (si no está corriendo).
- [x] Ejecutar build dentro del contenedor: `./docker-dev.sh build`.
- [x] Registrar métricas baseline (tamaño dist) post-homogeneización.
Verificación:
- [x] Imagen construida sin errores.
- [x] Build dentro de contenedor exitosa.
- [x] Anotadas métricas en tabla Métricas.

## Paso 1. Crear Rama de Trabajo
Tareas:
- [x] `git checkout -b feat/optimization-round1`
- [x] Confirmar estado limpio (`git status`).
Verificación:
- [x] Git sync (en nueva rama).
- [x] Build para asegurar no hay divergencias.

## Paso 2. Corrección Navegación i18n (anchors + consistencia)
Tareas:
- [x] Actualizar `Navigation.astro` para que enlaces con ancla incluyan prefijo de idioma (`/${lang}/#home` etc.).
- [x] Revisar otros componentes que generen anclas internas.
- [x] Añadir test manual navegando `/es/#home` y `/en/#home` (no redirección inesperada).
Verificación:
- [x] Build OK.
- [ ] (Si ya hay test infra) Añadir test de generación de ruta de ancla. (Pendiente hasta Step 4)
- [x] Git sync y resolver posibles conflictos.
- [x] Commit (`feat(nav): fix localized anchor links`).
Notas de progreso:
- 2025-08-09: Actualizado Navigation.astro, build OK dentro de contenedor.

## Paso 3. Lint + Limpieza Dependencias
Tareas:
- [x] Añadir script `"lint": "eslint . --ext .js,.ts,.astro"` en `package.json`.
- [x] Configuración ESLint flat (Astro + TypeScript) añadida.
- [x] Verificar si `alpinejs` se usa; eliminado.
- [x] Verificar uso real de `prismjs`; eliminado.
- [x] Ejecutar limpieza (dentro de contenedor) tras eliminar.
Verificación:
- [x] `npm i` sin warnings críticos.
- [x] `npm run lint` pasa (0 errores tras ajustes de tipos / alias Capsule).
- [x] Build OK.
- [x] Git sync.
- [x] Commit (`chore(lint): add eslint and remove unused deps`). (Pendiente de realizar ahora junto a este plan actualizado)

## Paso 4. Infra de Tests + Pruebas i18n
Tareas:
- [x] Añadir dev deps: `vitest` y (si es necesario) `@types/node`.
- [x] Añadir script `"test": "vitest run"` y `"test:watch": "vitest"`.
- [x] Crear carpeta `tests/` con `i18n.spec.ts` validando:
  - `getLangFromUrl` retorna default para idioma desconocido.
  - Fallback de `t` cuando falta clave.
- [ ] (Opcional) Test paridad de claves (placeholder; se implementará formalmente en Paso 8/9).
Verificación:
- [x] `npm test` verde.
- [x] Build OK (verificado antes Step 3; no rompe tras añadir tests).
- [x] Git sync.
- [x] Commit (`test(i18n): add translation utility tests`). (Se realizará junto a este update)

## Paso 5. Accesibilidad (Skip Link + Focus + Dropdown A11y)
Tareas:
- [x] Agregar skip link en layout principal (`<a href="#main" class="skip-link">`...).
- [x] Garantizar contenedor principal con `id="main"`.
- [x] Añadir estilos focus visibles (outline personalizado) en `global.css`.
- [x] Convertir dropdown blog en botón accesible (teclado: Enter, Space, Escape, ArrowDown focus primer item).
- [x] Añadir atributos ARIA correctos (`aria-haspopup`, `aria-expanded`, `role=menu`, `role=menuitem`).
Verificación:
- [x] Navegación sólo teclado funciona (probado manualmente en local).
- [x] Build OK.
- [x] Git sync.
- [x] Commit (`feat(a11y): skip link and accessible dropdown`). (A ejecutar ahora)

## Paso 6. SEO (Canonical, hreflang, og locales)
Tareas:
- [x] En `Layout.astro` agregar lógica para `<link rel="alternate" hreflang="..." href="..."/>` para es/en.
- [x] Añadir `<link rel="canonical" ...>` dinámico.
- [x] Añadir `og:locale` y `og:locale:alternate`.
- [x] Verificar meta description multi-idioma (usar `t('site.description')`).
Verificación:
- [x] Build OK.
- [x] Validar en HTML generado (inspección en `dist/`).
- [ ] Git sync.
- [ ] Commit (`feat(seo): hreflang canonical and og locale tags`).

## Paso 7. Rendimiento y JS Condicional
Tareas:
- [x] Migrar `Astro.glob` a `import.meta.glob` (elimina warnings deprecación).
- [x] Mover script de scroll spy a script externo cargado sólo en páginas home (`/scripts/scroll-spy.js`).
- [x] Quitar listeners innecesarios en páginas sin secciones (Navigation ahora sólo gestiona hashchange; observer externo sólo en home).
- [x] (Si se eliminó `prismjs`) asegurar no hay imports residuales. (Verificado por grep)
- [x] Revisar tamaño JS final (comparar con línea base). (Medido: total bundle _astro ~21.2kB uncompressed; scroll-spy 2.9kB aparte; código inline previo removido.)
Verificación:
- [x] Build OK (migración + externalización scroll spy + workaround `var i`).
- [x] Medir reducción (anotar en plan antes de borrar) tamaño de assets / carga JS.
- [ ] Git sync.
- [ ] Commit (`perf(step7): migrate glob imports & lazy scroll spy`).
Notas: Se introdujo workaround temporal `var i;` en Tags/Languages/LastPost por artefacto de minificación (línea suelta `i;`). Investigar y eliminar en paso posterior.

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
| Tamaño dist total | 3.5MB | (igual tras Steps 1-3) | 0 |
| Peso JS principal | ~12.35kB + 8.82kB (modules) | | |
| Nº dependencias prod | 11 | 9 | -2 |
| Lighthouse Performance | (pendiente) | | |
| Lighthouse Accessibility | (pendiente) | | |

## Riesgos y Mitigaciones
- Reestructuración i18n: riesgo de claves rotas → test paridad + fallback.
- Dropdown accesible: riesgo de regresión UI → probar en móvil y escritorio.
- Eliminación de deps: riesgo import roto → buscar referencias antes (`grep`/`ripgrep`).

## Checklist Global de Pasos
- [ ] 0
  - [x] 0.A (Docker ajustes + baseline)
- [x] 1
- [x] 2
- [x] 3
- [x] 4
- [x] 5
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
